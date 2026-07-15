/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import express, {} from 'express';
import { DefaultRequestHandler, InMemoryTaskStore, DefaultExecutionEventBus, UnauthenticatedUser, } from '@a2a-js/sdk/server';
import { A2AExpressApp } from '@a2a-js/sdk/server/express'; // Import server components
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
import { GCSTaskStore, NoOpTaskStore } from '../persistence/gcs.js';
import { CoderAgentExecutor } from '../agent/executor.js';
import { requestStorage } from './requestStorage.js';
import { loadConfig, loadEnvironment, setTargetDir } from '../config/config.js';
import { loadSettings } from '../config/settings.js';
import { loadExtensions } from '../config/extension.js';
import { commandRegistry } from '../commands/command-registry.js';
import { debugLogger, SimpleExtensionLoader, GitService, checkPathTrust, isHeadlessMode, } from '@google/gemini-cli-core';
const coderAgentCard = {
    name: 'Gemini SDLC Agent',
    description: 'An agent that generates code based on natural language instructions and streams file outputs.',
    url: 'http://localhost:41242/',
    provider: {
        organization: 'Google',
        url: 'https://google.com',
    },
    protocolVersion: '0.3.0',
    version: '0.0.2', // Incremented version
    capabilities: {
        streaming: true,
        pushNotifications: false,
        stateTransitionHistory: true,
    },
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
        },
        basicAuth: {
            type: 'http',
            scheme: 'basic',
        },
    },
    security: [{ bearerAuth: [] }, { basicAuth: [] }],
    defaultInputModes: ['text'],
    defaultOutputModes: ['text'],
    skills: [
        {
            id: 'code_generation',
            name: 'Code Generation',
            description: 'Generates code snippets or complete files based on user requests, streaming the results.',
            tags: ['code', 'development', 'programming'],
            examples: [
                'Write a python function to calculate fibonacci numbers.',
                'Create an HTML file with a basic button that alerts "Hello!" when clicked.',
            ],
            inputModes: ['text'],
            outputModes: ['text'],
        },
    ],
    supportsAuthenticatedExtendedCard: false,
};
export function updateCoderAgentCardUrl(port) {
    coderAgentCard.url = `http://localhost:${port}/`;
}
const customUserBuilder = async (req) => {
    const auth = req.headers['authorization'];
    if (auth) {
        const scheme = auth.split(' ')[0];
        logger.info(`[customUserBuilder] Received Authorization header with scheme: ${scheme}`);
    }
    if (!auth)
        return new UnauthenticatedUser();
    // 1. Bearer Auth
    if (auth.startsWith('Bearer ')) {
        const token = auth.substring(7);
        if (token === 'valid-token') {
            return { userName: 'bearer-user', isAuthenticated: true };
        }
    }
    // 2. Basic Auth
    if (auth.startsWith('Basic ')) {
        const credentials = Buffer.from(auth.substring(6), 'base64').toString();
        if (credentials === 'admin:password') {
            return { userName: 'basic-user', isAuthenticated: true };
        }
    }
    return new UnauthenticatedUser();
};
async function handleExecuteCommand(req, res, context) {
    logger.info('[CoreAgent] Received /executeCommand request: ', req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { command, args } = req.body;
    try {
        if (typeof command !== 'string') {
            return res.status(400).json({ error: 'Invalid "command" field.' });
        }
        if (args && !Array.isArray(args)) {
            return res.status(400).json({ error: '"args" field must be an array.' });
        }
        const commandToExecute = commandRegistry.get(command);
        if (commandToExecute?.requiresWorkspace) {
            if (!process.env['CODER_AGENT_WORKSPACE_PATH']) {
                return res.status(400).json({
                    error: `Command "${command}" requires a workspace, but CODER_AGENT_WORKSPACE_PATH is not set.`,
                });
            }
        }
        if (!commandToExecute) {
            return res.status(404).json({ error: `Command not found: ${command}` });
        }
        if (commandToExecute.streaming) {
            const eventBus = new DefaultExecutionEventBus();
            res.setHeader('Content-Type', 'text/event-stream');
            const eventHandler = (event) => {
                const jsonRpcResponse = {
                    jsonrpc: '2.0',
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
                    id: 'taskId' in event ? event.taskId : event.messageId,
                    result: event,
                };
                res.write(`data: ${JSON.stringify(jsonRpcResponse)}\n`);
            };
            eventBus.on('event', eventHandler);
            await commandToExecute.execute({ ...context, eventBus }, args ?? []);
            eventBus.off('event', eventHandler);
            eventBus.finished();
            return res.end(); // Explicit return for streaming path
        }
        else {
            const result = await commandToExecute.execute(context, args ?? []);
            logger.info('[CoreAgent] Sending /executeCommand response: ', result);
            return res.status(200).json(result);
        }
    }
    catch (e) {
        logger.error(`Error executing /executeCommand: ${command} with args: ${JSON.stringify(args)}`, e);
        const errorMessage = e instanceof Error ? e.message : 'Unknown error executing command';
        return res.status(500).json({ error: errorMessage });
    }
}
export async function createApp() {
    try {
        // Load the server configuration once on startup.
        const workspaceRoot = setTargetDir(undefined);
        loadEnvironment();
        // Use a temporary settings load to check if folder trust is enabled.
        // This is similar to how the CLI handles the initial trust check.
        const initialSettings = loadSettings(workspaceRoot, false);
        const { isTrusted } = checkPathTrust({
            path: workspaceRoot,
            isFolderTrustEnabled: initialSettings.folderTrust ?? true,
            isHeadless: isHeadlessMode(),
        });
        const settings = loadSettings(workspaceRoot, isTrusted ?? false);
        const extensions = loadExtensions(workspaceRoot);
        const config = await loadConfig(settings, new SimpleExtensionLoader(extensions), 'a2a-server', isTrusted ?? false);
        let git;
        if (config.getCheckpointingEnabled()) {
            git = new GitService(config.getTargetDir(), config.storage);
            await git.initialize();
        }
        // loadEnvironment() is called within getConfig now
        const bucketName = process.env['GCS_BUCKET_NAME'];
        let taskStoreForExecutor;
        let taskStoreForHandler;
        if (bucketName) {
            logger.info(`Using GCSTaskStore with bucket: ${bucketName}`);
            const gcsTaskStore = new GCSTaskStore(bucketName);
            taskStoreForExecutor = gcsTaskStore;
            taskStoreForHandler = new NoOpTaskStore(gcsTaskStore);
        }
        else {
            logger.info('Using InMemoryTaskStore');
            const inMemoryTaskStore = new InMemoryTaskStore();
            taskStoreForExecutor = inMemoryTaskStore;
            taskStoreForHandler = inMemoryTaskStore;
        }
        const agentExecutor = new CoderAgentExecutor(taskStoreForExecutor);
        const context = { config, git, agentExecutor };
        const requestHandler = new DefaultRequestHandler(coderAgentCard, taskStoreForHandler, agentExecutor);
        let expressApp = express();
        expressApp.use((req, res, next) => {
            requestStorage.run({ req }, next);
        });
        const appBuilder = new A2AExpressApp(requestHandler, customUserBuilder);
        expressApp = appBuilder.setupRoutes(expressApp, '');
        expressApp.use(express.json());
        expressApp.post('/tasks', async (req, res) => {
            try {
                const taskId = uuidv4();
                // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
                const agentSettings = req.body.agentSettings;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const contextId = req.body.contextId || uuidv4();
                const wrapper = await agentExecutor.createTask(taskId, contextId, agentSettings);
                await taskStoreForExecutor.save(wrapper.toSDKTask());
                res.status(201).json(wrapper.id);
            }
            catch (error) {
                logger.error('[CoreAgent] Error creating task:', error);
                const errorMessage = error instanceof Error
                    ? error.message
                    : 'Unknown error creating task';
                res.status(500).send({ error: errorMessage });
            }
        });
        expressApp.post('/executeCommand', (req, res) => {
            void handleExecuteCommand(req, res, context);
        });
        expressApp.get('/listCommands', (req, res) => {
            try {
                const transformCommand = (command, visited) => {
                    const commandName = command.name;
                    if (visited.includes(commandName)) {
                        debugLogger.warn(`Command ${commandName} already inserted in the response, skipping`);
                        return undefined;
                    }
                    return {
                        name: command.name,
                        description: command.description,
                        arguments: command.arguments ?? [],
                        subCommands: (command.subCommands ?? [])
                            .map((subCommand) => transformCommand(subCommand, visited.concat(commandName)))
                            .filter((subCommand) => !!subCommand),
                    };
                };
                const commands = commandRegistry
                    .getAllCommands()
                    .filter((command) => command.topLevel)
                    .map((command) => transformCommand(command, []));
                return res.status(200).json({ commands });
            }
            catch (e) {
                logger.error('Error executing /listCommands:', e);
                const errorMessage = e instanceof Error ? e.message : 'Unknown error listing commands';
                return res.status(500).json({ error: errorMessage });
            }
        });
        expressApp.get('/tasks/metadata', async (req, res) => {
            // This endpoint is only meaningful if the task store is in-memory.
            if (!(taskStoreForExecutor instanceof InMemoryTaskStore)) {
                res.status(501).send({
                    error: 'Listing all task metadata is only supported when using InMemoryTaskStore.',
                });
            }
            try {
                const wrappers = agentExecutor.getAllTasks();
                if (wrappers && wrappers.length > 0) {
                    const tasksMetadata = await Promise.all(wrappers.map((wrapper) => wrapper.task.getMetadata()));
                    res.status(200).json(tasksMetadata);
                }
                else {
                    res.status(204).send();
                }
            }
            catch (error) {
                logger.error('[CoreAgent] Error getting all task metadata:', error);
                const errorMessage = error instanceof Error
                    ? error.message
                    : 'Unknown error getting task metadata';
                res.status(500).send({ error: errorMessage });
            }
        });
        expressApp.get('/tasks/:taskId/metadata', async (req, res) => {
            const taskId = req.params.taskId;
            let wrapper = agentExecutor.getTask(taskId);
            if (!wrapper) {
                const sdkTask = await taskStoreForExecutor.load(taskId);
                if (sdkTask) {
                    wrapper = await agentExecutor.reconstruct(sdkTask);
                }
            }
            if (!wrapper) {
                res.status(404).send({ error: 'Task not found' });
                return;
            }
            res.json({ metadata: await wrapper.task.getMetadata() });
        });
        return expressApp;
    }
    catch (error) {
        logger.error('[CoreAgent] Error during startup:', error);
        process.exit(1);
    }
}
export async function main() {
    try {
        const expressApp = await createApp();
        const port = Number(process.env['CODER_AGENT_PORT'] || 0);
        const server = expressApp.listen(port, 'localhost', () => {
            const address = server.address();
            let actualPort;
            if (process.env['CODER_AGENT_PORT']) {
                actualPort = process.env['CODER_AGENT_PORT'];
            }
            else if (address && typeof address !== 'string') {
                actualPort = address.port;
            }
            else {
                throw new Error('[Core Agent] Could not find port number.');
            }
            updateCoderAgentCardUrl(Number(actualPort));
            logger.info(`[CoreAgent] Agent Server started on http://localhost:${actualPort}`);
            logger.info(`[CoreAgent] Agent Card: http://localhost:${actualPort}/.well-known/agent-card.json`);
            logger.info('[CoreAgent] Press Ctrl+C to stop the server');
        });
    }
    catch (error) {
        logger.error('[CoreAgent] Error during startup:', error);
        process.exit(1);
    }
}
//# sourceMappingURL=app.js.map
// SIG // Begin signature block
// SIG // MIIvWwYJKoZIhvcNAQcCoIIvTDCCL0gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // pLH0cMBhVhCjJrT+foUS6rs80zJMx7o7BnmhRSgRCUag
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
// SIG // 9w0BCQQxIgQg0eNTLvctWVdKEqUDQQBwL93u8DZzhhn5
// SIG // IKoc7MZdD6QwDQYJKoZIhvcNAQEBBQAEggIAGNefZCKm
// SIG // wXTWNaP6o1s4fPgXapH4w/S7ZLhMdp5qbVXHL5iDtrre
// SIG // MFBqNVeKTkD1QzXtVyCgLVrSu/lG3UJOrUxh1uwnqHsO
// SIG // leONa80K81q8e5mbzwN796cLrPUAOujakYEdTmOScidZ
// SIG // /2orob3444i49aU/75ziSGE4arf17tPLaLAL/hjwHe2D
// SIG // 0X1fwehczHahSN+zfgOotI1h+/lNXcCV8FuaXlSqO2LM
// SIG // Eus58zEGqRbffGILTuV6f0lOZczXk/eSIkwQzT9I3x9O
// SIG // lGaocXDuzzR6YBsLSz6delv9kc2XNT7eZ5AH2gdXrlxx
// SIG // +2PbUQhFs3VXP7OueTZkWXL2Q1nLe2RM1NuPRxNlTlJy
// SIG // F01fLISPx3b++ijI8NzWtkYIqkya5CrEe24Fp3JGC97/
// SIG // BNwFWDhg8GQcgUhqQdlmIGOyX8VJm0qWhXy3jZ+QccB/
// SIG // o8jzWwh+kLUYpdYy1eI+NHqkzEXSgILgr4kgryYhiA3T
// SIG // GMRU6oehNJe7aQEeE2qmzLfp3M0JLUQYpNoGG0H1Rg26
// SIG // KDNDuunnbNHWW/5ubcOjftJ8yPKhnbe+qYXqPN9qKrSy
// SIG // 9iksXdtKTKhGRL2kvZh1V/Tg8D0hSVJE18Hds63Edk+Z
// SIG // On6rP+3dX6p6KLefIgxXPM8WuDTFGoJVFMxLxXewbFM5
// SIG // S6/3Db+IWRaq8OKhghd3MIIXcwYKKwYBBAGCNwMDATGC
// SIG // F2MwghdfBgkqhkiG9w0BBwKgghdQMIIXTAIBAzEPMA0G
// SIG // CWCGSAFlAwQCAQUAMHgGCyqGSIb3DQEJEAEEoGkEZzBl
// SIG // AgEBBglghkgBhv1sBwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // X+W+zPdiqQVilNVn/5Lwxip8wbljnoDD1lMhAQsw5AoC
// SIG // EQCih5MG7iWAs9ST6E1Tf+GxGA8yMDI2MDcwODE4MjYx
// SIG // MFqgghM6MIIG7TCCBNWgAwIBAgIQCoDvGEuN8QWC0cR2
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
// SIG // CSqGSIb3DQEJBTEPFw0yNjA3MDgxODI2MTBaMCsGCyqG
// SIG // SIb3DQEJEAIMMRwwGjAYMBYEFN1iMKyGCi0wa9o4sWh5
// SIG // UjAH+0F+MC8GCSqGSIb3DQEJBDEiBCB62FkzSOrG0xav
// SIG // EWqTqOw9pS2usFA7r8Zq0Ys0cMVPOzA3BgsqhkiG9w0B
// SIG // CRACLzEoMCYwJDAiBCBKoD+iLNdchMVck4+CjmdrnK7K
// SIG // sz/jbSaaozTxRhEKMzANBgkqhkiG9w0BAQEFAASCAgAc
// SIG // mZHOJhXiVlb2cqvsALX/Oau8x7apm4NRLAeDV+NbE9B0
// SIG // f6kL+L74GXrdzFXzgbkQLSVwYUzeuS/uRblE9nxWDSBs
// SIG // yH+5zPTLefKOI9tiMbZJGFRPOPXH4ZtzYQ/VgjC8ujh5
// SIG // dIeY0AP9Er7CqpaQ6SqHazBTXoN4ssIJX5JnMgxda1qT
// SIG // rI2ZSFymq5vC2Qedp4Al0oTZi8iJ61c0UiOxkBKX7Qdp
// SIG // B4mBJyb/s5yZcxUykHNwhuv6TuZ4/Qjk5aLPSiylhAA7
// SIG // z3oBOHkeWOG79l9cfonJVToQOkK66VaiZ6hXh4Aw3D07
// SIG // pJs6tPa3wFaESH82gC+zQVVMXyjiiizKcai4JX27TGql
// SIG // RpXSbrNYG4GdD0qAOwLMR3CGSzZxGXcoNi2B1TZeg6UQ
// SIG // VXUQWQcqcqOANeuzhP3ULZD2F4p91V06SNjsW0mjLLSx
// SIG // 9PNOL4QprxjxeKQX8TwEENcuNNl/j7N5Yjs8PtsXTjsn
// SIG // DjEeFsdw4MJyO4oQ2/up634ZBN6eXDB9ExRNyz09InfP
// SIG // PPXsYXo6jc4R++FA1lb4kzgX3Dql+0GMUADJyQ8SNBgF
// SIG // QIf0zXaMh9hOufd1kVMPWU7dVaBAxpq+wwH0KwyrfFyJ
// SIG // ntohXMdeyU/m4I7cFmEktPbzYTbBf4+Vm45lKQxZiRur
// SIG // DhXz9ocB+G608kerif1TKQ==
// SIG // End signature block
