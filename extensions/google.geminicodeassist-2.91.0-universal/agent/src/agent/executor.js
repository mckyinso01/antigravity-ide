/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GeminiEventType, SimpleExtensionLoader, } from '@google/gemini-cli-core';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
import { CoderAgentEvent, getPersistedState, setPersistedState, getContextIdFromMetadata, getAgentSettingsFromMetadata, } from '../types.js';
import { loadConfig, loadEnvironment, setIsTrusted, setTargetDir, } from '../config/config.js';
import { loadSettings } from '../config/settings.js';
import { loadExtensions } from '../config/extension.js';
import { Task } from './task.js';
import { requestStorage } from '../http/requestStorage.js';
import { pushTaskStateFailed } from '../utils/executor_utils.js';
/**
 * Provides a wrapper for Task. Passes data from Task to SDKTask.
 * The idea is to use this class inside CoderAgentExecutor to replace Task.
 */
class TaskWrapper {
    task;
    agentSettings;
    constructor(task, agentSettings) {
        this.task = task;
        this.agentSettings = agentSettings;
    }
    get id() {
        return this.task.id;
    }
    toSDKTask() {
        const persistedState = {
            _agentSettings: this.agentSettings,
            _taskState: this.task.taskState,
        };
        const sdkTask = {
            id: this.task.id,
            contextId: this.task.contextId,
            kind: 'task',
            status: {
                state: this.task.taskState,
                timestamp: new Date().toISOString(),
            },
            metadata: setPersistedState({}, persistedState),
            history: [],
            artifacts: [],
        };
        sdkTask.metadata['_contextId'] = this.task.contextId;
        return sdkTask;
    }
}
/**
 * CoderAgentExecutor implements the agent's core logic for code generation.
 */
