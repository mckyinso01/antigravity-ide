/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Storage } from '@google-cloud/storage';
import { gzipSync, gunzipSync } from 'node:zlib';
import * as tar from 'tar';
import * as fse from 'fs-extra';
import { promises as fsPromises, createReadStream } from 'node:fs';
import { tmpdir } from '@google/gemini-cli-core';
import { join } from 'node:path';
import { logger } from '../utils/logger.js';
import { setTargetDir } from '../config/config.js';
import { getPersistedState } from '../types.js';
import { v4 as uuidv4 } from 'uuid';
const getTmpArchiveFilename = (taskId) => `task-${taskId}-workspace-${uuidv4()}.tar.gz`;
// Validate the taskId to prevent path traversal attacks by ensuring it only contains safe characters.
const isTaskIdValid = (taskId) => {
    // Allow only alphanumeric characters, dashes, and underscores, and ensure it's not empty.
    const validTaskIdRegex = /^[a-zA-Z0-9_-]+$/;
    return validTaskIdRegex.test(taskId);
};
export class GCSTaskStore {
    storage;
    bucketName;
    bucketInitialized;
    constructor(bucketName) {
        if (!bucketName) {
            throw new Error('GCS bucket name is required.');
        }
        this.storage = new Storage();
        this.bucketName = bucketName;
        logger.info(`GCSTaskStore initializing with bucket: ${this.bucketName}`);
        // Prerequisites: user account or service account must have storage admin IAM role
        // and the bucket name must be unique.
        this.bucketInitialized = this.initializeBucket();
    }
    async initializeBucket() {
        try {
            const [buckets] = await this.storage.getBuckets();
            const exists = buckets.some((bucket) => bucket.name === this.bucketName);
            if (!exists) {
                logger.info(`Bucket ${this.bucketName} does not exist in the list. Attempting to create...`);
                try {
                    await this.storage.createBucket(this.bucketName);
                    logger.info(`Bucket ${this.bucketName} created successfully.`);
                }
                catch (createError) {
                    logger.info(`Failed to create bucket ${this.bucketName}: ${createError}`);
                    throw new Error(`Failed to create GCS bucket ${this.bucketName}: ${createError}`);
                }
            }
            else {
                logger.info(`Bucket ${this.bucketName} exists.`);
            }
        }
        catch (error) {
            logger.info(`Error during bucket initialization for ${this.bucketName}: ${error}`);
            throw new Error(`Failed to initialize GCS bucket ${this.bucketName}: ${error}`);
        }
    }
    async ensureBucketInitialized() {
        await this.bucketInitialized;
    }
    getObjectPath(taskId, type) {
        if (!isTaskIdValid(taskId)) {
            throw new Error(`Invalid taskId: ${taskId}`);
        }
        return `tasks/${taskId}/${type}.tar.gz`;
    }
    async save(task) {
        await this.ensureBucketInitialized();
        const taskId = task.id;
        const persistedState = getPersistedState(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        task.metadata);
        if (!persistedState) {
            throw new Error(`Task ${taskId} is missing persisted state in metadata.`);
        }
        const workDir = process.cwd();
        const metadataObjectPath = this.getObjectPath(taskId, 'metadata');
        const workspaceObjectPath = this.getObjectPath(taskId, 'workspace');
        const dataToStore = task.metadata;
        try {
            const jsonString = JSON.stringify(dataToStore);
            const compressedMetadata = gzipSync(Buffer.from(jsonString));
            const metadataFile = this.storage
                .bucket(this.bucketName)
                .file(metadataObjectPath);
            await metadataFile.save(compressedMetadata, {
                contentType: 'application/gzip',
            });
            logger.info(`Task ${taskId} metadata saved to GCS: gs://${this.bucketName}/${metadataObjectPath}`);
            if (await fse.pathExists(workDir)) {
                const entries = await fsPromises.readdir(workDir);
                if (entries.length > 0) {
                    const tmpArchiveFile = join(tmpdir(), getTmpArchiveFilename(taskId));
                    try {
                        await tar.c({
                            gzip: true,
                            file: tmpArchiveFile,
                            cwd: workDir,
                            portable: true,
                        }, entries);
                        if (!(await fse.pathExists(tmpArchiveFile))) {
                            throw new Error(`tar.c command failed to create ${tmpArchiveFile}`);
                        }
                        const workspaceFile = this.storage
                            .bucket(this.bucketName)
                            .file(workspaceObjectPath);
                        const sourceStream = createReadStream(tmpArchiveFile);
                        const destStream = workspaceFile.createWriteStream({
                            contentType: 'application/gzip',
                            resumable: true,
                        });
                        await new Promise((resolve, reject) => {
                            sourceStream.on('error', (err) => {
                                logger.error(`Error in source stream for ${tmpArchiveFile}:`, err);
                                // Attempt to close destStream if source fails
                                if (!destStream.destroyed) {
                                    destStream.destroy(err);
                                }
                                reject(err);
                            });
                            destStream.on('error', (err) => {
                                logger.error(`Error in GCS dest stream for ${workspaceObjectPath}:`, err);
                                reject(err);
                            });
                            destStream.on('finish', () => {
                                logger.info(`GCS destStream finished for ${workspaceObjectPath}`);
                                resolve();
                            });
                            logger.info(`Piping ${tmpArchiveFile} to GCS object ${workspaceObjectPath}`);
                            sourceStream.pipe(destStream);
                        });
                        logger.info(`Task ${taskId} workspace saved to GCS: gs://${this.bucketName}/${workspaceObjectPath}`);
                    }
                    catch (error) {
                        logger.error(`Error during workspace save process for ${taskId}:`, error);
                        throw error;
                    }
                    finally {
                        logger.info(`Cleaning up temporary file: ${tmpArchiveFile}`);
                        try {
                            if (await fse.pathExists(tmpArchiveFile)) {
                                await fse.remove(tmpArchiveFile);
                                logger.info(`Successfully removed temporary file: ${tmpArchiveFile}`);
                            }
                            else {
                                logger.warn(`Temporary file not found for cleanup: ${tmpArchiveFile}`);
                            }
                        }
                        catch (removeError) {
                            logger.error(`Error removing temporary file ${tmpArchiveFile}:`, removeError);
                        }
                    }
                }
                else {
                    logger.info(`Workspace directory ${workDir} is empty, skipping workspace save for task ${taskId}.`);
                }
            }
            else {
                logger.info(`Workspace directory ${workDir} not found, skipping workspace save for task ${taskId}.`);
            }
        }
        catch (error) {
            logger.error(`Failed to save task ${taskId} to GCS:`, error);
            throw error;
        }
    }
    async load(taskId) {
        await this.ensureBucketInitialized();
        const metadataObjectPath = this.getObjectPath(taskId, 'metadata');
        const workspaceObjectPath = this.getObjectPath(taskId, 'workspace');
        try {
            const metadataFile = this.storage
                .bucket(this.bucketName)
                .file(metadataObjectPath);
            const [metadataExists] = await metadataFile.exists();
            if (!metadataExists) {
                logger.info(`Task ${taskId} metadata not found in GCS.`);
                return undefined;
            }
            const [compressedMetadata] = await metadataFile.download();
            const jsonData = gunzipSync(compressedMetadata).toString();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const loadedMetadata = JSON.parse(jsonData);
            logger.info(`Task ${taskId} metadata loaded from GCS.`);
            const persistedState = getPersistedState(loadedMetadata);
            if (!persistedState) {
                throw new Error(`Loaded metadata for task ${taskId} is missing internal persisted state.`);
            }
            const agentSettings = persistedState._agentSettings;
            const workDir = setTargetDir(agentSettings);
            await fse.ensureDir(workDir);
            const workspaceFile = this.storage
                .bucket(this.bucketName)
                .file(workspaceObjectPath);
            const [workspaceExists] = await workspaceFile.exists();
            if (workspaceExists) {
                const tmpArchiveFile = join(tmpdir(), getTmpArchiveFilename(taskId));
                try {
                    await workspaceFile.download({ destination: tmpArchiveFile });
                    await tar.x({ file: tmpArchiveFile, cwd: workDir });
                    logger.info(`Task ${taskId} workspace restored from GCS to ${workDir}`);
                }
                finally {
                    if (await fse.pathExists(tmpArchiveFile)) {
                        await fse.remove(tmpArchiveFile);
                    }
                }
            }
            else {
                logger.info(`Task ${taskId} workspace archive not found in GCS.`);
            }
            return {
                id: taskId,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                contextId: loadedMetadata._contextId || uuidv4(),
                kind: 'task',
                status: {
                    state: persistedState._taskState,
                    timestamp: new Date().toISOString(),
                },
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                metadata: loadedMetadata,
                history: [],
                artifacts: [],
            };
        }
        catch (error) {
            logger.error(`Failed to load task ${taskId} from GCS:`, error);
            throw error;
        }
    }
}
export class NoOpTaskStore {
    realStore;
    constructor(realStore) {
        this.realStore = realStore;
    }
    async save(task) {
        logger.info(`[NoOpTaskStore] save called for task ${task.id} - IGNORED`);
        return Promise.resolve();
    }
    async load(taskId) {
        logger.info(`[NoOpTaskStore] load called for task ${taskId}, delegating to real store.`);
        return this.realStore.load(taskId);
    }
}
//# sourceMappingURL=gcs.js.map
// SIG // Begin signature block
// SIG // MIIvWwYJKoZIhvcNAQcCoIIvTDCCL0gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // bP2heKrjDy98BnJF/gVQyeAynoDaLV9a0Bxtv55ASYig
// SIG // ghQJMIIFkDCCA3igAwIBAgIQBZsbV56OITLiOQe9p3d1
// SIG // XDANBgkqhkiG9w0BAQwFADBiMQswCQYDVQQGEwJVUzEV
// SIG // MBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
// SIG // d3cuZGlnaWNlcnQuY29tMSEwHwYDVQQDExhEaWdpQ2Vy
// SIG // dCBUcnVzdGVkIFJvb3QgRzQwHhcNMTMwODAxMTIwMDAw
// SIG // WhcNMzgwMTE1MTIwMDAwWjBiMQswCQYDVQQGEwJVUzEV
// SIG // MBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
// SIG // d3cuZGlnaWNlcnQuY29tMSEwHwYDVQQDExhEaWdpQ2Vy
// SIG // dCBUcnVzdGVkIFJvb3QgRzQwggIiMA0GCSqGSIb3DQEB
// SIG // AQUAA4ICDwAwggIKAoICAQC/5pBzaN675F1KPDAiMGkz
// SIG // 7MKnJS7JIT3yithZwuEppz1Yq3aaza57G4QNxDAf8xuk
// SIG // OBbrVsaXbR2rsnnyyhHS5F/WBTxSD1Ifxp4VpX6+n6lX
// SIG // FllVcq9ok3DCsrp1mWpzMpTREEQQLt+C8weE5nQ7bXHi
// SIG // LQwb7iDVySAdYyktzuxeTsiT+CFhmzTrBcZe7FsavOvJ
// SIG // z82sNEBfsXpm7nfISKhmV1efVFiODCu3T6cw2Vbuyntd
// SIG // 463JT17lNecxy9qTXtyOj4DatpGYQJB5w3jHtrHEtWoY
// SIG // OAMQjdjUN6QuBX2I9YI+EJFwq1WCQTLX2wRzKm6RAXwh
// SIG // TNS8rhsDdV14Ztk6MUSaM0C/CNdaSaTC5qmgZ92kJ7yh
// SIG // Tzm1EVgX9yRcRo9k98FpiHaYdj1ZXUJ2h4mXaXpI8OCi
// SIG // EhtmmnTK3kse5w5jrubU75KSOp493ADkRSWJtppEGSt+
// SIG // wJS00mFt6zPZxd9LBADMfRyVw4/3IbKyEbe7f/LVjHAs
// SIG // QWCqsWMYRJUadmJ+9oCw++hkpjPRiQfhvbfmQ6QYuKZ3
// SIG // AeEPlAwhHbJUKSWJbOUOUlFHdL4mrLZBdd56rF+NP8m8
// SIG // 00ERElvlEFDrMcXKchYiCd98THU/Y+whX8QgUWtvsauG
// SIG // i0/C1kVfnSD8oR7FwI+isX4KJpn15GkvmB0t9dmpsh3l
// SIG // GwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MA4GA1Ud
// SIG // DwEB/wQEAwIBhjAdBgNVHQ4EFgQU7NfjgtJxXWRM3y5n
// SIG // P+e6mK4cD08wDQYJKoZIhvcNAQEMBQADggIBALth2X2p
// SIG // bL4XxJEbw6GiAI3jZGgPVs93rnD5/ZpKmbnJeFwMDF/k
// SIG // 5hQpVgs2SV1EY+CtnJYYZhsjDT156W1r1lT40jzBQ0Cu
// SIG // HVD1UvyQO7uYmWlrx8GnqGikJ9yd+SeuMIW59mdNOj6P
// SIG // WTkiU0TryF0Dyu1Qen1iIQqAyHNm0aAFYF/opbSnr6j3
// SIG // bTWcfFqK1qI4mfN4i/RN0iAL3gTujJtHgXINwBQy7zBZ
// SIG // Lq7gcfJW5GqXb5JQbZaNaHqasjYUegbyJLkJEVDXCLG4
// SIG // iXqEI2FCKeWjzaIgQdfRnGTZ6iahixTXTBmyUEFxPT9N
// SIG // cCOGDErcgdLMMpSEDQgJlxxPwO5rIHQw0uA5NBCFIRUB
// SIG // COhVMt5xSdkoF1BN5r5N0XWs0Mr7QbhDparTwwVETyw2
// SIG // m+L64kW4I1NsBm9nVX9GtUw/bihaeSbSpKhil9Ie4u1K
// SIG // i7wb/UdKDd9nZn6yW0HQO+T0O/QEY+nvwlQAUaCKKsnO
// SIG // eMzV6ocEGLPOr0mIr/OSmbaz5mEP0oUA51Aa5BuVnRmh
// SIG // uZyxm7EAHu/QD09CbMkKvO5D+jpxpchNJqU1/YldvIVi
// SIG // HTLSoCtU7ZpXwdv6EM8Zt4tKG48BtieVU+i2iW1bvGjU
// SIG // I+iLUaJW+fCmgKDWHrO8Dw9TdSmq6hN35N6MgSGtBxBH
// SIG // Ea2HPQfRdbzP82Z+MIIGsDCCBJigAwIBAgIQCK1AsmDS
// SIG // nEyfXs2pvZOu2TANBgkqhkiG9w0BAQwFADBiMQswCQYD
// SIG // VQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkw
// SIG // FwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMSEwHwYDVQQD
// SIG // ExhEaWdpQ2VydCBUcnVzdGVkIFJvb3QgRzQwHhcNMjEw
// SIG // NDI5MDAwMDAwWhcNMzYwNDI4MjM1OTU5WjBpMQswCQYD
// SIG // VQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4x
// SIG // QTA/BgNVBAMTOERpZ2lDZXJ0IFRydXN0ZWQgRzQgQ29k
// SIG // ZSBTaWduaW5nIFJTQTQwOTYgU0hBMzg0IDIwMjEgQ0Ex
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 1bQvQtAorXi3XdU5WRuxiEL1M4zrPYGXcMW7xIUmMJ+k
// SIG // jmjYXPXrNCQH4UtP03hD9BfXHtr50tVnGlJPDqFX/IiZ
// SIG // wZHMgQM+TXAkZLON4gh9NH1MgFcSa0OamfLFOx/y78tH
// SIG // WhOmTLMBICXzENOLsvsI8IrgnQnAZaf6mIBJNYc9URno
// SIG // kCF4RS6hnyzhGMIazMXuk0lwQjKP+8bqHPNlaJGiTUyC
// SIG // EUhSaN4QvRRXXegYE2XFf7JPhSxIpFaENdb5LpyqABXR
// SIG // N/4aBpTCfMjqGzLmysL0p6MDDnSlrzm2q2AS4+jWufcx
// SIG // 4dyt5Big2MEjR0ezoQ9uo6ttmAaDG7dqZy3SvUQakhCB
// SIG // j7A7CdfHmzJawv9qYFSLScGT7eG0XOBv6yb5jNWy+TgQ
// SIG // 5urOkfW+0/tvk2E0XLyTRSiDNipmKF+wc86LJiUGsoPU
// SIG // XPYVGUztYuBeM/Lo6OwKp7ADK5GyNnm+960IHnWmZcy7
// SIG // 40hQ83eRGv7bUKJGyGFYmPV8AhY8gyitOYbs1LcNU9D4
// SIG // R+Z1MI3sMJN2FKZbS110YU0/EpF23r9Yy3IQKUHw1cVt
// SIG // JnZoEUETWJrcJisB9IlNWdt4z4FKPkBHX8mBUHOFECMh
// SIG // WWCKZFTBzCEa6DgZfGYczXg4RTCZT/9jT0y7qg0IU0F8
// SIG // WD1Hs/q27IwyCQLMbDwMVhECAwEAAaOCAVkwggFVMBIG
// SIG // A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFGg34Ou2
// SIG // O/hfEYb7/mF7CIhl9E5CMB8GA1UdIwQYMBaAFOzX44LS
// SIG // cV1kTN8uZz/nupiuHA9PMA4GA1UdDwEB/wQEAwIBhjAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzB3BggrBgEFBQcBAQRr
// SIG // MGkwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2lj
// SIG // ZXJ0LmNvbTBBBggrBgEFBQcwAoY1aHR0cDovL2NhY2Vy
// SIG // dHMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZFJv
// SIG // b3RHNC5jcnQwQwYDVR0fBDwwOjA4oDagNIYyaHR0cDov
// SIG // L2NybDMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3Rl
// SIG // ZFJvb3RHNC5jcmwwHAYDVR0gBBUwEzAHBgVngQwBAzAI
// SIG // BgZngQwBBAEwDQYJKoZIhvcNAQEMBQADggIBADojRD2N
// SIG // CHbuj7w6mdNW4AIapfhINPMstuZ0ZveUcrEAyq9sMCcT
// SIG // Ep6QRJ9L/Z6jfCbVN7w6XUhtldU/SfQnuxaBRVD9nL22
// SIG // heB2fjdxyyL3WqqQz/WTauPrINHVUHmImoqKwba9oUgY
// SIG // ftzYgBoRGRjNYZmBVvbJ43bnxOQbX0P4PpT/djk9ntSZ
// SIG // z0rdKOtfJqGVWEjVGv7XJz/9kNF2ht0csGBc8w2o7uCJ
// SIG // ob054ThO2m67Np375SFTWsPK6Wrxoj7bQ7gzyE84FJKZ
// SIG // 9d3OVG3ZXQIUH0AzfAPilbLCIXVzUstG2MQ0HKKlS43N
// SIG // b3Y3LIU/Gs4m6Ri+kAewQ3+ViCCCcPDMyu/9KTVcH4k4
// SIG // Vfc3iosJocsL6TEa/y4ZXDlx4b6cpwoG1iZnt5LmTl/e
// SIG // eqxJzy6kdJKt2zyknIYf48FWGysj/4+16oh7cGvmoLr9
// SIG // Oj9FpsToFpFSi0HASIRLlk2rREDjjfAVKM7t8RhWByov
// SIG // EMQMCGQ8M4+uKIw8y4+ICw2/O/TOHnuO77Xry7fwdxPm
// SIG // 5yg/rBKupS8ibEH5glwVZsxsDsrFhsP2JjMMB0ug0wcC
// SIG // ampAMEhLNKhRILutG4UI4lkNbcoFUCvqShyepf2gpx8G
// SIG // dOfy1lKQ/a+FSCH5Vzu0nAPthkX0tGFuv2jiJmCG6siv
// SIG // qf6UHedjGzqGVnhOMIIHvTCCBaWgAwIBAgIQC1DPJGsm
// SIG // Pv2FpykxUVjz/zANBgkqhkiG9w0BAQsFADBpMQswCQYD
// SIG // VQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4x
// SIG // QTA/BgNVBAMTOERpZ2lDZXJ0IFRydXN0ZWQgRzQgQ29k
// SIG // ZSBTaWduaW5nIFJTQTQwOTYgU0hBMzg0IDIwMjEgQ0Ex
// SIG // MB4XDTI0MDQwODAwMDAwMFoXDTI3MDQxMDIzNTk1OVow
// SIG // gcUxEzARBgsrBgEEAYI3PAIBAxMCVVMxGTAXBgsrBgEE
// SIG // AYI3PAIBAhMIRGVsYXdhcmUxHTAbBgNVBA8MFFByaXZh
// SIG // dGUgT3JnYW5pemF0aW9uMRAwDgYDVQQFEwczNTgyNjkx
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5p
// SIG // YTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzETMBEGA1UE
// SIG // ChMKR29vZ2xlIExMQzETMBEGA1UEAxMKR29vZ2xlIExM
// SIG // QzCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIB
// SIG // ALEbiH4H31sVTQxVJTBpKgRjwYubR+0ZwqBSXudeNE/v
// SIG // HfytN3fyutyz2lycUKCW6X3qPjK+zb3+uwbC2WkjRksq
// SIG // NNXqTQYgrBJuksJxRD+cSShaZG/7sJaey0R3WNa5wlAb
// SIG // BrZBAMwgZXaLX0YDr1NzcknsjCou4o7y6jh/0TjC0bo7
// SIG // wYsVKb0Pq1oN2zYwO48NaFeU4bNn7AgEwwYy6GVLoPtr
// SIG // ziEq8TVn4i9kU6wRWyUNBmBRyyAoFsbcyQPnr7wp13PX
// SIG // s5sIy6FI85XC3/NTC881SdXClMJEpoQzgjj6BpJgDaiw
// SIG // hM6muReB1zReN4J2rPsuEwFxp/cSeCaE3bOj5+rSMe4H
// SIG // 1gt5U+k9U1/pRe8jyJ9DSG7c3q18HIa3znV5I26DtG5D
// SIG // +An8iK1gBQpI1kPJyLttRePBjEwav9L7I6iSa2ygp2Aw
// SIG // 8bhjmIFzdK68eBpAwxCNfhY4JUY6e6ors5F5zWqebwcC
// SIG // L2kFJxAYDLML1Gw625Jos/9Fop+VNglkuN4PKo/qYJaD
// SIG // RRqaNLl+5VkwCSakbIo0M03hMBEDUe0urQFzDqXxHAD1
// SIG // tvjiCwgyLL8eDa2Co7+QhZlblAFL7IKWri9GFBZ0RCgG
// SIG // Qj+nA6r//FbYbU00PDgOKHjrJduad4gH6aRwG62MZAGx
// SIG // JcK+yfKxMs+zesiVzeTINs91AgMBAAGjggICMIIB/jAf
// SIG // BgNVHSMEGDAWgBRoN+Drtjv4XxGG+/5hewiIZfROQjAd
// SIG // BgNVHQ4EFgQUT17SRem6UfzmqjVYayx7xFZ0MjQwPQYD
// SIG // VR0gBDYwNDAyBgVngQwBAzApMCcGCCsGAQUFBwIBFhto
// SIG // dHRwOi8vd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwDgYDVR0P
// SIG // AQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMDMIG1
// SIG // BgNVHR8Ega0wgaowU6BRoE+GTWh0dHA6Ly9jcmwzLmRp
// SIG // Z2ljZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRHNENvZGVT
// SIG // aWduaW5nUlNBNDA5NlNIQTM4NDIwMjFDQTEuY3JsMFOg
// SIG // UaBPhk1odHRwOi8vY3JsNC5kaWdpY2VydC5jb20vRGln
// SIG // aUNlcnRUcnVzdGVkRzRDb2RlU2lnbmluZ1JTQTQwOTZT
// SIG // SEEzODQyMDIxQ0ExLmNybDCBlAYIKwYBBQUHAQEEgYcw
// SIG // gYQwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2lj
// SIG // ZXJ0LmNvbTBcBggrBgEFBQcwAoZQaHR0cDovL2NhY2Vy
// SIG // dHMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZEc0
// SIG // Q29kZVNpZ25pbmdSU0E0MDk2U0hBMzg0MjAyMUNBMS5j
// SIG // cnQwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // tWb9U46/Mxfbnpi8mtN8CdXLVl4tSWvsVqzs9HopC1jf
// SIG // /crM0cOsWNH09wcwd0RMXm9emge5jENyq7GOk0vqLLio
// SIG // FAktTqICdKqrkwp2csGIYyVMEDwBe5R3RQ0xr281+F0C
// SIG // FB2C38fmrHZXDPjLtb2AGIbvG5fY7oo9VIkmphrNTKsY
// SIG // 9Pzv5g/pAjDjmoeyh266xmGNt8WaOyCjK2PQivipS1ew
// SIG // onKzCGuNTKo3g5XvyFe1A51diis1KuV9EGth6jKAujRP
// SIG // mCV2u9pZayhDTv/6eF+uKFEEzc0GLaLjiUw0CQ9JYYgb
// SIG // 8Y74kalPqlfXlHTEmmwMHWGmnB82/I64FHXqU2QOjPUK
// SIG // RSdphndsOct8fjpkzhkXzMwLUBsgANOuXsb9IkDOR5b2
// SIG // 5jrFUfo0C0eH58J66eiQlsc9bnhctHaE5xZKGYv1n+Ot
// SIG // O3zA0ownE+LvnEX1ejUaOWJp6lEy9vvQxrBOKZ07vCb+
// SIG // WxI3XK9moP5N/yaci73hUKRtdykpqbYNdpzonDuCFLRK
// SIG // PBFRPrguQK9SvHijXn0g3lX9WQSqzpzTv1dUBOjF2Y/N
// SIG // 4W2EYnBADG7+hG8+wC/gjnMLdGLWvcaaTiU+ITNDLaH4
// SIG // rlMkayJjkI7RETBcRNxZiq+wJ7yMCjxzjo+33njjgLNJ
// SIG // aatyXA55aijNcTH7f/PIimwxghqqMIIapgIBATB9MGkx
// SIG // CzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwg
// SIG // SW5jLjFBMD8GA1UEAxM4RGlnaUNlcnQgVHJ1c3RlZCBH
// SIG // NCBDb2RlIFNpZ25pbmcgUlNBNDA5NiBTSEEzODQgMjAy
// SIG // MSBDQTECEAtQzyRrJj79hacpMVFY8/8wDQYJYIZIAWUD
// SIG // BAIBBQCggYQwGAYKKwYBBAGCNwIBDDEKMAigAoAAoQKA
// SIG // ADAZBgkqhkiG9w0BCQMxDAYKKwYBBAGCNwIBBDAcBgor
// SIG // BgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIBFTAvBgkqhkiG
// SIG // 9w0BCQQxIgQgXpVrjis62I/HX+nTs5PLWfoFer2jD3KZ
// SIG // ItTkFyHrfoEwDQYJKoZIhvcNAQEBBQAEggIAjN+/0MUw
// SIG // XeKZSabacyWs2mNUgfdq3/BUv6wBVVX78ZVkdjaUxWsp
// SIG // gRE8ieQMBU8Tn5uGFwXOB3SCVRN3unrvef845lUWCnHv
// SIG // qCgVZB36dskYg0jlidVRVudnpWFNH3FZDVvt1LoQWudt
// SIG // LU5ZJugw41B8slu3S66Bl5B9FLUQLfNcM/ZoclCKao7N
// SIG // NfDX1tczy9OcrEzxTcZ4Ep3LA6Ms0UUWxTpyyRW7GgAz
// SIG // xLkLmtktgMhgcR11Ir/vB+0QSPhhl5ANOy8Uf3ZH0wS/
// SIG // u080BgLTFK78hlQGDhmy3e8LZzFCiQJm0+OX6LAAQbOE
// SIG // YEnIfibY654j3AQMUD5L0Nip+LjOs7BibPLyLiidRJaq
// SIG // yBcMRwlFC6NmTzqZBUANQs5nJaB0ToQgaKlZFjc+64mb
// SIG // v3n2nvJ0+OIs4FyrQWwvxKGqaC5XbJ31IPo9rB3wD6Lo
// SIG // u98BoTH4DgVqtVfZ1pN9xVropckZ81swDXWhNRnO8qzO
// SIG // ast7S2oyzf3PEkeqNl+BsV0nIcDkArsNacZKqjkXYFr7
// SIG // PvFOEgfguDf97h601hS/a54ZIatZNivHXJwPKmsdnOtU
// SIG // Y6goR3kJ2ygCuv3bU7Bc5yZ4kBxvowcTC6GnWzN+NnkR
// SIG // 0wsYXr7oYoENbnujHFFAdAP70ejmPK6OieReXOsR7M/4
// SIG // L+n0suSa4eSWsUOhghd3MIIXcwYKKwYBBAGCNwMDATGC
// SIG // F2MwghdfBgkqhkiG9w0BBwKgghdQMIIXTAIBAzEPMA0G
// SIG // CWCGSAFlAwQCAQUAMHgGCyqGSIb3DQEJEAEEoGkEZzBl
// SIG // AgEBBglghkgBhv1sBwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // zh0lbV33e+aCRPye1KXH3GSB+FL09RAumlADHLbt8dwC
// SIG // EQCnUBh98NRoSOmHOX9WA2CbGA8yMDI2MDcwODE4MjYx
// SIG // MVqgghM6MIIG7TCCBNWgAwIBAgIQCoDvGEuN8QWC0cR2
// SIG // p5V0aDANBgkqhkiG9w0BAQsFADBpMQswCQYDVQQGEwJV
// SIG // UzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4xQTA/BgNV
// SIG // BAMTOERpZ2lDZXJ0IFRydXN0ZWQgRzQgVGltZVN0YW1w
// SIG // aW5nIFJTQTQwOTYgU0hBMjU2IDIwMjUgQ0ExMB4XDTI1
// SIG // MDYwNDAwMDAwMFoXDTM2MDkwMzIzNTk1OVowYzELMAkG
// SIG // A1UEBhMCVVMxFzAVBgNVBAoTDkRpZ2lDZXJ0LCBJbmMu
// SIG // MTswOQYDVQQDEzJEaWdpQ2VydCBTSEEyNTYgUlNBNDA5
// SIG // NiBUaW1lc3RhbXAgUmVzcG9uZGVyIDIwMjUgMTCCAiIw
// SIG // DQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANBGrC0S
// SIG // xp7Q6q5gVrMrV7pvUf+GcAoB38o3zBlCMGMyqJnfFNZx
// SIG // +wvA69HFTBdwbHwBSOeLpvPnZ8ZN+vo8dE2/pPvOx/Vj
// SIG // 8TchTySA2R4QKpVD7dvNZh6wW2R6kSu9RJt/4QhguSss
// SIG // p3qome7MrxVyfQO9sMx6ZAWjFDYOzDi8SOhPUWlLnh00
// SIG // Cll8pjrUcCV3K3E0zz09ldQ//nBZZREr4h/GI6Dxb2Uo
// SIG // yrN0ijtUDVHRXdmncOOMA3CoB/iUSROUINDT98oksouT
// SIG // MYFOnHoRh6+86Ltc5zjPKHW5KqCvpSduSwhwUmotuQhc
// SIG // g9tw2YD3w6ySSSu+3qU8DD+nigNJFmt6LAHvH3KSuNLo
// SIG // ZLc1Hf2JNMVL4Q1OpbybpMe46YceNA0LfNsnqcnpJeIt
// SIG // K/DhKbPxTTuGoX7wJNdoRORVbPR1VVnDuSeHVZlc4seA
// SIG // O+6d2sC26/PQPdP51ho1zBp+xUIZkpSFA8vWdoUoHLWn
// SIG // qWU3dCCyFG1roSrgHjSHlq8xymLnjCbSLZ49kPmk8iyy
// SIG // izNDIXj//cOgrY7rlRyTlaCCfw7aSUROwnu7zER6EaJ+
// SIG // AliL7ojTdS5PWPsWeupWs7NpChUk555K096V1hE0yZIX
// SIG // e+giAwW00aHzrDchIc2bQhpp0IoKRR7YufAkprxMiXAJ
// SIG // Q1XCmnCfgPf8+3mnAgMBAAGjggGVMIIBkTAMBgNVHRMB
// SIG // Af8EAjAAMB0GA1UdDgQWBBTkO/zyMe39/dfzkXFjGVBD
// SIG // z2GM6DAfBgNVHSMEGDAWgBTvb1NK6eQGfHrK4pBW9i/U
// SIG // SezLTjAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAww
// SIG // CgYIKwYBBQUHAwgwgZUGCCsGAQUFBwEBBIGIMIGFMCQG
// SIG // CCsGAQUFBzABhhhodHRwOi8vb2NzcC5kaWdpY2VydC5j
// SIG // b20wXQYIKwYBBQUHMAKGUWh0dHA6Ly9jYWNlcnRzLmRp
// SIG // Z2ljZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRHNFRpbWVT
// SIG // dGFtcGluZ1JTQTQwOTZTSEEyNTYyMDI1Q0ExLmNydDBf
// SIG // BgNVHR8EWDBWMFSgUqBQhk5odHRwOi8vY3JsMy5kaWdp
// SIG // Y2VydC5jb20vRGlnaUNlcnRUcnVzdGVkRzRUaW1lU3Rh
// SIG // bXBpbmdSU0E0MDk2U0hBMjU2MjAyNUNBMS5jcmwwIAYD
// SIG // VR0gBBkwFzAIBgZngQwBBAIwCwYJYIZIAYb9bAcBMA0G
// SIG // CSqGSIb3DQEBCwUAA4ICAQBlKq3xHCcEua5gQezRCESe
// SIG // Y0ByIfjk9iJP2zWLpQq1b4URGnwWBdEZD9gBq9fNaNmF
// SIG // j6Eh8/YmRDfxT7C0k8FUFqNh+tshgb4O6Lgjg8K8elC4
// SIG // +oWCqnU/ML9lFfim8/9yJmZSe2F8AQ/UdKFOtj7YMTmq
// SIG // PO9mzskgiC3QYIUP2S3HQvHG1FDu+WUqW4daIqToXFE/
// SIG // JQ/EABgfZXLWU0ziTN6R3ygQBHMUBaB5bdrPbF6MRYs0
// SIG // 3h4obEMnxYOX8VBRKe1uNnzQVTeLni2nHkX/QqvXnNb+
// SIG // YkDFkxUGtMTaiLR9wjxUxu2hECZpqyU1d0IbX6Wq8/gV
// SIG // utDojBIFeRlqAcuEVT0cKsb+zJNEsuEB7O7/cuvTQasn
// SIG // M9AWcIQfVjnzrvwiCZ85EE8LUkqRhoS3Y50OHgaY7T/l
// SIG // wd6UArb+BOVAkg2oOvol/DJgddJ35XTxfUlQ+8Hggt8l
// SIG // 2Yv7roancJIFcbojBcxlRcGG0LIhp6GvReQGgMgYxQbV
// SIG // 1S3CrWqZzBt1R9xJgKf47CdxVRd/ndUlQ05oxYy2zRWV
// SIG // FjF7mcr4C34Mj3ocCVccAvlKV9jEnstrniLvUxxVZE/r
// SIG // ptb7IRE2lskKPIJgbaP5t2nGj/ULLi49xTcBZU8atufk
// SIG // +EMF/cWuiC7POGT75qaL6vdCvHlshtjdNXOCIUjsarfN
// SIG // ZzCCBrQwggScoAMCAQICEA3HrFcF/yGZLkBDIgw6SYYw
// SIG // DQYJKoZIhvcNAQELBQAwYjELMAkGA1UEBhMCVVMxFTAT
// SIG // BgNVBAoTDERpZ2lDZXJ0IEluYzEZMBcGA1UECxMQd3d3
// SIG // LmRpZ2ljZXJ0LmNvbTEhMB8GA1UEAxMYRGlnaUNlcnQg
// SIG // VHJ1c3RlZCBSb290IEc0MB4XDTI1MDUwNzAwMDAwMFoX
// SIG // DTM4MDExNDIzNTk1OVowaTELMAkGA1UEBhMCVVMxFzAV
// SIG // BgNVBAoTDkRpZ2lDZXJ0LCBJbmMuMUEwPwYDVQQDEzhE
// SIG // aWdpQ2VydCBUcnVzdGVkIEc0IFRpbWVTdGFtcGluZyBS
// SIG // U0E0MDk2IFNIQTI1NiAyMDI1IENBMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBALR4MdMKmEFyvjxG
// SIG // wBysddujRmh0tFEXnU2tjQ2UtZmWgyxU7UNqEY81FzJs
// SIG // Qqr5G7A6c+Gh/qm8Xi4aPCOo2N8S9SLrC6Kbltqn7SWC
// SIG // WgzbNfiR+2fkHUiljNOqnIVD/gG3SYDEAd4dg2dDGpeZ
// SIG // GKe+42DFUF0mR/vtLa4+gKPsYfwEu7EEbkC9+0F2w4QJ
// SIG // LVSTEG8yAR2CQWIM1iI5PHg62IVwxKSpO0XaF9DPfNBK
// SIG // S7Zazch8NF5vp7eaZ2CVNxpqumzTCNSOxm+SAWSuIr21
// SIG // Qomb+zzQWKhxKTVVgtmUPAW35xUUFREmDrMxSNlr/NsJ
// SIG // yUXzdtFUUt4aS4CEeIY8y9IaaGBpPNXKFifinT7zL2gd
// SIG // FpBP9qh8SdLnEut/GcalNeJQ55IuwnKCgs+nrpuQNfVm
// SIG // UB5KlCX3ZA4x5HHKS+rqBvKWxdCyQEEGcbLe1b8Aw4wJ
// SIG // khU1JrPsFfxW1gaou30yZ46t4Y9F20HHfIY4/6vHespY
// SIG // MQmUiote8ladjS/nJ0+k6MvqzfpzPDOy5y6gqztiT96F
// SIG // v/9bH7mQyogxG9QEPHrPV6/7umw052AkyiLA6tQbZl1K
// SIG // hBtTasySkuJDpsZGKdlsjg4u70EwgWbVRSX1Wd4+zoFp
// SIG // p4Ra+MlKM2baoD6x0VR4RjSpWM8o5a6D8bpfm4CLKczs
// SIG // G7ZrIGNTAgMBAAGjggFdMIIBWTASBgNVHRMBAf8ECDAG
// SIG // AQH/AgEAMB0GA1UdDgQWBBTvb1NK6eQGfHrK4pBW9i/U
// SIG // SezLTjAfBgNVHSMEGDAWgBTs1+OC0nFdZEzfLmc/57qY
// SIG // rhwPTzAOBgNVHQ8BAf8EBAMCAYYwEwYDVR0lBAwwCgYI
// SIG // KwYBBQUHAwgwdwYIKwYBBQUHAQEEazBpMCQGCCsGAQUF
// SIG // BzABhhhodHRwOi8vb2NzcC5kaWdpY2VydC5jb20wQQYI
// SIG // KwYBBQUHMAKGNWh0dHA6Ly9jYWNlcnRzLmRpZ2ljZXJ0
// SIG // LmNvbS9EaWdpQ2VydFRydXN0ZWRSb290RzQuY3J0MEMG
// SIG // A1UdHwQ8MDowOKA2oDSGMmh0dHA6Ly9jcmwzLmRpZ2lj
// SIG // ZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRSb290RzQuY3Js
// SIG // MCAGA1UdIAQZMBcwCAYGZ4EMAQQCMAsGCWCGSAGG/WwH
// SIG // ATANBgkqhkiG9w0BAQsFAAOCAgEAF877FoAc/gc9EXZx
// SIG // ML2+C8i1NKZ/zdCHxYgaMH9Pw5tcBnPw6O6FTGNpoV2V
// SIG // 4wzSUGvI9NAzaoQk97frPBtIj+ZLzdp+yXdhOP4hCFAT
// SIG // uNT+ReOPK0mCefSG+tXqGpYZ3essBS3q8nL2UwM+NMvE
// SIG // uBd/2vmdYxDCvwzJv2sRUoKEfJ+nN57mQfQXwcAEGCvR
// SIG // R2qKtntujB71WPYAgwPyWLKu6RnaID/B0ba2H3LUiwDR
// SIG // AXx1Neq9ydOal95CHfmTnM4I+ZI2rVQfjXQA1WSjjf4J
// SIG // 2a7jLzWGNqNX+DF0SQzHU0pTi4dBwp9nEC8EAqoxW6q1
// SIG // 7r0z0noDjs6+BFo+z7bKSBwZXTRNivYuve3L2oiKNqet
// SIG // RHdqfMTCW/NmKLJ9M+MtucVGyOxiDf06VXxyKkOirv6o
// SIG // 02OoXN4bFzK0vlNMsvhlqgF2puE6FndlENSmE+9JGYxO
// SIG // GLS/D284NHNboDGcmWXfwXRy4kbu4QFhOm0xJuF2EZAO
// SIG // k5eCkhSxZON3rGlHqhpB/8MluDezooIs8CVnrpHMiD2w
// SIG // L40mm53+/j7tFaxYKIqL0Q4ssd8xHZnIn/7GELH3IdvG
// SIG // 2XlM9q7WP/UwgOkw/HQtyRN62JK4S1C8uw3PdBunvAZa
// SIG // psiI5YKdvlarEvf8EA+8hcpSM9LHJmyrxaFtoza2zNaQ
// SIG // 9k+5t1wwggWNMIIEdaADAgECAhAOmxiO+dAt5+/bUOII
// SIG // QBhaMA0GCSqGSIb3DQEBDAUAMGUxCzAJBgNVBAYTAlVT
// SIG // MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsT
// SIG // EHd3dy5kaWdpY2VydC5jb20xJDAiBgNVBAMTG0RpZ2lD
// SIG // ZXJ0IEFzc3VyZWQgSUQgUm9vdCBDQTAeFw0yMjA4MDEw
// SIG // MDAwMDBaFw0zMTExMDkyMzU5NTlaMGIxCzAJBgNVBAYT
// SIG // AlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNV
// SIG // BAsTEHd3dy5kaWdpY2VydC5jb20xITAfBgNVBAMTGERp
// SIG // Z2lDZXJ0IFRydXN0ZWQgUm9vdCBHNDCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAL/mkHNo3rvkXUo8
// SIG // MCIwaTPswqclLskhPfKK2FnC4SmnPVirdprNrnsbhA3E
// SIG // MB/zG6Q4FutWxpdtHauyefLKEdLkX9YFPFIPUh/GnhWl
// SIG // fr6fqVcWWVVyr2iTcMKyunWZanMylNEQRBAu34LzB4Tm
// SIG // dDttceItDBvuINXJIB1jKS3O7F5OyJP4IWGbNOsFxl7s
// SIG // Wxq868nPzaw0QF+xembud8hIqGZXV59UWI4MK7dPpzDZ
// SIG // Vu7Ke13jrclPXuU15zHL2pNe3I6PgNq2kZhAkHnDeMe2
// SIG // scS1ahg4AxCN2NQ3pC4FfYj1gj4QkXCrVYJBMtfbBHMq
// SIG // bpEBfCFM1LyuGwN1XXhm2ToxRJozQL8I11pJpMLmqaBn
// SIG // 3aQnvKFPObURWBf3JFxGj2T3wWmIdph2PVldQnaHiZdp
// SIG // ekjw4KISG2aadMreSx7nDmOu5tTvkpI6nj3cAORFJYm2
// SIG // mkQZK37AlLTSYW3rM9nF30sEAMx9HJXDj/chsrIRt7t/
// SIG // 8tWMcCxBYKqxYxhElRp2Yn72gLD76GSmM9GJB+G9t+ZD
// SIG // pBi4pncB4Q+UDCEdslQpJYls5Q5SUUd0viastkF13nqs
// SIG // X40/ybzTQRESW+UQUOsxxcpyFiIJ33xMdT9j7CFfxCBR
// SIG // a2+xq4aLT8LWRV+dIPyhHsXAj6KxfgommfXkaS+YHS31
// SIG // 2amyHeUbAgMBAAGjggE6MIIBNjAPBgNVHRMBAf8EBTAD
// SIG // AQH/MB0GA1UdDgQWBBTs1+OC0nFdZEzfLmc/57qYrhwP
// SIG // TzAfBgNVHSMEGDAWgBRF66Kv9JLLgjEtUYunpyGd823I
// SIG // DzAOBgNVHQ8BAf8EBAMCAYYweQYIKwYBBQUHAQEEbTBr
// SIG // MCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5kaWdpY2Vy
// SIG // dC5jb20wQwYIKwYBBQUHMAKGN2h0dHA6Ly9jYWNlcnRz
// SIG // LmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEFzc3VyZWRJRFJv
// SIG // b3RDQS5jcnQwRQYDVR0fBD4wPDA6oDigNoY0aHR0cDov
// SIG // L2NybDMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0QXNzdXJl
// SIG // ZElEUm9vdENBLmNybDARBgNVHSAECjAIMAYGBFUdIAAw
// SIG // DQYJKoZIhvcNAQEMBQADggEBAHCgv0NcVec4X6CjdBs9
// SIG // thbX979XB72arKGHLOyFXqkauyL4hxppVCLtpIh3bb0a
// SIG // FPQTSnovLbc47/T/gLn4offyct4kvFIDyE7QKt76LVbP
// SIG // +fT3rDB6mouyXtTP0UNEm0Mh65ZyoUi0mcudT6cGAxN3
// SIG // J0TU53/oWajwvy8LpunyNDzs9wPHh6jSTEAZNUZqaVSw
// SIG // uKFWjuyk1T3osdz9HNj0d1pcVIxv76FQPfx2CWiEn2/K
// SIG // 2yCNNWAcAgPLILCsWKAOQGPFmCLBsln1VWvPJ6tsds5v
// SIG // Iy30fnFqI2si/xK4VC0nftg62fC2h5b9W9FcrBjDTZ9z
// SIG // twGpn1eqXijiuZQxggN8MIIDeAIBATB9MGkxCzAJBgNV
// SIG // BAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwgSW5jLjFB
// SIG // MD8GA1UEAxM4RGlnaUNlcnQgVHJ1c3RlZCBHNCBUaW1l
// SIG // U3RhbXBpbmcgUlNBNDA5NiBTSEEyNTYgMjAyNSBDQTEC
// SIG // EAqA7xhLjfEFgtHEdqeVdGgwDQYJYIZIAWUDBAIBBQCg
// SIG // gdEwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMBwG
// SIG // CSqGSIb3DQEJBTEPFw0yNjA3MDgxODI2MTFaMCsGCyqG
// SIG // SIb3DQEJEAIMMRwwGjAYMBYEFN1iMKyGCi0wa9o4sWh5
// SIG // UjAH+0F+MC8GCSqGSIb3DQEJBDEiBCAxodDdSRV9Jjl+
// SIG // Z4fPbBfCxFGxC4oaXRPcl/FJo4tbEDA3BgsqhkiG9w0B
// SIG // CRACLzEoMCYwJDAiBCBKoD+iLNdchMVck4+CjmdrnK7K
// SIG // sz/jbSaaozTxRhEKMzANBgkqhkiG9w0BAQEFAASCAgCY
// SIG // e422Dsdv54slrexkL7opDwgmGaF4wHApNw8aRolLVehP
// SIG // 3PCE3BQDDNU4HTRNlhF4e93d4itG80etX3kZlzfMg/W3
// SIG // EKy9US/hiQbPx5WqJU/JviCNfMeemc7118i44ZKnB2O8
// SIG // 3esxSd4rYOwIDZldY+d9uyFzFOLcbrelg1DhItX6EU5i
// SIG // dOgIlddEOQ+u5HvcYWHeNoT648FnEDIWPP5XhwDC8l9B
// SIG // Nx0FkY/S2Qjx6ORkJySUZsTab21V7tEOpYsYu1uc1CUb
// SIG // RGjjbC5QKydk3Td6D3/sTuQAsbWOIOAYfLWEUaR1GAf7
// SIG // 6BKI4Te/NWFUA84AkxdwoXa9uB2A2GVYtkKBjxq992s8
// SIG // KJPm/HTajJxXBhkeBwJtP0Doh+q23xu+7edTfSGwg1Lc
// SIG // jNBLCeUDiWiJMjxQJH9+RHmF1vjGPgNe+rhWeUVEGReE
// SIG // pDJUhKF0h6ykvPaec9TluHZroVruxyQccOPbHiSxeCON
// SIG // sxsaC2x8SIgcnmUBcCkKQi5qsJJNC4wW6pbUWRNTwqrC
// SIG // tc++7gQuG2QGWbNYMJRvV2vY7WWjXoGOoTml/xd0FeJf
// SIG // lyBOdU9zWI2d645DHsVied8hLPH9nVzbmTPogtbWlNLb
// SIG // L5eBOqKgtPl36rBiEsUxFv/HVkstjLQKC+um1ITXU6OD
// SIG // IpxjU2Op+ee5EMQRAMTz3w==
// SIG // End signature block
