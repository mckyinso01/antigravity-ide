/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as path from 'node:path';
import { loadConfig } from './config.js';
import { getCodeAssistServer, Config, ExperimentFlags, fetchAdminControlsOnce, AuthType, isHeadlessMode, FatalAuthenticationError, PolicyDecision, ApprovalMode, PRIORITY_YOLO_ALLOW_ALL, createPolicyEngineConfig, } from '@google/gemini-cli-core';
// Mock dependencies
vi.mock('@google/gemini-cli-core', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        PRIORITY_YOLO_ALLOW_ALL: 998,
        Config: vi.fn().mockImplementation((params) => {
            const mockConfig = {
                ...params,
                initialize: vi.fn(),
                waitForMcpInit: vi.fn(),
                refreshAuth: vi.fn(),
                getExperiments: vi.fn().mockReturnValue({
                    flags: {
                        [actual.ExperimentFlags.ENABLE_ADMIN_CONTROLS]: {
                            boolValue: false,
                        },
                    },
                }),
                getRemoteAdminSettings: vi.fn(),
                setRemoteAdminSettings: vi.fn(),
            };
            return mockConfig;
        }),
        startupProfiler: {
            flush: vi.fn(),
        },
        isHeadlessMode: vi.fn().mockReturnValue(false),
        getCodeAssistServer: vi.fn(),
        fetchAdminControlsOnce: vi.fn(),
        createPolicyEngineConfig: vi
            .fn()
            .mockImplementation((_settings, mode, _defaultPoliciesDir, _interactive) => ({
            rules: mode === actual.ApprovalMode.YOLO
                ? [
                    {
                        toolName: '*',
                        decision: actual.PolicyDecision.ALLOW,
                        priority: actual.PRIORITY_YOLO_ALLOW_ALL,
                        modes: [actual.ApprovalMode.YOLO],
                        allowRedirection: true,
                    },
                ]
                : [
                    {
                        toolName: 'read_file',
                        decision: actual.PolicyDecision.ALLOW,
                        priority: 1.05,
                        source: 'Default: read-only.toml',
                    },
                ],
            checkers: [],
        })),
        coreEvents: {
            emitAdminSettingsChanged: vi.fn(),
        },
    };
});
vi.mock('../utils/logger.js', () => ({
    logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    },
}));
describe('loadConfig', () => {
    const mockSettings = {};
    const mockExtensionLoader = {};
    const taskId = 'test-task-id';
    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubEnv('GEMINI_API_KEY', 'test-key');
    });
    afterEach(() => {
        vi.unstubAllEnvs();
    });
    describe('admin settings overrides', () => {
        it('should not fetch admin controls if experiment is disabled', async () => {
            await loadConfig(mockSettings, mockExtensionLoader, taskId);
            expect(fetchAdminControlsOnce).not.toHaveBeenCalled();
        });
        it('should pass clientName as a2a-server to Config', async () => {
            await loadConfig(mockSettings, mockExtensionLoader, taskId);
            expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                clientName: 'a2a-server',
            }));
        });
        describe('when admin controls experiment is enabled', () => {
            beforeEach(() => {
                // We need to cast to any here to modify the mock implementation
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Config.mockImplementation((params) => {
                    const mockConfig = {
                        ...params,
                        initialize: vi.fn(),
                        waitForMcpInit: vi.fn(),
                        refreshAuth: vi.fn(),
                        getExperiments: vi.fn().mockReturnValue({
                            flags: {
                                [ExperimentFlags.ENABLE_ADMIN_CONTROLS]: {
                                    boolValue: true,
                                },
                            },
                        }),
                        getRemoteAdminSettings: vi.fn().mockReturnValue({}),
                        setRemoteAdminSettings: vi.fn(),
                    };
                    return mockConfig;
                });
            });
            it('should fetch admin controls and apply them', async () => {
                const mockAdminSettings = {
                    mcpSetting: {
                        mcpEnabled: false,
                    },
                    cliFeatureSetting: {
                        extensionsSetting: {
                            extensionsEnabled: false,
                        },
                    },
                    strictModeDisabled: false,
                };
                vi.mocked(fetchAdminControlsOnce).mockResolvedValue(mockAdminSettings);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenLastCalledWith(expect.objectContaining({
                    disableYoloMode: !mockAdminSettings.strictModeDisabled,
                    mcpEnabled: mockAdminSettings.mcpSetting?.mcpEnabled,
                    extensionsEnabled: mockAdminSettings.cliFeatureSetting?.extensionsSetting
                        ?.extensionsEnabled,
                }));
            });
            it('should treat unset admin settings as false when admin settings are passed', async () => {
                const mockAdminSettings = {
                    mcpSetting: {
                        mcpEnabled: true,
                    },
                };
                vi.mocked(fetchAdminControlsOnce).mockResolvedValue(mockAdminSettings);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenLastCalledWith(expect.objectContaining({
                    disableYoloMode: !false,
                    mcpEnabled: mockAdminSettings.mcpSetting?.mcpEnabled,
                    extensionsEnabled: undefined,
                }));
            });
            it('should not pass default unset admin settings when no admin settings are present', async () => {
                const mockAdminSettings = {};
                vi.mocked(fetchAdminControlsOnce).mockResolvedValue(mockAdminSettings);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenLastCalledWith(expect.objectContaining({}));
            });
            it('should fetch admin controls using the code assist server when available', async () => {
                const mockAdminSettings = {
                    mcpSetting: {
                        mcpEnabled: true,
                    },
                    strictModeDisabled: true,
                };
                const mockCodeAssistServer = { projectId: 'test-project' };
                vi.mocked(getCodeAssistServer).mockReturnValue(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                mockCodeAssistServer);
                vi.mocked(fetchAdminControlsOnce).mockResolvedValue(mockAdminSettings);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(fetchAdminControlsOnce).toHaveBeenCalledWith(mockCodeAssistServer, true);
                expect(Config).toHaveBeenLastCalledWith(expect.objectContaining({
                    disableYoloMode: !mockAdminSettings.strictModeDisabled,
                    mcpEnabled: mockAdminSettings.mcpSetting?.mcpEnabled,
                    extensionsEnabled: undefined,
                }));
            });
        });
    });
    it('should set customIgnoreFilePaths when CUSTOM_IGNORE_FILE_PATHS env var is present', async () => {
        const testPath = '/tmp/ignore';
        vi.stubEnv('CUSTOM_IGNORE_FILE_PATHS', testPath);
        const config = await loadConfig(mockSettings, mockExtensionLoader, taskId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(config.fileFiltering.customIgnoreFilePaths).toEqual([
            testPath,
        ]);
    });
    it('should set customIgnoreFilePaths when settings.fileFiltering.customIgnoreFilePaths is present', async () => {
        const testPath = '/settings/ignore';
        const settings = {
            fileFiltering: {
                customIgnoreFilePaths: [testPath],
            },
        };
        const config = await loadConfig(settings, mockExtensionLoader, taskId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(config.fileFiltering.customIgnoreFilePaths).toEqual([
            testPath,
        ]);
    });
    it('should merge customIgnoreFilePaths from settings and env var', async () => {
        const envPath = '/env/ignore';
        const settingsPath = '/settings/ignore';
        vi.stubEnv('CUSTOM_IGNORE_FILE_PATHS', envPath);
        const settings = {
            fileFiltering: {
                customIgnoreFilePaths: [settingsPath],
            },
        };
        const config = await loadConfig(settings, mockExtensionLoader, taskId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(config.fileFiltering.customIgnoreFilePaths).toEqual([
            settingsPath,
            envPath,
        ]);
    });
    it('should split CUSTOM_IGNORE_FILE_PATHS using system delimiter', async () => {
        const paths = ['/path/one', '/path/two'];
        vi.stubEnv('CUSTOM_IGNORE_FILE_PATHS', paths.join(path.delimiter));
        const config = await loadConfig(mockSettings, mockExtensionLoader, taskId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(config.fileFiltering.customIgnoreFilePaths).toEqual(paths);
    });
    it('should have empty customIgnoreFilePaths when both are missing', async () => {
        const config = await loadConfig(mockSettings, mockExtensionLoader, taskId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(config.fileFiltering.customIgnoreFilePaths).toEqual([]);
    });
    describe('policy engine configuration', () => {
        it('should map tool settings into policySettings', async () => {
            const settings = {
                tools: {
                    allowed: ['v2-allowed'],
                    exclude: ['v2-exclude'],
                    core: ['v2-core'],
                },
                mcpServers: {
                    test: { command: 'test', args: [] },
                },
                policyPaths: ['/path/to/policy'],
                adminPolicyPaths: ['/path/to/admin/policy'],
            };
            await loadConfig(settings, mockExtensionLoader, taskId);
            expect(createPolicyEngineConfig).toHaveBeenCalledWith(expect.objectContaining({
                tools: {
                    core: ['v2-core'],
                    exclude: ['v2-exclude'],
                    allowed: ['v2-allowed'],
                },
                mcpServers: settings.mcpServers,
                policyPaths: settings.policyPaths,
                adminPolicyPaths: settings.adminPolicyPaths,
            }), ApprovalMode.DEFAULT, undefined, true);
        });
    });
    describe('tool configuration', () => {
        it('should pass V2 tools.allowed to Config properly', async () => {
            const settings = {
                tools: {
                    allowed: ['shell', 'fetch'],
                },
            };
            await loadConfig(settings, mockExtensionLoader, taskId);
            expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                allowedTools: ['shell', 'fetch'],
            }));
        });
        it('should pass enableAgents to Config constructor', async () => {
            const settings = {
                experimental: {
                    enableAgents: false,
                },
            };
            await loadConfig(settings, mockExtensionLoader, taskId);
            expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                enableAgents: false,
            }));
        });
        it('should default enableAgents to true when not provided', async () => {
            await loadConfig(mockSettings, mockExtensionLoader, taskId);
            expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                enableAgents: true,
            }));
        });
        describe('interactivity', () => {
            it('should always set interactive true', async () => {
                vi.mocked(isHeadlessMode).mockReturnValue(true);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                    interactive: true,
                }));
                vi.mocked(isHeadlessMode).mockReturnValue(false);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                    interactive: true,
                }));
            });
            it('should set enableInteractiveShell based on headless mode', async () => {
                vi.mocked(isHeadlessMode).mockReturnValue(false);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                    enableInteractiveShell: true,
                }));
                vi.mocked(isHeadlessMode).mockReturnValue(true);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                    enableInteractiveShell: false,
                }));
            });
        });
        describe('YOLO mode', () => {
            it('should enable YOLO mode and add policy rule when GEMINI_YOLO_MODE is true', async () => {
                vi.stubEnv('GEMINI_YOLO_MODE', 'true');
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                    approvalMode: 'yolo',
                    policyEngineConfig: expect.objectContaining({
                        rules: expect.arrayContaining([
                            expect.objectContaining({
                                decision: PolicyDecision.ALLOW,
                                priority: PRIORITY_YOLO_ALLOW_ALL,
                                modes: ['yolo'],
                                allowRedirection: true,
                            }),
                        ]),
                    }),
                }));
            });
            it('should use default approval mode and load default rules when GEMINI_YOLO_MODE is not true', async () => {
                vi.stubEnv('GEMINI_YOLO_MODE', 'false');
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(Config).toHaveBeenCalledWith(expect.objectContaining({
                    approvalMode: 'default',
                    policyEngineConfig: expect.objectContaining({
                        rules: expect.arrayContaining([
                            expect.objectContaining({
                                toolName: 'read_file',
                                decision: PolicyDecision.ALLOW,
                            }),
                        ]),
                    }),
                }));
            });
        });
        describe('authentication logic', () => {
            const setupConfigMock = (refreshAuthMock) => {
                vi.mocked(Config).mockImplementation((params) => ({
                    ...params,
                    initialize: vi.fn(),
                    waitForMcpInit: vi.fn(),
                    refreshAuth: refreshAuthMock,
                    getExperiments: vi.fn().mockReturnValue({ flags: {} }),
                    getRemoteAdminSettings: vi.fn(),
                    setRemoteAdminSettings: vi.fn(),
                }));
            };
            beforeEach(() => {
                vi.stubEnv('USE_CCPA', 'true');
                vi.stubEnv('GEMINI_API_KEY', '');
            });
            afterEach(() => {
                vi.unstubAllEnvs();
            });
            it('should attempt COMPUTE_ADC by default and bypass LOGIN_WITH_GOOGLE if successful', async () => {
                const refreshAuthMock = vi.fn().mockResolvedValue(undefined);
                setupConfigMock(refreshAuthMock);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(refreshAuthMock).toHaveBeenCalledWith(AuthType.COMPUTE_ADC);
                expect(refreshAuthMock).not.toHaveBeenCalledWith(AuthType.LOGIN_WITH_GOOGLE);
            });
            it('should fallback to LOGIN_WITH_GOOGLE if COMPUTE_ADC fails and interactive mode is available', async () => {
                vi.mocked(isHeadlessMode).mockReturnValue(false);
                const refreshAuthMock = vi.fn().mockImplementation((authType) => {
                    if (authType === AuthType.COMPUTE_ADC) {
                        return Promise.reject(new Error('ADC failed'));
                    }
                    return Promise.resolve();
                });
                setupConfigMock(refreshAuthMock);
                await loadConfig(mockSettings, mockExtensionLoader, taskId);
                expect(refreshAuthMock).toHaveBeenCalledWith(AuthType.COMPUTE_ADC);
                expect(refreshAuthMock).toHaveBeenCalledWith(AuthType.LOGIN_WITH_GOOGLE);
            });
            it('should throw FatalAuthenticationError in headless mode if COMPUTE_ADC fails', async () => {
                vi.mocked(isHeadlessMode).mockReturnValue(true);
                const refreshAuthMock = vi.fn().mockImplementation((authType) => {
                    if (authType === AuthType.COMPUTE_ADC) {
                        return Promise.reject(new Error('ADC not found'));
                    }
                    return Promise.resolve();
                });
                setupConfigMock(refreshAuthMock);
                await expect(loadConfig(mockSettings, mockExtensionLoader, taskId)).rejects.toThrow('COMPUTE_ADC failed: ADC not found. (LOGIN_WITH_GOOGLE fallback skipped due to headless mode. Run in an interactive terminal to use OAuth.)');
                expect(refreshAuthMock).toHaveBeenCalledWith(AuthType.COMPUTE_ADC);
                expect(refreshAuthMock).not.toHaveBeenCalledWith(AuthType.LOGIN_WITH_GOOGLE);
            });
            it('should include both original and fallback error when LOGIN_WITH_GOOGLE fallback fails', async () => {
                vi.mocked(isHeadlessMode).mockReturnValue(false);
                const refreshAuthMock = vi.fn().mockImplementation((authType) => {
                    if (authType === AuthType.COMPUTE_ADC) {
                        throw new Error('ADC failed');
                    }
                    if (authType === AuthType.LOGIN_WITH_GOOGLE) {
                        throw new FatalAuthenticationError('OAuth failed');
                    }
                    return Promise.resolve();
                });
                setupConfigMock(refreshAuthMock);
                await expect(loadConfig(mockSettings, mockExtensionLoader, taskId)).rejects.toThrow('OAuth failed. The initial COMPUTE_ADC attempt also failed: ADC failed');
            });
        });
    });
});
describe('setIsTrusted', () => {
    beforeEach(() => {
        vi.resetModules();
    });
    afterEach(() => {
        vi.unstubAllEnvs();
    });
    it('should return true when GEMINI_FOLDER_TRUST env var is true', async () => {
        vi.stubEnv('GEMINI_FOLDER_TRUST', 'true');
        const { setIsTrusted } = await import('./config.js');
        expect(setIsTrusted(undefined)).toBe(true);
        expect(setIsTrusted({ isTrusted: false })).toBe(true);
    });
    it('should return false when GEMINI_FOLDER_TRUST env var is false', async () => {
        vi.stubEnv('GEMINI_FOLDER_TRUST', 'false');
        const { setIsTrusted } = await import('./config.js');
        expect(setIsTrusted(undefined)).toBe(false);
        expect(setIsTrusted({ isTrusted: true })).toBe(false);
    });
    it('should fallback to agentSettings.isTrusted if env var is undefined', async () => {
        const { setIsTrusted } = await import('./config.js');
        expect(setIsTrusted({ isTrusted: true })).toBe(true);
        expect(setIsTrusted({ isTrusted: false })).toBe(false);
        expect(setIsTrusted(undefined)).toBe(false);
    });
});
//# sourceMappingURL=config.test.js.map
// SIG // Begin signature block
// SIG // MIIvWwYJKoZIhvcNAQcCoIIvTDCCL0gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // b86N/vnaGR02Fn339dVZdLSFYXzZsScWplbAqdOiqmCg
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
// SIG // 9w0BCQQxIgQgQ1I/PEbxK/Hjx+uiwUIjHoT5EPJ/Fi1X
// SIG // ayuTDvIzhxIwDQYJKoZIhvcNAQEBBQAEggIAHKIyfDp3
// SIG // mZYIP3VUtqv87RERRVO4PKhmoPHFjc61FL/jB0KPbQ0K
// SIG // PuEct8uUMxS/TXJzq3ferJFzCbMlNDIfQQJcagoep0+Z
// SIG // A9rHxMhP1lV7Ctbdoc8tqn0YlYY6o9g9Tgw0ExkGfHn3
// SIG // KAwn+l+RdRpe68AON65c/e+0kLxaFY5TpXFQ8SuYTbMs
// SIG // PAM49jCI0aOLzYlJ6/EPnB1v3h3n/+q5YnA1O8YaaZA4
// SIG // RLPR+mAH6ZD8EUnCPBelLgoVHf7q/fuXVq3cwGmMourT
// SIG // bMEDZ/3EOLFefFLxy6kUNehQUdvnHvt+yZmQ+ujCZIyo
// SIG // RyUk7X6ESmOr366umk1l1vLoIaT0g8r6lU8coXcQ9SZ2
// SIG // T5m24+zHHe79qrGXFD9AnpUyXu4oFxp73ZALg7Sfcy+Q
// SIG // BDB1krZlthleIwQ3BWS85U4CiO5yU67cd0RWAWNa8Ilr
// SIG // 9Ulk+9dWugiD742V6OkXEvyJlQ+QhPzUgA49eWzoTw0X
// SIG // PuBOZ8g/P8pPjdgrXXAQ4QzfUP0ZDSKQBlQRyUZCATdH
// SIG // lQMS+KV5Ixz4Egt2nYG/q92vHFNk5W0/Dgp3irVgvMfd
// SIG // +g5uaXkXzebIxFPv7SmZltXTrzBB2QcUCPNaiQZBMb4C
// SIG // +e5EkgBeFfdzk/ek2UgnWgAF6aLd4UY25i8Gk3kxbPMF
// SIG // umjTMAg2HINuqUGhghd3MIIXcwYKKwYBBAGCNwMDATGC
// SIG // F2MwghdfBgkqhkiG9w0BBwKgghdQMIIXTAIBAzEPMA0G
// SIG // CWCGSAFlAwQCAQUAMHgGCyqGSIb3DQEJEAEEoGkEZzBl
// SIG // AgEBBglghkgBhv1sBwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // NikGJNPoLl2QXEz3kipF6Vf75104meMrt3QcATehnBgC
// SIG // EQC1aZkwlO/MWALDrfd1BDIUGA8yMDI2MDcwODE4MjYw
// SIG // OVqgghM6MIIG7TCCBNWgAwIBAgIQCoDvGEuN8QWC0cR2
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
// SIG // CSqGSIb3DQEJBTEPFw0yNjA3MDgxODI2MDlaMCsGCyqG
// SIG // SIb3DQEJEAIMMRwwGjAYMBYEFN1iMKyGCi0wa9o4sWh5
// SIG // UjAH+0F+MC8GCSqGSIb3DQEJBDEiBCDEay1NOcWt2Q6H
// SIG // HCTXxS67x8H15vIdaaBAus6GuhDkCjA3BgsqhkiG9w0B
// SIG // CRACLzEoMCYwJDAiBCBKoD+iLNdchMVck4+CjmdrnK7K
// SIG // sz/jbSaaozTxRhEKMzANBgkqhkiG9w0BAQEFAASCAgAl
// SIG // LUNz36qm/WcOPQB40nO2HJgya4mCxWmlCRCoWYb/Ds4h
// SIG // ZHt8nbIk/i7nVXs9cr/kdWrOaZKjSN88Bax6Tdz4xyEb
// SIG // NdQWkl8zMKZsCer8joJNzwDWKsiQtICtQmm2MOyDBcQe
// SIG // uMkG8v8s4LTmWJlXeKScQeehwpHscmHh4Mxs5+mhqJ5v
// SIG // ZvhQDNAsmAn+PY9MCMtx4EZOKEimg/Aoll5NRsQSVilU
// SIG // VHaK+EF6tHplJL1TT9lK2NTxNyOsF17WTRQjRaR3+axa
// SIG // J+DXb2+d3SnkknOy9uRttJ8ZDo80V8DCQEgHWBWPkWW6
// SIG // Tn4/LKVtYSwOE6zlBXTO28BT2vUlNfAK2DUC1w34Jwku
// SIG // JpOrE24H0nnaid1PQyw4uIkrC9jPWiN0rLmDO5vA4iRz
// SIG // VIdmaLbJgOo35AZn8tJRnvwrLLtglhCaTGg5XE3QRevu
// SIG // Aph93HsN5UCl9/q+J9DrPtffrcNdbUh3FeIaL9IFqeaN
// SIG // d7XniG17YPoGYuwcR9kW/3ydMiE3eHImWxrQ2uNcglwl
// SIG // YPfm+Lc6F8NZPsoYsjPw5OjHtYRsAgLILHH0QnhJ5gPT
// SIG // XVqxH589f8pz9kw5F2VcPRkJ/zaj+PFL4RQ4l63tWTfP
// SIG // f1n27UU4HJKLhqQWntDcPSEx3QnsVDBqPxehhAo4U2f1
// SIG // AQ5rf+cpv/P9QoHJ0dYAzA==
// SIG // End signature block