export class CoderAgentExecutor {
    taskStore;
    tasks = new Map();
    // Track tasks with an active execution loop.
    executingTasks = new Set();
    constructor(taskStore) {
        this.taskStore = taskStore;
    }
    async getConfig(agentSettings, taskId) {
        const workspaceRoot = setTargetDir(agentSettings);
        loadEnvironment(); // Will override any global env with workspace envs
        const isTrusted = setIsTrusted(agentSettings);
        const settings = loadSettings(workspaceRoot, isTrusted);
        const extensions = loadExtensions(workspaceRoot);
        return loadConfig(settings, new SimpleExtensionLoader(extensions), taskId, isTrusted);
    }
    /**
     * Reconstructs TaskWrapper from SDKTask.
     */
    async reconstruct(sdkTask, eventBus) {
        const metadata = sdkTask.metadata || {};
        const persistedState = getPersistedState(metadata);
        if (!persistedState) {
            throw new Error(`Cannot reconstruct task ${sdkTask.id}: missing persisted state in metadata.`);
        }
        const agentSettings = persistedState._agentSettings;
        const config = await this.getConfig(agentSettings, sdkTask.id);
        const contextId = getContextIdFromMetadata(metadata) || sdkTask.contextId;
        const runtimeTask = await Task.create(sdkTask.id, contextId, config, eventBus, agentSettings.autoExecute);
        runtimeTask.taskState = persistedState._taskState;
        await runtimeTask.geminiClient.initialize();
        const wrapper = new TaskWrapper(runtimeTask, agentSettings);
        this.tasks.set(sdkTask.id, wrapper);
        logger.info(`Task ${sdkTask.id} reconstructed from store.`);
        return wrapper;
    }
    async createTask(taskId, contextId, agentSettingsInput, eventBus) {
        const agentSettings = agentSettingsInput || {
            kind: CoderAgentEvent.StateAgentSettingsEvent,
            workspacePath: process.cwd(),
        };
        const config = await this.getConfig(agentSettings, taskId);
        const runtimeTask = await Task.create(taskId, contextId, config, eventBus, agentSettings.autoExecute);
        await runtimeTask.geminiClient.initialize();
        const wrapper = new TaskWrapper(runtimeTask, agentSettings);
        this.tasks.set(taskId, wrapper);
        logger.info(`New task ${taskId} created.`);
        return wrapper;
    }
    getTask(taskId) {
        return this.tasks.get(taskId);
    }
    getAllTasks() {
        return Array.from(this.tasks.values());
    }
    cancelTask = async (taskId, eventBus) => {
        logger.info(`[CoderAgentExecutor] Received cancel request for task ${taskId}`);
        const wrapper = this.tasks.get(taskId);
        if (!wrapper) {
            logger.warn(`[CoderAgentExecutor] Task ${taskId} not found for cancellation.`);
            eventBus.publish({
                kind: 'status-update',
                taskId,
                contextId: uuidv4(),
                status: {
                    state: 'failed',
                    message: {
                        kind: 'message',
                        role: 'agent',
                        parts: [{ kind: 'text', text: `Task ${taskId} not found.` }],
                        messageId: uuidv4(),
                        taskId,
                    },
                },
                final: true,
            });
            return;
        }
        const { task } = wrapper;
        if (task.taskState === 'canceled' || task.taskState === 'failed') {
            logger.info(`[CoderAgentExecutor] Task ${taskId} is already in a final state: ${task.taskState}. No action needed for cancellation.`);
            eventBus.publish({
                kind: 'status-update',
                taskId,
                contextId: task.contextId,
                status: {
                    state: task.taskState,
                    message: {
                        kind: 'message',
                        role: 'agent',
                        parts: [
                            {
                                kind: 'text',
                                text: `Task ${taskId} is already ${task.taskState}.`,
                            },
                        ],
                        messageId: uuidv4(),
                        taskId,
                    },
                },
                final: true,
            });
            return;
        }
        try {
            logger.info(`[CoderAgentExecutor] Initiating cancellation for task ${taskId}.`);
            task.cancelPendingTools('Task canceled by user request.');
            const stateChange = {
                kind: CoderAgentEvent.StateChangeEvent,
            };
            task.setTaskStateAndPublishUpdate('canceled', stateChange, 'Task canceled by user request.', undefined, true);
            logger.info(`[CoderAgentExecutor] Task ${taskId} cancellation processed. Saving state.`);
            await this.taskStore?.save(wrapper.toSDKTask());
            logger.info(`[CoderAgentExecutor] Task ${taskId} state CANCELED saved.`);
            // Cleanup listener subscriptions to avoid memory leaks.
            wrapper.task.dispose();
            this.tasks.delete(taskId);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`[CoderAgentExecutor] Error during task cancellation for ${taskId}: ${errorMessage}`, error);
            eventBus.publish({
                kind: 'status-update',
                taskId,
                contextId: task.contextId,
                status: {
                    state: 'failed',
                    message: {
                        kind: 'message',
                        role: 'agent',
                        parts: [
                            {
                                kind: 'text',
                                text: `Failed to process cancellation for task ${taskId}: ${errorMessage}`,
                            },
                        ],
                        messageId: uuidv4(),
                        taskId,
                    },
                },
                final: true,
            });
        }
    };
    async execute(requestContext, eventBus) {
        const userMessage = requestContext.userMessage;
        const sdkTask = requestContext.task;
        const taskId = sdkTask?.id || userMessage.taskId || uuidv4();
        const contextId = userMessage.contextId ||
            sdkTask?.contextId ||
            getContextIdFromMetadata(sdkTask?.metadata) ||
            uuidv4();
        logger.info(`[CoderAgentExecutor] Executing for taskId: ${taskId}, contextId: ${contextId}`);
        logger.info(`[CoderAgentExecutor] userMessage: ${JSON.stringify(userMessage)}`);
        eventBus.on('event', (event) => logger.info('[EventBus event]: ', event));
        const store = requestStorage.getStore();
        if (!store) {
            logger.error('[CoderAgentExecutor] Could not get request from async local storage. Cancellation on socket close will not be handled for this request.');
        }
        const abortController = new AbortController();
        const abortSignal = abortController.signal;
        if (store) {
            // Grab the raw socket from the request object
            const socket = store.req.socket;
            const onSocketEnd = () => {
                logger.info(`[CoderAgentExecutor] Socket ended for message ${userMessage.messageId} (task ${taskId}). Aborting execution loop.`);
                if (!abortController.signal.aborted) {
                    abortController.abort();
                }
                // Clean up the listener to prevent memory leaks
                socket.removeListener('end', onSocketEnd);
            };
            // Listen on the socket's 'end' event (remote closed the connection)
            socket.on('end', onSocketEnd);
            socket.once('close', () => {
                socket.removeListener('end', onSocketEnd);
            });
            // It's also good practice to remove the listener if the task completes successfully
            abortSignal.addEventListener('abort', () => {
                socket.removeListener('end', onSocketEnd);
            });
            logger.info(`[CoderAgentExecutor] Socket close handler set up for task ${taskId}.`);
        }
        let wrapper = this.tasks.get(taskId);
        if (wrapper) {
            wrapper.task.eventBus = eventBus;
            logger.info(`[CoderAgentExecutor] Task ${taskId} found in memory cache.`);
        }
        else if (sdkTask) {
            logger.info(`[CoderAgentExecutor] Task ${taskId} found in TaskStore. Reconstructing...`);
            try {
                wrapper = await this.reconstruct(sdkTask, eventBus);
            }
            catch (e) {
                logger.error(`[CoderAgentExecutor] Failed to hydrate task ${taskId}:`, e);
                const stateChange = {
                    kind: CoderAgentEvent.StateChangeEvent,
                };
                eventBus.publish({
                    kind: 'status-update',
                    taskId,
                    contextId: sdkTask.contextId,
                    status: {
                        state: 'failed',
                        message: {
                            kind: 'message',
                            role: 'agent',
                            parts: [
                                {
                                    kind: 'text',
                                    text: 'Internal error: Task state lost or corrupted.',
                                },
                            ],
                            messageId: uuidv4(),
                            taskId,
                            contextId: sdkTask.contextId,
                        },
                    },
                    final: true,
                    metadata: { coderAgent: stateChange },
                });
                return;
            }
        }
        else {
            logger.info(`[CoderAgentExecutor] Creating new task ${taskId}.`);
            const agentSettings = getAgentSettingsFromMetadata(userMessage.metadata);
            try {
                wrapper = await this.createTask(taskId, contextId, agentSettings, eventBus);
            }
            catch (error) {
                logger.error(`[CoderAgentExecutor] Error creating task ${taskId}:`, error);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                pushTaskStateFailed(error, eventBus, taskId, contextId);
                return;
            }
            const newTaskSDK = wrapper.toSDKTask();
            eventBus.publish({
                ...newTaskSDK,
                kind: 'task',
                status: { state: 'submitted', timestamp: new Date().toISOString() },
                history: [userMessage],
            });
            try {
                await this.taskStore?.save(newTaskSDK);
                logger.info(`[CoderAgentExecutor] New task ${taskId} saved to store.`);
            }
            catch (saveError) {
                logger.error(`[CoderAgentExecutor] Failed to save new task ${taskId} to store:`, saveError);
            }
        }
        if (!wrapper) {
            logger.error(`[CoderAgentExecutor] Task ${taskId} is unexpectedly undefined after load/create.`);
            return;
        }
        const currentTask = wrapper.task;
        if (['canceled', 'failed', 'completed'].includes(currentTask.taskState)) {
            logger.warn(`[CoderAgentExecutor] Attempted to execute task ${taskId} which is already in state ${currentTask.taskState}. Ignoring.`);
            return;
        }
        if (this.executingTasks.has(taskId)) {
            logger.info(`[CoderAgentExecutor] Task ${taskId} has a pending execution. Processing message and yielding.`);
            currentTask.eventBus = eventBus;
            for await (const _ of currentTask.acceptUserMessage(requestContext, abortController.signal)) {
                logger.info(`[CoderAgentExecutor] Processing user message ${userMessage.messageId} in secondary execution loop for task ${taskId}.`);
            }
            // End this execution-- the original/source will be resumed.
            return;
        }
        // Check if this is the primary/initial execution for this task
        const isPrimaryExecution = !this.executingTasks.has(taskId);
        if (!isPrimaryExecution) {
            logger.info(`[CoderAgentExecutor] Primary execution already active for task ${taskId}. Starting secondary loop for message ${userMessage.messageId}.`);
            currentTask.eventBus = eventBus;
            for await (const _ of currentTask.acceptUserMessage(requestContext, abortController.signal)) {
                logger.info(`[CoderAgentExecutor] Processing user message ${userMessage.messageId} in secondary execution loop for task ${taskId}.`);
            }
            // End this execution-- the original/source will be resumed.
            return;
        }
        logger.info(`[CoderAgentExecutor] Starting main execution for message ${userMessage.messageId} for task ${taskId}.`);
        this.executingTasks.add(taskId);
        try {
            let agentTurnActive = true;
            logger.info(`[CoderAgentExecutor] Task ${taskId}: Processing user turn.`);
            let agentEvents = currentTask.acceptUserMessage(requestContext, abortSignal);
            while (agentTurnActive) {
                logger.info(`[CoderAgentExecutor] Task ${taskId}: Processing agent turn (LLM stream).`);
                const toolCallRequests = [];
                for await (const event of agentEvents) {
                    if (abortSignal.aborted) {
                        logger.warn(`[CoderAgentExecutor] Task ${taskId}: Abort signal received during agent event processing.`);
                        throw new Error('Execution aborted');
                    }
                    if (event.type === GeminiEventType.ToolCallRequest) {
                        toolCallRequests.push(event.value);
                        continue;
                    }
                    await currentTask.acceptAgentMessage(event);
                }
                if (abortSignal.aborted)
                    throw new Error('Execution aborted');
                if (toolCallRequests.length > 0) {
                    logger.info(`[CoderAgentExecutor] Task ${taskId}: Found ${toolCallRequests.length} tool call requests. Scheduling as a batch.`);
                    await currentTask.scheduleToolCalls(toolCallRequests, abortSignal);
                }
                logger.info(`[CoderAgentExecutor] Task ${taskId}: Waiting for pending tools if any.`);
                await currentTask.waitForPendingTools();
                logger.info(`[CoderAgentExecutor] Task ${taskId}: All pending tools completed or none were pending.`);
                if (abortSignal.aborted)
                    throw new Error('Execution aborted');
                if (currentTask.hasPendingTools) {
                    logger.info(`[CoderAgentExecutor] Task ${taskId}: There are still ${currentTask.pendingToolsCount} pending tools waiting for approval. Yielding to user.`);
                    agentTurnActive = false;
                }
                else {
                    const completedTools = currentTask.getAndClearCompletedTools();
                    if (completedTools.length > 0) {
                        // If all completed tool calls were canceled, manually add them to history and set state to input-required, final:true
                        if (completedTools.every((tool) => tool.status === 'cancelled')) {
                            logger.info(`[CoderAgentExecutor] Task ${taskId}: All tool calls were cancelled. Updating history and ending agent turn.`);
                            currentTask.addToolResponsesToHistory(completedTools);
                            agentTurnActive = false;
                            const stateChange = {
                                kind: CoderAgentEvent.StateChangeEvent,
                            };
                            currentTask.setTaskStateAndPublishUpdate('input-required', stateChange, undefined, undefined, true);
                        }
                        else {
                            logger.info(`[CoderAgentExecutor] Task ${taskId}: Found ${completedTools.length} completed tool calls. Sending results back to LLM.`);
                            agentEvents = currentTask.sendCompletedToolsToLlm(completedTools, abortSignal);
                            // Continue the loop to process the LLM response to the tool results.
                        }
                    }
                    else {
                        logger.info(`[CoderAgentExecutor] Task ${taskId}: No more tool calls to process. Ending agent turn.`);
                        agentTurnActive = false;
                    }
                }
            }
            logger.info(`[CoderAgentExecutor] Task ${taskId}: Agent turn finished, setting to input-required.`);
            const stateChange = {
                kind: CoderAgentEvent.StateChangeEvent,
            };
            currentTask.setTaskStateAndPublishUpdate('input-required', stateChange, undefined, undefined, true);
        }
        catch (error) {
            if (abortSignal.aborted) {
                logger.warn(`[CoderAgentExecutor] Task ${taskId} execution aborted.`);
                currentTask.cancelPendingTools('Execution aborted');
                if (currentTask.taskState !== 'canceled' &&
                    currentTask.taskState !== 'failed') {
                    currentTask.setTaskStateAndPublishUpdate('input-required', { kind: CoderAgentEvent.StateChangeEvent }, 'Execution aborted by client.', undefined, true);
                }
            }
            else {
                const errorMessage = error instanceof Error ? error.message : 'Agent execution error';
                logger.error(`[CoderAgentExecutor] Error executing agent for task ${taskId}:`, error);
                currentTask.cancelPendingTools(errorMessage);
                if (currentTask.taskState !== 'failed') {
                    const stateChange = {
                        kind: CoderAgentEvent.StateChangeEvent,
                    };
                    currentTask.setTaskStateAndPublishUpdate('failed', stateChange, errorMessage, undefined, true);
                }
            }
        }
        finally {
            if (isPrimaryExecution) {
                this.executingTasks.delete(taskId);
                logger.info(`[CoderAgentExecutor] Saving final state for task ${taskId}.`);
                try {
                    await this.taskStore?.save(wrapper.toSDKTask());
                    logger.info(`[CoderAgentExecutor] Task ${taskId} state saved.`);
                }
                catch (saveError) {
                    logger.error(`[CoderAgentExecutor] Failed to save task ${taskId} state in finally block:`, saveError);
                }
                if (['canceled', 'failed', 'completed'].includes(currentTask.taskState)) {
                    logger.info(`[CoderAgentExecutor] Task ${taskId} reached terminal state ${currentTask.taskState}. Evicting and disposing.`);
                    wrapper.task.dispose();
                    this.tasks.delete(taskId);
                }
            }
        }
    }
}
//# sourceMappingURL=executor.js.map
// SIG // Begin signature block
// SIG // MIIvWgYJKoZIhvcNAQcCoIIvSzCCL0cCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // fPIM52pvWIeSbm7GrFqLE3oyP37MEccjZ914LisOHZWg
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
// SIG // aatyXA55aijNcTH7f/PIimwxghqpMIIapQIBATB9MGkx
// SIG // CzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwg
// SIG // SW5jLjFBMD8GA1UEAxM4RGlnaUNlcnQgVHJ1c3RlZCBH
// SIG // NCBDb2RlIFNpZ25pbmcgUlNBNDA5NiBTSEEzODQgMjAy
// SIG // MSBDQTECEAtQzyRrJj79hacpMVFY8/8wDQYJYIZIAWUD
// SIG // BAIBBQCggYQwGAYKKwYBBAGCNwIBDDEKMAigAoAAoQKA
// SIG // ADAZBgkqhkiG9w0BCQMxDAYKKwYBBAGCNwIBBDAcBgor
// SIG // BgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIBFTAvBgkqhkiG
// SIG // 9w0BCQQxIgQgQKVx66A6oBMgxsTqqZ1gSkHkEAPmFzky
// SIG // +QWMHJs/INIwDQYJKoZIhvcNAQEBBQAEggIADeyHkIHz
// SIG // DQ58WiLCzbyApAvFWDQctMDX8Evj4W5+pKLA+5jWHjDH
// SIG // RrgXPKR1Z8jWfT25dQw6t9LR5USR73jVT9NBJLfoFvE0
// SIG // MKsgh9bWRl62eNsGSQaSBduzH2s6QI7epn2WdS8E+3dN
// SIG // BFrRa5FoMiSLVuXbz8++l2xi/qiB4WPDaH56j4OvmCE1
// SIG // wfLpCj8aUvgdtjaspo0go+XkwxjO+jcUVGj0fKAHu7BH
// SIG // tlNi1newxiSGUcBKPGEEyeLRypJl3fBp9IQOj0JVpkiM
// SIG // RfRMVf4BXY0sAv9+0eDPYdHjr5LQwFUD/N5b/9b30LLJ
// SIG // pgUYWlb87CBuJdc3SlZuld6ahMQWZgigU/wdKF7dNk7y
// SIG // OwZVe9jDdL4oX+UlWiNgFRgtwbdQEaHuBWJkD/qiRzll
// SIG // aeerGjFraHbV4jJvJMBDxadT0NcEC6zP5LoVohrVNLAo
// SIG // maVK9Tue4rusytOu4ijITH+8L2uhAumTFaCOP/uyL+qr
// SIG // pbv6tmv+z3qjOKIQZNxD5ABHzdnhg+xFW++NFv0XTOEl
// SIG // K4WD4WmiEjQpC+hbL+5c0Q8SM1MUHmGlMVKjYUyGIZ+E
// SIG // MzkuB3VAHjZNuJ+7yQ3W9hHKr1xSzmRhaAZk8xl9MKMt
// SIG // AP2zjoQO7zPM7Ch5yrOmSZdFlIE/r7RyVeFeXObFt3mg
// SIG // ec6A2bPxxiYW58ahghd2MIIXcgYKKwYBBAGCNwMDATGC
// SIG // F2IwghdeBgkqhkiG9w0BBwKgghdPMIIXSwIBAzEPMA0G
// SIG // CWCGSAFlAwQCAQUAMHcGCyqGSIb3DQEJEAEEoGgEZjBk
// SIG // AgEBBglghkgBhv1sBwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // ip9Y5ckDCCzqbV+U35Fl43X6KvpgA9LwcUlkfw7+socC
// SIG // EEFc1+zuzhF+fTGrstdIcgwYDzIwMjYwNzA4MTgyNjA3
// SIG // WqCCEzowggbtMIIE1aADAgECAhAKgO8YS43xBYLRxHan
// SIG // lXRoMA0GCSqGSIb3DQEBCwUAMGkxCzAJBgNVBAYTAlVT
// SIG // MRcwFQYDVQQKEw5EaWdpQ2VydCwgSW5jLjFBMD8GA1UE
// SIG // AxM4RGlnaUNlcnQgVHJ1c3RlZCBHNCBUaW1lU3RhbXBp
// SIG // bmcgUlNBNDA5NiBTSEEyNTYgMjAyNSBDQTEwHhcNMjUw
// SIG // NjA0MDAwMDAwWhcNMzYwOTAzMjM1OTU5WjBjMQswCQYD
// SIG // VQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4x
// SIG // OzA5BgNVBAMTMkRpZ2lDZXJ0IFNIQTI1NiBSU0E0MDk2
// SIG // IFRpbWVzdGFtcCBSZXNwb25kZXIgMjAyNSAxMIICIjAN
// SIG // BgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0EasLRLG
// SIG // ntDqrmBWsytXum9R/4ZwCgHfyjfMGUIwYzKomd8U1nH7
// SIG // C8Dr0cVMF3BsfAFI54um8+dnxk36+jx0Tb+k+87H9WPx
// SIG // NyFPJIDZHhAqlUPt281mHrBbZHqRK71Em3/hCGC5Kyyn
// SIG // eqiZ7syvFXJ9A72wzHpkBaMUNg7MOLxI6E9RaUueHTQK
// SIG // WXymOtRwJXcrcTTPPT2V1D/+cFllESviH8YjoPFvZSjK
// SIG // s3SKO1QNUdFd2adw44wDcKgH+JRJE5Qg0NP3yiSyi5Mx
// SIG // gU6cehGHr7zou1znOM8odbkqoK+lJ25LCHBSai25CFyD
// SIG // 23DZgPfDrJJJK77epTwMP6eKA0kWa3osAe8fcpK40uhk
// SIG // tzUd/Yk0xUvhDU6lvJukx7jphx40DQt82yepyekl4i0r
// SIG // 8OEps/FNO4ahfvAk12hE5FVs9HVVWcO5J4dVmVzix4A7
// SIG // 7p3awLbr89A90/nWGjXMGn7FQhmSlIUDy9Z2hSgctaep
// SIG // ZTd0ILIUbWuhKuAeNIeWrzHKYueMJtItnj2Q+aTyLLKL
// SIG // M0MheP/9w6CtjuuVHJOVoIJ/DtpJRE7Ce7vMRHoRon4C
// SIG // WIvuiNN1Lk9Y+xZ66lazs2kKFSTnnkrT3pXWETTJkhd7
// SIG // 6CIDBbTRofOsNyEhzZtCGmnQigpFHti58CSmvEyJcAlD
// SIG // VcKacJ+A9/z7eacCAwEAAaOCAZUwggGRMAwGA1UdEwEB
// SIG // /wQCMAAwHQYDVR0OBBYEFOQ7/PIx7f391/ORcWMZUEPP
// SIG // YYzoMB8GA1UdIwQYMBaAFO9vU0rp5AZ8esrikFb2L9RJ
// SIG // 7MtOMA4GA1UdDwEB/wQEAwIHgDAWBgNVHSUBAf8EDDAK
// SIG // BggrBgEFBQcDCDCBlQYIKwYBBQUHAQEEgYgwgYUwJAYI
// SIG // KwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNv
// SIG // bTBdBggrBgEFBQcwAoZRaHR0cDovL2NhY2VydHMuZGln
// SIG // aWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZEc0VGltZVN0
// SIG // YW1waW5nUlNBNDA5NlNIQTI1NjIwMjVDQTEuY3J0MF8G
// SIG // A1UdHwRYMFYwVKBSoFCGTmh0dHA6Ly9jcmwzLmRpZ2lj
// SIG // ZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRHNFRpbWVTdGFt
// SIG // cGluZ1JTQTQwOTZTSEEyNTYyMDI1Q0ExLmNybDAgBgNV
// SIG // HSAEGTAXMAgGBmeBDAEEAjALBglghkgBhv1sBwEwDQYJ
// SIG // KoZIhvcNAQELBQADggIBAGUqrfEcJwS5rmBB7NEIRJ5j
// SIG // QHIh+OT2Ik/bNYulCrVvhREafBYF0RkP2AGr181o2YWP
// SIG // oSHz9iZEN/FPsLSTwVQWo2H62yGBvg7ouCODwrx6ULj6
// SIG // hYKqdT8wv2UV+Kbz/3ImZlJ7YXwBD9R0oU62PtgxOao8
// SIG // 72bOySCILdBghQ/ZLcdC8cbUUO75ZSpbh1oipOhcUT8l
// SIG // D8QAGB9lctZTTOJM3pHfKBAEcxQFoHlt2s9sXoxFizTe
// SIG // HihsQyfFg5fxUFEp7W42fNBVN4ueLaceRf9Cq9ec1v5i
// SIG // QMWTFQa0xNqItH3CPFTG7aEQJmmrJTV3Qhtfparz+BW6
// SIG // 0OiMEgV5GWoBy4RVPRwqxv7Mk0Sy4QHs7v9y69NBqycz
// SIG // 0BZwhB9WOfOu/CIJnzkQTwtSSpGGhLdjnQ4eBpjtP+XB
// SIG // 3pQCtv4E5UCSDag6+iX8MmB10nfldPF9SVD7weCC3yXZ
// SIG // i/uuhqdwkgVxuiMFzGVFwYbQsiGnoa9F5AaAyBjFBtXV
// SIG // LcKtapnMG3VH3EmAp/jsJ3FVF3+d1SVDTmjFjLbNFZUW
// SIG // MXuZyvgLfgyPehwJVxwC+UpX2MSey2ueIu9THFVkT+um
// SIG // 1vshETaWyQo8gmBto/m3acaP9QsuLj3FNwFlTxq25+T4
// SIG // QwX9xa6ILs84ZPvmpovq90K8eWyG2N01c4IhSOxqt81n
// SIG // MIIGtDCCBJygAwIBAgIQDcesVwX/IZkuQEMiDDpJhjAN
// SIG // BgkqhkiG9w0BAQsFADBiMQswCQYDVQQGEwJVUzEVMBMG
// SIG // A1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cu
// SIG // ZGlnaWNlcnQuY29tMSEwHwYDVQQDExhEaWdpQ2VydCBU
// SIG // cnVzdGVkIFJvb3QgRzQwHhcNMjUwNTA3MDAwMDAwWhcN
// SIG // MzgwMTE0MjM1OTU5WjBpMQswCQYDVQQGEwJVUzEXMBUG
// SIG // A1UEChMORGlnaUNlcnQsIEluYy4xQTA/BgNVBAMTOERp
// SIG // Z2lDZXJ0IFRydXN0ZWQgRzQgVGltZVN0YW1waW5nIFJT
// SIG // QTQwOTYgU0hBMjU2IDIwMjUgQ0ExMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAtHgx0wqYQXK+PEbA
// SIG // HKx126NGaHS0URedTa2NDZS1mZaDLFTtQ2oRjzUXMmxC
// SIG // qvkbsDpz4aH+qbxeLho8I6jY3xL1IusLopuW2qftJYJa
// SIG // DNs1+JH7Z+QdSKWM06qchUP+AbdJgMQB3h2DZ0Mal5kY
// SIG // p77jYMVQXSZH++0trj6Ao+xh/AS7sQRuQL37QXbDhAkt
// SIG // VJMQbzIBHYJBYgzWIjk8eDrYhXDEpKk7RdoX0M980EpL
// SIG // tlrNyHw0Xm+nt5pnYJU3Gmq6bNMI1I7Gb5IBZK4ivbVC
// SIG // iZv7PNBYqHEpNVWC2ZQ8BbfnFRQVESYOszFI2Wv82wnJ
// SIG // RfN20VRS3hpLgIR4hjzL0hpoYGk81coWJ+KdPvMvaB0W
// SIG // kE/2qHxJ0ucS638ZxqU14lDnki7CcoKCz6eum5A19WZQ
// SIG // HkqUJfdkDjHkccpL6uoG8pbF0LJAQQZxst7VvwDDjAmS
// SIG // FTUms+wV/FbWBqi7fTJnjq3hj0XbQcd8hjj/q8d6ylgx
// SIG // CZSKi17yVp2NL+cnT6Toy+rN+nM8M7LnLqCrO2JP3oW/
// SIG // /1sfuZDKiDEb1AQ8es9Xr/u6bDTnYCTKIsDq1BtmXUqE
// SIG // G1NqzJKS4kOmxkYp2WyODi7vQTCBZtVFJfVZ3j7OgWmn
// SIG // hFr4yUozZtqgPrHRVHhGNKlYzyjlroPxul+bgIspzOwb
// SIG // tmsgY1MCAwEAAaOCAV0wggFZMBIGA1UdEwEB/wQIMAYB
// SIG // Af8CAQAwHQYDVR0OBBYEFO9vU0rp5AZ8esrikFb2L9RJ
// SIG // 7MtOMB8GA1UdIwQYMBaAFOzX44LScV1kTN8uZz/nupiu
// SIG // HA9PMA4GA1UdDwEB/wQEAwIBhjATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDB3BggrBgEFBQcBAQRrMGkwJAYIKwYBBQUH
// SIG // MAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNvbTBBBggr
// SIG // BgEFBQcwAoY1aHR0cDovL2NhY2VydHMuZGlnaWNlcnQu
// SIG // Y29tL0RpZ2lDZXJ0VHJ1c3RlZFJvb3RHNC5jcnQwQwYD
// SIG // VR0fBDwwOjA4oDagNIYyaHR0cDovL2NybDMuZGlnaWNl
// SIG // cnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZFJvb3RHNC5jcmww
// SIG // IAYDVR0gBBkwFzAIBgZngQwBBAIwCwYJYIZIAYb9bAcB
// SIG // MA0GCSqGSIb3DQEBCwUAA4ICAQAXzvsWgBz+Bz0RdnEw
// SIG // vb4LyLU0pn/N0IfFiBowf0/Dm1wGc/Do7oVMY2mhXZXj
// SIG // DNJQa8j00DNqhCT3t+s8G0iP5kvN2n7Jd2E4/iEIUBO4
// SIG // 1P5F448rSYJ59Ib61eoalhnd6ywFLerycvZTAz40y8S4
// SIG // F3/a+Z1jEMK/DMm/axFSgoR8n6c3nuZB9BfBwAQYK9FH
// SIG // aoq2e26MHvVY9gCDA/JYsq7pGdogP8HRtrYfctSLANEB
// SIG // fHU16r3J05qX3kId+ZOczgj5kjatVB+NdADVZKON/gnZ
// SIG // ruMvNYY2o1f4MXRJDMdTSlOLh0HCn2cQLwQCqjFbqrXu
// SIG // vTPSegOOzr4EWj7PtspIHBldNE2K9i697cvaiIo2p61E
// SIG // d2p8xMJb82Yosn0z4y25xUbI7GIN/TpVfHIqQ6Ku/qjT
// SIG // Y6hc3hsXMrS+U0yy+GWqAXam4ToWd2UQ1KYT70kZjE4Y
// SIG // tL8Pbzg0c1ugMZyZZd/BdHLiRu7hAWE6bTEm4XYRkA6T
// SIG // l4KSFLFk43esaUeqGkH/wyW4N7OigizwJWeukcyIPbAv
// SIG // jSabnf7+Pu0VrFgoiovRDiyx3zEdmcif/sYQsfch28bZ
// SIG // eUz2rtY/9TCA6TD8dC3JE3rYkrhLULy7Dc90G6e8Blqm
// SIG // yIjlgp2+VqsS9/wQD7yFylIz0scmbKvFoW2jNrbM1pD2
// SIG // T7m3XDCCBY0wggR1oAMCAQICEA6bGI750C3n79tQ4ghA
// SIG // GFowDQYJKoZIhvcNAQEMBQAwZTELMAkGA1UEBhMCVVMx
// SIG // FTATBgNVBAoTDERpZ2lDZXJ0IEluYzEZMBcGA1UECxMQ
// SIG // d3d3LmRpZ2ljZXJ0LmNvbTEkMCIGA1UEAxMbRGlnaUNl
// SIG // cnQgQXNzdXJlZCBJRCBSb290IENBMB4XDTIyMDgwMTAw
// SIG // MDAwMFoXDTMxMTEwOTIzNTk1OVowYjELMAkGA1UEBhMC
// SIG // VVMxFTATBgNVBAoTDERpZ2lDZXJ0IEluYzEZMBcGA1UE
// SIG // CxMQd3d3LmRpZ2ljZXJ0LmNvbTEhMB8GA1UEAxMYRGln
// SIG // aUNlcnQgVHJ1c3RlZCBSb290IEc0MIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAv+aQc2jeu+RdSjww
// SIG // IjBpM+zCpyUuySE98orYWcLhKac9WKt2ms2uexuEDcQw
// SIG // H/MbpDgW61bGl20dq7J58soR0uRf1gU8Ug9SH8aeFaV+
// SIG // vp+pVxZZVXKvaJNwwrK6dZlqczKU0RBEEC7fgvMHhOZ0
// SIG // O21x4i0MG+4g1ckgHWMpLc7sXk7Ik/ghYZs06wXGXuxb
// SIG // Grzryc/NrDRAX7F6Zu53yEioZldXn1RYjgwrt0+nMNlW
// SIG // 7sp7XeOtyU9e5TXnMcvak17cjo+A2raRmECQecN4x7ax
// SIG // xLVqGDgDEI3Y1DekLgV9iPWCPhCRcKtVgkEy19sEcypu
// SIG // kQF8IUzUvK4bA3VdeGbZOjFEmjNAvwjXWkmkwuapoGfd
// SIG // pCe8oU85tRFYF/ckXEaPZPfBaYh2mHY9WV1CdoeJl2l6
// SIG // SPDgohIbZpp0yt5LHucOY67m1O+SkjqePdwA5EUlibaa
// SIG // RBkrfsCUtNJhbesz2cXfSwQAzH0clcOP9yGyshG3u3/y
// SIG // 1YxwLEFgqrFjGESVGnZifvaAsPvoZKYz0YkH4b235kOk
// SIG // GLimdwHhD5QMIR2yVCkliWzlDlJRR3S+Jqy2QXXeeqxf
// SIG // jT/JvNNBERJb5RBQ6zHFynIWIgnffEx1P2PsIV/EIFFr
// SIG // b7GrhotPwtZFX50g/KEexcCPorF+CiaZ9eRpL5gdLfXZ
// SIG // qbId5RsCAwEAAaOCATowggE2MA8GA1UdEwEB/wQFMAMB
// SIG // Af8wHQYDVR0OBBYEFOzX44LScV1kTN8uZz/nupiuHA9P
// SIG // MB8GA1UdIwQYMBaAFEXroq/0ksuCMS1Ri6enIZ3zbcgP
// SIG // MA4GA1UdDwEB/wQEAwIBhjB5BggrBgEFBQcBAQRtMGsw
// SIG // JAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0
// SIG // LmNvbTBDBggrBgEFBQcwAoY3aHR0cDovL2NhY2VydHMu
// SIG // ZGlnaWNlcnQuY29tL0RpZ2lDZXJ0QXNzdXJlZElEUm9v
// SIG // dENBLmNydDBFBgNVHR8EPjA8MDqgOKA2hjRodHRwOi8v
// SIG // Y3JsMy5kaWdpY2VydC5jb20vRGlnaUNlcnRBc3N1cmVk
// SIG // SURSb290Q0EuY3JsMBEGA1UdIAQKMAgwBgYEVR0gADAN
// SIG // BgkqhkiG9w0BAQwFAAOCAQEAcKC/Q1xV5zhfoKN0Gz22
// SIG // Ftf3v1cHvZqsoYcs7IVeqRq7IviHGmlUIu2kiHdtvRoU
// SIG // 9BNKei8ttzjv9P+Aufih9/Jy3iS8UgPITtAq3votVs/5
// SIG // 9PesMHqai7Je1M/RQ0SbQyHrlnKhSLSZy51PpwYDE3cn
// SIG // RNTnf+hZqPC/Lwum6fI0POz3A8eHqNJMQBk1RmppVLC4
// SIG // oVaO7KTVPeix3P0c2PR3WlxUjG/voVA9/HYJaISfb8rb
// SIG // II01YBwCA8sgsKxYoA5AY8WYIsGyWfVVa88nq2x2zm8j
// SIG // LfR+cWojayL/ErhULSd+2DrZ8LaHlv1b0VysGMNNn3O3
// SIG // AamfV6peKOK5lDGCA3wwggN4AgEBMH0waTELMAkGA1UE
// SIG // BhMCVVMxFzAVBgNVBAoTDkRpZ2lDZXJ0LCBJbmMuMUEw
// SIG // PwYDVQQDEzhEaWdpQ2VydCBUcnVzdGVkIEc0IFRpbWVT
// SIG // dGFtcGluZyBSU0E0MDk2IFNIQTI1NiAyMDI1IENBMQIQ
// SIG // CoDvGEuN8QWC0cR2p5V0aDANBglghkgBZQMEAgEFAKCB
// SIG // 0TAaBgkqhkiG9w0BCQMxDQYLKoZIhvcNAQkQAQQwHAYJ
// SIG // KoZIhvcNAQkFMQ8XDTI2MDcwODE4MjYwN1owKwYLKoZI
// SIG // hvcNAQkQAgwxHDAaMBgwFgQU3WIwrIYKLTBr2jixaHlS
// SIG // MAf7QX4wLwYJKoZIhvcNAQkEMSIEIB2xkCGu2NYZuXjl
// SIG // W8R1A6rw3o+7qPPyiyvzKy9V1iG2MDcGCyqGSIb3DQEJ
// SIG // EAIvMSgwJjAkMCIEIEqgP6Is11yExVyTj4KOZ2ucrsqz
// SIG // P+NtJpqjNPFGEQozMA0GCSqGSIb3DQEBAQUABIICAIrV
// SIG // M0H5ju37VCV0YHizQye10yJpLmqQ6HuySX+Y8d/L/ok3
// SIG // rjt+DSMOiWyh9ETgbzOZVNTC40oub/YFDSGNiPwPS/AH
// SIG // QGoDRQsV8Zz5RlX283dvO6L2C6Rl4l60l7uNCjopBNF6
// SIG // CebbqS1Tpd+sMPSaoaHiFwktfCkIVyu+vSTBsybLNqdw
// SIG // imFs0XU/4GFXCEp0fo2yPx63S+m6QnzxSe8tER5gblS3
// SIG // t92WvzelW6nzFH5QcihcSOfJ1WrbguHCAb3VOqT10aDs
// SIG // rI0aFeaNaT3JZtZ9UCP0f1qIFrmkERTmtpI96WKlN/cW
// SIG // j1tXtsXy9At9pcEd3TkawP3I1wunMctdvaW8EaeIXWeg
// SIG // djz8ZRBPS4OXwgws73Ot01ygv1jBojL/sdwg/bSkNTuA
// SIG // oDxccBRNksc+ju415AvZXpjHs5zTkE52qjqW1C/az0eW
// SIG // utB0++ZfHrtk6w+qs2sHbHbfVrtEJvPAN+c62pBhG8E/
// SIG // MCEa1rPzmEwb5KN1SXg2ubK4Mc6eyZdBUUQuXbmGEx5k
// SIG // 0yAl1JCF0XGjlFRB1x8dX9sUk0ppU4aFblZHvxxx3FOQ
// SIG // N3Ttv7+hsg+pRytBINM9zTMYev91UNEeUzW3CdKr9wXL
// SIG // r5HAyJj963td97zoor5gYaYbkm0Ms1od6n8jZzS0vNy8
// SIG // VBeU9716AmHmcaGTrRrC
// SIG // End signature block
