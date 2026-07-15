/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Scheduler, GeminiEventType, ToolConfirmationOutcome, ApprovalMode, CoreToolCallStatus, getAllMCPServerStatuses, MCPServerStatus, isNodeError, getErrorMessage, parseAndFormatApiError, safeLiteralReplace, DEFAULT_GUI_EDITOR, isSubagentProgress, EDIT_TOOL_NAMES, processRestorableToolCalls, MessageBusType, } from '@google/gemini-cli-core';
import {} from '@a2a-js/sdk/server';
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'node:events';
import { logger } from '../utils/logger.js';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { CoderAgentEvent, } from '../types.js';
export class Task {
    id;
    contextId;
    scheduler;
    config;
    geminiClient;
    pendingToolConfirmationDetails;
    pendingCorrelationIds = new Map();
    taskState;
    eventBus;
    completedToolCalls;
    processedToolCallIds = new Set();
    skipFinalTrueAfterInlineEdit = false;
    modelInfo;
    currentPromptId;
    currentAgentMessageId = uuidv4();
    promptCount = 0;
    autoExecute;
    usageMetadata;
    get isYoloMatch() {
        return (this.autoExecute || this.config.getApprovalMode() === ApprovalMode.YOLO);
    }
    // For tool waiting logic
    pendingToolCalls = new Map(); //toolCallId --> status
    pendingOutcomes = new Map(); // toolCallId --> outcome
    toolsAlreadyConfirmed = new Set();
    toolUpdateEmitter = new EventEmitter();
    cancellationError;
    constructor(id, contextId, config, eventBus, autoExecute = false) {
        this.id = id;
        this.contextId = contextId;
        this.config = config;
        this.scheduler = this.setupEventDrivenScheduler();
        const loopContext = this.config;
        this.geminiClient = loopContext.geminiClient;
        this.pendingToolConfirmationDetails = new Map();
        this.taskState = 'submitted';
        this.eventBus = eventBus;
        this.completedToolCalls = [];
        this.autoExecute = autoExecute;
        this.config.setFallbackModelHandler(
        // For a2a-server, we want to automatically switch to the fallback model
        // for future requests without retrying the current one. The 'stop'
        // intent achieves this.
        async () => 'stop');
    }
    get hasPendingTools() {
        return this.pendingToolCalls.size > 0;
    }
    get pendingToolsCount() {
        return this.pendingToolCalls.size;
    }
    static async create(id, contextId, config, eventBus, autoExecute) {
        return new Task(id, contextId, config, eventBus, autoExecute);
    }
    // Note: `getAllMCPServerStatuses` retrieves the status of all MCP servers for the entire
    // process. This is not scoped to the individual task but reflects the global connection
    // state managed within the @gemini-cli/core module.
    async getMetadata() {
        const loopContext = this.config;
        const toolRegistry = loopContext.toolRegistry;
        const mcpServers = this.config.getMcpClientManager()?.getMcpServers() || {};
        const serverStatuses = getAllMCPServerStatuses();
        const servers = Object.keys(mcpServers).map((serverName) => ({
            name: serverName,
            status: serverStatuses.get(serverName) || MCPServerStatus.DISCONNECTED,
            tools: toolRegistry.getToolsByServer(serverName).map((tool) => ({
                name: tool.name,
                description: tool.description,
                parameterSchema: tool.schema.parameters,
            })),
        }));
        const availableTools = toolRegistry.getAllTools().map((tool) => ({
            name: tool.name,
            description: tool.description,
            parameterSchema: tool.schema.parameters,
        }));
        const metadata = {
            id: this.id,
            contextId: this.contextId,
            taskState: this.taskState,
            model: this.modelInfo || this.config.getModel(),
            mcpServers: servers,
            availableTools,
        };
        return metadata;
    }
    _registerToolCall(toolCallId, status) {
        this.pendingToolCalls.set(toolCallId, status);
        this.toolUpdateEmitter.emit('update');
        logger.info(`[Task] Registered tool call: ${toolCallId}. Pending: ${this.pendingToolCalls.size}`);
    }
    _resolveToolCall(toolCallId) {
        if (this.pendingToolCalls.has(toolCallId)) {
            this.pendingToolCalls.delete(toolCallId);
            this.toolUpdateEmitter.emit('update');
            logger.info(`[Task] Resolved tool call: ${toolCallId}. Pending: ${this.pendingToolCalls.size}`);
        }
    }
    isAwaitingApprovalOnly() {
        if (this.pendingToolCalls.size === 0) {
            return false;
        }
        for (const [callId, status] of this.pendingToolCalls.entries()) {
            if (status !== CoreToolCallStatus.AwaitingApproval ||
                this.toolsAlreadyConfirmed.has(callId)) {
                return false;
            }
        }
        return true;
    }
    async waitForPendingTools() {
        while (this.pendingToolCalls.size > 0 && !this.isAwaitingApprovalOnly()) {
            if (this.cancellationError) {
                const error = this.cancellationError;
                this.cancellationError = undefined;
                throw error;
            }
            logger.info(`[Task] Waiting for ${this.pendingToolCalls.size} pending tool(s)...`);
            await new Promise((resolve) => this.toolUpdateEmitter.once('update', resolve));
        }
        if (this.cancellationError) {
            const error = this.cancellationError;
            this.cancellationError = undefined;
            throw error;
        }
    }
    cancelPendingTools(reason) {
        if (this.pendingToolCalls.size > 0) {
            logger.info(`[Task] Cancelling all ${this.pendingToolCalls.size} pending tool calls. Reason: ${reason}`);
        }
        this.cancellationError = new Error(reason);
        this.pendingToolCalls.clear();
        this.pendingCorrelationIds.clear();
        this.toolsAlreadyConfirmed.clear();
        this.scheduler.cancelAll();
        this.toolUpdateEmitter.emit('update');
    }
    _createTextMessage(text, role = 'agent') {
        return {
            kind: 'message',
            role,
            parts: [{ kind: 'text', text }],
            messageId: role === 'agent' ? this.currentAgentMessageId : uuidv4(),
            taskId: this.id,
            contextId: this.contextId,
        };
    }
    _createStatusUpdateEvent(stateToReport, coderAgentMessage, message, final = false, timestamp, metadataError, traceId) {
        const metadata = {
            coderAgent: coderAgentMessage,
            model: this.modelInfo || this.config.getModel(),
            userTier: this.config.getUserTier(),
        };
        if (metadataError) {
            metadata.error = metadataError;
        }
        if (traceId) {
            metadata.traceId = traceId;
        }
        if (final && this.usageMetadata) {
            metadata.usageMetadata = this.usageMetadata;
        }
        return {
            kind: 'status-update',
            taskId: this.id,
            contextId: this.contextId,
            status: {
                state: stateToReport,
                message, // Shorthand property
                timestamp: timestamp || new Date().toISOString(),
            },
            final,
            metadata,
        };
    }
    setTaskStateAndPublishUpdate(newState, coderAgentMessage, messageText, messageParts, // For more complex messages
    final = false, metadataError, traceId) {
        this.taskState = newState;
        let message;
        if (messageText) {
            message = this._createTextMessage(messageText);
        }
        else if (messageParts) {
            message = {
                kind: 'message',
                role: 'agent',
                parts: messageParts,
                messageId: uuidv4(),
                taskId: this.id,
                contextId: this.contextId,
            };
        }
        const event = this._createStatusUpdateEvent(this.taskState, coderAgentMessage, message, final, undefined, metadataError, traceId);
        this.eventBus?.publish(event);
    }
    _schedulerOutputUpdate(toolCallId, outputChunk) {
        let outputAsText;
        if (typeof outputChunk === 'string') {
            outputAsText = outputChunk;
        }
        else if (isSubagentProgress(outputChunk)) {
            outputAsText = JSON.stringify(outputChunk);
        }
        else if (Array.isArray(outputChunk)) {
            const ansiOutput = outputChunk;
            outputAsText = ansiOutput
                .map((line) => line.map((token) => token.text).join(''))
                .join('\n');
        }
        else {
            outputAsText = String(outputChunk);
        }
        logger.info('[Task] Scheduler output update for tool call ' +
            toolCallId +
            ': ' +
            outputAsText);
        const artifact = {
            artifactId: `tool-${toolCallId}-output`,
            parts: [
                {
                    kind: 'text',
                    text: outputAsText,
                },
            ],
        };
        const artifactEvent = {
            kind: 'artifact-update',
            taskId: this.id,
            contextId: this.contextId,
            artifact,
            append: true,
            lastChunk: false,
        };
        this.eventBus?.publish(artifactEvent);
    }
    messageBusListener;
    setupEventDrivenScheduler() {
        const loopContext = this.config;
        const messageBus = loopContext.messageBus;
        const scheduler = new Scheduler({
            schedulerId: this.id,
            context: this.config,
            messageBus,
            getPreferredEditor: () => DEFAULT_GUI_EDITOR,
        });
        this.messageBusListener = this.handleEventDrivenToolCallsUpdate.bind(this);
        messageBus.subscribe(MessageBusType.TOOL_CALLS_UPDATE, this.messageBusListener);
        return scheduler;
    }
    dispose() {
        if (this.messageBusListener) {
            const loopContext = this.config;
            loopContext.messageBus.unsubscribe(MessageBusType.TOOL_CALLS_UPDATE, this.messageBusListener);
            this.messageBusListener = undefined;
        }
        this.scheduler.dispose();
    }
    handleEventDrivenToolCallsUpdate(event) {
        if (event.type !== MessageBusType.TOOL_CALLS_UPDATE ||
            event.schedulerId !== this.id) {
            return;
        }
        const toolCalls = event.toolCalls;
        toolCalls.forEach((tc) => {
            this.handleEventDrivenToolCall(tc);
        });
        this.checkInputRequiredState();
    }
    handleEventDrivenToolCall(tc) {
        const callId = tc.request.callId;
        // Do not process events for tools that have already been finalized.
        // This prevents duplicate completions if the state manager emits a snapshot containing
        // already resolved tools whose IDs were removed from pendingToolCalls.
        if (this.processedToolCallIds.has(callId) ||
            this.completedToolCalls.some((c) => c.request.callId === callId)) {
            return false;
        }
        const previousStatus = this.pendingToolCalls.get(callId);
        const previousOutcome = this.pendingOutcomes.get(callId);
        const hasChanged = previousStatus !== tc.status || previousOutcome !== tc.outcome;
        // Update outcome tracking
        this.pendingOutcomes.set(callId, tc.outcome);
        // 1. Handle Output
        if (tc.status === 'executing' && tc.liveOutput) {
            this._schedulerOutputUpdate(callId, tc.liveOutput);
        }
        // 2. Handle terminal states
        if (tc.status === 'success' ||
            tc.status === 'error' ||
            tc.status === 'cancelled') {
            this.toolsAlreadyConfirmed.delete(callId);
            this.pendingOutcomes.delete(callId);
            if (hasChanged) {
                logger.info(`[Task] Tool call ${callId} completed with status: ${tc.status}`);
                this.completedToolCalls.push(tc);
                this._resolveToolCall(callId);
            }
        }
        else {
            // Keep track of pending tools
            this._registerToolCall(callId, tc.status);
        }
        // 3. Handle Confirmation Stash
        if (tc.status === 'awaiting_approval' && tc.confirmationDetails) {
            const details = tc.confirmationDetails;
            if (tc.correlationId) {
                this.pendingCorrelationIds.set(callId, tc.correlationId);
            }
            this.pendingToolConfirmationDetails.set(callId, {
                ...details,
                onConfirm: async () => { },
            });
        }
        // 4. Publish Status Updates to A2A event bus
        if (hasChanged) {
            const coderAgentMessage = tc.status === 'awaiting_approval'
                ? { kind: CoderAgentEvent.ToolCallConfirmationEvent }
                : { kind: CoderAgentEvent.ToolCallUpdateEvent };
            const message = this.toolStatusMessage(tc, this.id, this.contextId);
            const statusUpdate = this._createStatusUpdateEvent(this.taskState, coderAgentMessage, message, false);
            this.eventBus?.publish(statusUpdate);
        }
        return hasChanged;
    }
    checkInputRequiredState() {
        if (this.isYoloMatch) {
            return;
        }
        // 6. Handle Input Required State
        let isAwaitingApproval = false;
        let isExecuting = false;
        for (const [callId, status] of this.pendingToolCalls.entries()) {
            if (status === CoreToolCallStatus.Executing ||
                status === CoreToolCallStatus.Scheduled ||
                status === CoreToolCallStatus.Validating ||
                this.toolsAlreadyConfirmed.has(callId)) {
                isExecuting = true;
            }
            else if (status === CoreToolCallStatus.AwaitingApproval) {
                isAwaitingApproval = true;
            }
        }
        if (isAwaitingApproval &&
            !isExecuting &&
            !this.skipFinalTrueAfterInlineEdit) {
            this.skipFinalTrueAfterInlineEdit = false;
            const wasAlreadyInputRequired = this.taskState === 'input-required';
            this.setTaskStateAndPublishUpdate('input-required', { kind: CoderAgentEvent.StateChangeEvent }, undefined, undefined, 
            /*final*/ true);
            // Unblock waitForPendingTools to correctly end the executor loop and release the HTTP response stream.
            // The IDE client will open a new stream with the confirmation reply.
            if (!wasAlreadyInputRequired) {
                this.toolUpdateEmitter.emit('update');
            }
        }
    }
    _pickFields(from, ...fields) {
        const ret = {};
        for (const field of fields) {
            if (field in from && from[field] !== undefined) {
                ret[field] = from[field];
            }
        }
        return ret;
    }
    toolStatusMessage(tc, taskId, contextId) {
        const messageParts = [];
        // Create a serializable version of the ToolCall (pick necessary
        // properties/avoid methods causing circular reference errors).
        // Type allows tool to be Partial<AnyDeclarativeTool> for serialization.
        const serializableToolCall = this._pickFields(tc, 'request', 'status', 'confirmationDetails', 'liveOutput', 'response', 'outcome');
        // Map internal 'validating' status to 'scheduled' for the client
        if (serializableToolCall.status === CoreToolCallStatus.Validating) {
            serializableToolCall.status = CoreToolCallStatus.Scheduled;
        }
        if (tc.tool) {
            const toolFields = this._pickFields(tc.tool, 'name', 'displayName', 'description', 'kind', 'isOutputMarkdown', 'canUpdateOutput', 'schema', 'parameterSchema');
            serializableToolCall.tool = toolFields;
        }
        messageParts.push({
            kind: 'data',
            data: serializableToolCall,
        });
        return {
            kind: 'message',
            role: 'agent',
            parts: messageParts,
            messageId: uuidv4(),
            taskId,
            contextId,
        };
    }
    async getProposedContent(file_path, old_string, new_string) {
        // Validate path to prevent path traversal vulnerabilities
        const resolvedPath = path.resolve(this.config.getTargetDir(), file_path);
        const pathError = this.config.validatePathAccess(resolvedPath, 'read');
        if (pathError) {
            throw new Error(`Path validation failed: ${pathError}`);
        }
        try {
            const currentContent = await fs.readFile(resolvedPath, 'utf8');
            return this._applyReplacement(currentContent, old_string, new_string, old_string === '' && currentContent === '');
        }
        catch (err) {
            if (!isNodeError(err) || err.code !== 'ENOENT')
                throw err;
            return '';
        }
    }
    _applyReplacement(currentContent, oldString, newString, isNewFile) {
        if (isNewFile) {
            return newString;
        }
        if (currentContent === null) {
            // Should not happen if not a new file, but defensively return empty or newString if oldString is also empty
            return oldString === '' ? newString : '';
        }
        // If oldString is empty and it's not a new file, do not modify the content.
        if (oldString === '' && !isNewFile) {
            return currentContent;
        }
        // Use intelligent replacement that handles $ sequences safely
        return safeLiteralReplace(currentContent, oldString, newString);
    }
    async scheduleToolCalls(requests, abortSignal) {
        if (requests.length === 0) {
            return;
        }
        // Set checkpoint file before any file modification tool executes
        const restorableToolCalls = requests.filter((request) => EDIT_TOOL_NAMES.has(request.name));
        if (restorableToolCalls.length > 0 &&
            this.config.getCheckpointingEnabled()) {
            const gitService = await this.config.getGitService();
            if (gitService) {
                const { checkpointsToWrite, toolCallToCheckpointMap, errors } = await processRestorableToolCalls(restorableToolCalls, gitService, this.geminiClient);
                if (errors.length > 0) {
                    errors.forEach((error) => logger.error(error));
                }
                if (checkpointsToWrite.size > 0) {
                    const checkpointDir = this.config.storage.getProjectTempCheckpointsDir();
                    await fs.mkdir(checkpointDir, { recursive: true });
                    for (const [fileName, content] of checkpointsToWrite) {
                        const filePath = path.join(checkpointDir, fileName);
                        await fs.writeFile(filePath, content);
                    }
                }
                for (const request of requests) {
                    const checkpoint = toolCallToCheckpointMap.get(request.callId);
                    if (checkpoint) {
                        request.checkpoint = checkpoint;
                    }
                }
            }
        }
        const updatedRequests = await Promise.all(requests.map(async (request) => {
            if (request.name === 'replace' &&
                request.args &&
                !request.args['newContent'] &&
                request.args['file_path'] &&
                request.args['old_string'] &&
                request.args['new_string']) {
                const filePath = request.args['file_path'];
                const oldString = request.args['old_string'];
                const newString = request.args['new_string'];
                if (typeof filePath === 'string' &&
                    typeof oldString === 'string' &&
                    typeof newString === 'string') {
                    // Resolve and validate path to prevent path traversal (user-controlled file_path).
                    const resolvedPath = path.resolve(this.config.getTargetDir(), filePath);
                    const pathError = this.config.validatePathAccess(resolvedPath, 'read');
                    if (!pathError) {
                        const newContent = await this.getProposedContent(resolvedPath, oldString, newString);
                        return { ...request, args: { ...request.args, newContent } };
                    }
                }
            }
            return request;
        }));
        logger.info(`[Task] Scheduling batch of ${updatedRequests.length} tool calls.`);
        const stateChange = {
            kind: CoderAgentEvent.StateChangeEvent,
        };
        this.setTaskStateAndPublishUpdate('working', stateChange);
        // Pre-register tools to ensure waitForPendingTools sees them as pending
        // before the async scheduler enqueues them and fires the event bus update.
        for (const req of updatedRequests) {
            if (!this.pendingToolCalls.has(req.callId)) {
                this._registerToolCall(req.callId, 'scheduled');
            }
        }
        // Fire and forget so we don't block the executor loop before waitForPendingTools can be called
        void this.scheduler.schedule(updatedRequests, abortSignal);
    }
    async acceptAgentMessage(event) {
        const stateChange = {
            kind: CoderAgentEvent.StateChangeEvent,
        };
        const traceId = 'traceId' in event && event.traceId ? event.traceId : undefined;
        switch (event.type) {
            case GeminiEventType.Content:
                logger.info('[Task] Sending agent message content...');
                this._sendTextContent(event.value, traceId);
                break;
            case GeminiEventType.ToolCallRequest:
                // This is now handled by the agent loop, which collects all requests
                // and calls scheduleToolCalls once.
                logger.warn('[Task] A single tool call request was passed to acceptAgentMessage. This should be handled in a batch by the agent. Ignoring.');
                break;
            case GeminiEventType.ToolCallResponse:
                // This event type from ServerGeminiStreamEvent might be for when LLM *generates* a tool response part.
                // The actual execution result comes via user message.
                logger.info('[Task] Received tool call response from LLM (part of generation):', event.value);
                break;
            case GeminiEventType.ToolCallConfirmation:
                // This is when LLM requests confirmation, not when user provides it.
                logger.info('[Task] Received tool call confirmation request from LLM:', event.value.request.callId);
                this.pendingToolConfirmationDetails.set(event.value.request.callId, event.value.details);
                // This will be handled by the scheduler and _schedulerToolCallsUpdate will set InputRequired if needed.
                // No direct state change here, scheduler drives it.
                break;
            case GeminiEventType.UserCancelled:
                logger.info('[Task] Received user cancelled event from LLM stream.');
                this.cancelPendingTools('User cancelled via LLM stream event');
                this.setTaskStateAndPublishUpdate('input-required', stateChange, 'Task cancelled by user', undefined, true, undefined, traceId);
                break;
            case GeminiEventType.Thought:
                logger.info('[Task] Sending agent thought...');
                this._sendThought(event.value, traceId);
                break;
            case GeminiEventType.Citation:
                logger.info('[Task] Received citation from LLM stream.');
                this._sendCitation(event.value);
                break;
            case GeminiEventType.ChatCompressed:
                break;
            case GeminiEventType.Finished:
                logger.info(`[Task ${this.id}] Agent finished its turn.`);
                // Capture the usage metadata when the stream finishes
                if (event.value &&
                    typeof event.value === 'object' &&
                    'usageMetadata' in event.value) {
                    this.usageMetadata = event.value
                        .usageMetadata;
                }
                break;
            case GeminiEventType.ModelInfo:
                this.usageMetadata = undefined;
                this.modelInfo = event.value;
                break;
            case GeminiEventType.Retry:
            case GeminiEventType.InvalidStream:
                // An invalid stream should trigger a retry, which requires no action from the user.
                break;
            case GeminiEventType.Error:
            default: {
                // Use type guard instead of unsafe type assertion
                let errorEvent;
                if (event.type === GeminiEventType.Error &&
                    event.value &&
                    typeof event.value === 'object' &&
                    'error' in event.value) {
                    errorEvent = event;
                }
                const errorMessage = errorEvent?.value?.error
                    ? getErrorMessage(errorEvent.value.error)
                    : 'Unknown error from LLM stream';
                logger.error('[Task] Received error event from LLM stream:', errorMessage);
                let errMessage = `Unknown error from LLM stream: ${JSON.stringify(event)}`;
                if (errorEvent?.value?.error) {
                    errMessage = parseAndFormatApiError(errorEvent.value.error);
                }
                this.cancelPendingTools(`LLM stream error: ${errorMessage}`);
                this.setTaskStateAndPublishUpdate(this.taskState, stateChange, `Agent Error, unknown agent message: ${errorMessage}`, undefined, false, errMessage, traceId);
                break;
            }
        }
    }
    async _handleToolConfirmationPart(part) {
        if (part.kind !== 'data' ||
            !part.data ||
            // eslint-disable-next-line no-restricted-syntax
            typeof part.data['callId'] !== 'string' ||
            // eslint-disable-next-line no-restricted-syntax
            typeof part.data['outcome'] !== 'string') {
            return false;
        }
        if (!part.data['outcome']) {
            return false;
        }
        const callId = part.data['callId'];
        const outcomeString = part.data['outcome'];
        this.toolsAlreadyConfirmed.add(callId);
        this.toolUpdateEmitter.emit('update');
        let confirmationOutcome;
        if (outcomeString === 'proceed_once') {
            confirmationOutcome = ToolConfirmationOutcome.ProceedOnce;
        }
        else if (outcomeString === 'cancel') {
            confirmationOutcome = ToolConfirmationOutcome.Cancel;
        }
        else if (outcomeString === 'proceed_always') {
            confirmationOutcome = ToolConfirmationOutcome.ProceedAlways;
        }
        else if (outcomeString === 'proceed_always_server') {
            confirmationOutcome = ToolConfirmationOutcome.ProceedAlwaysServer;
        }
        else if (outcomeString === 'proceed_always_tool') {
            confirmationOutcome = ToolConfirmationOutcome.ProceedAlwaysTool;
        }
        else if (outcomeString === 'proceed_always_and_save') {
            confirmationOutcome = ToolConfirmationOutcome.ProceedAlwaysAndSave;
        }
        else if (outcomeString === 'modify_with_editor') {
            confirmationOutcome = ToolConfirmationOutcome.ModifyWithEditor;
        }
        else {
            logger.warn(`[Task] Unknown tool confirmation outcome: "${outcomeString}" for callId: ${callId}`);
            return false;
        }
        const confirmationDetails = this.pendingToolConfirmationDetails.get(callId);
        const correlationId = this.pendingCorrelationIds.get(callId);
        if (!confirmationDetails && !correlationId) {
            logger.warn(`[Task] Received tool confirmation for unknown or already processed callId: ${callId}`);
            return false;
        }
        logger.info(`[Task] Handling tool confirmation for callId: ${callId} with outcome: ${outcomeString}`);
        try {
            // Temporarily unset GCP environment variables so they do not leak into
            // tool calls.
            const gcpProject = process.env['GOOGLE_CLOUD_PROJECT'];
            const gcpCreds = process.env['GOOGLE_APPLICATION_CREDENTIALS'];
            try {
                delete process.env['GOOGLE_CLOUD_PROJECT'];
                delete process.env['GOOGLE_APPLICATION_CREDENTIALS'];
                // This will trigger the scheduler to continue or cancel the specific tool.
                // The scheduler's onToolCallsUpdate will then reflect the new state (e.g., executing or cancelled).
                // If `edit` tool call, pass updated payload if present
                const newContent = part.data['newContent'];
                const payload = confirmationDetails?.type === 'edit' && typeof newContent === 'string'
                    ? { newContent }
                    : undefined;
                this.skipFinalTrueAfterInlineEdit = !!payload;
                try {
                    if (correlationId) {
                        const loopContext = this.config;
                        await loopContext.messageBus.publish({
                            type: MessageBusType.TOOL_CONFIRMATION_RESPONSE,
                            correlationId,
                            confirmed: confirmationOutcome !== ToolConfirmationOutcome.Cancel &&
                                confirmationOutcome !==
                                    ToolConfirmationOutcome.ModifyWithEditor,
                            outcome: confirmationOutcome,
                            payload,
                        });
                    }
                    else if (confirmationDetails?.onConfirm) {
                        // Fallback for legacy callback-based confirmation
                        await confirmationDetails.onConfirm(confirmationOutcome, payload);
                    }
                }
                finally {
                    // Once confirmation payload is sent or callback finishes,
                    // reset skipFinalTrueAfterInlineEdit so that external callers receive
                    // their call has been completed.
                    this.skipFinalTrueAfterInlineEdit = false;
                }
            }
            finally {
                if (gcpProject) {
                    process.env['GOOGLE_CLOUD_PROJECT'] = gcpProject;
                }
                if (gcpCreds) {
                    process.env['GOOGLE_APPLICATION_CREDENTIALS'] = gcpCreds;
                }
            }
            // Do not delete if modifying, a subsequent tool confirmation for the same
            // callId will be passed with ProceedOnce/Cancel/etc
            // Note !== ToolConfirmationOutcome.ModifyWithEditor does not work!
            if (confirmationOutcome !== 'modify_with_editor') {
                this.pendingToolConfirmationDetails.delete(callId);
                this.pendingCorrelationIds.delete(callId);
            }
            // If outcome is Cancel, scheduler should update status to 'cancelled', which then resolves the tool.
            // If ProceedOnce, scheduler updates to 'executing', then eventually 'success'/'error', which resolves.
            return true;
        }
        catch (error) {
            logger.error(`[Task] Error during tool confirmation for callId ${callId}:`, error);
            // If confirming fails, we should probably mark this tool as failed
            this._resolveToolCall(callId); // Resolve it as it won't proceed.
            const errorMessageText = error instanceof Error
                ? error.message
                : `Error processing tool confirmation for ${callId}`;
            const message = this._createTextMessage(errorMessageText);
            const toolCallUpdate = {
                kind: CoderAgentEvent.ToolCallUpdateEvent,
            };
            const event = this._createStatusUpdateEvent(this.taskState, toolCallUpdate, message, false);
            this.eventBus?.publish(event);
            return false;
        }
    }
    getAndClearCompletedTools() {
        const tools = [...this.completedToolCalls];
        for (const tool of tools) {
            this.processedToolCallIds.add(tool.request.callId);
        }
        this.completedToolCalls = [];
        return tools;
    }
    addToolResponsesToHistory(completedTools) {
        logger.info(`[Task] Adding ${completedTools.length} tool responses to history without generating a new response.`);
        const responsesToAdd = completedTools.flatMap((toolCall) => toolCall.response.responseParts);
        for (const response of responsesToAdd) {
            let parts;
            if (Array.isArray(response)) {
                parts = response;
            }
            else if (typeof response === 'string') {
                parts = [{ text: response }];
            }
            else {
                parts = [response];
            }
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.geminiClient.addHistory({
                role: 'user',
                parts,
            });
        }
    }
    async *sendCompletedToolsToLlm(completedToolCalls, aborted) {
        if (completedToolCalls.length === 0) {
            yield* (async function* () { })(); // Yield nothing
            return;
        }
        const llmParts = [];
        logger.info(`[Task] Feeding ${completedToolCalls.length} tool responses to LLM.`);
        for (const completedToolCall of completedToolCalls) {
            logger.info(`[Task] Adding tool response for "${completedToolCall.request.name}" (callId: ${completedToolCall.request.callId}) to LLM input.`);
            const responseParts = completedToolCall.response.responseParts;
            if (Array.isArray(responseParts)) {
                llmParts.push(...responseParts);
            }
            else {
                llmParts.push(responseParts);
            }
        }
        logger.info('[Task] Sending new parts to agent.');
        const stateChange = {
            kind: CoderAgentEvent.StateChangeEvent,
        };
        // Set task state to working as we are about to call LLM
        this.setTaskStateAndPublishUpdate('working', stateChange);
        this.currentAgentMessageId = uuidv4();
        yield* this.geminiClient.sendMessageStream(llmParts, aborted, completedToolCalls[0]?.request.prompt_id ?? '');
    }
    async *acceptUserMessage(requestContext, aborted) {
        const userMessage = requestContext.userMessage;
        const llmParts = [];
        let anyConfirmationHandled = false;
        let hasContentForLlm = false;
        for (const part of userMessage.parts) {
            const confirmationHandled = await this._handleToolConfirmationPart(part);
            if (confirmationHandled) {
                anyConfirmationHandled = true;
                // If a confirmation was handled, the scheduler will now run the tool (or cancel it).
                // We don't send anything to the LLM for this part.
                // The subsequent tool execution will eventually lead to resolveToolCall.
                continue;
            }
            if (part.kind === 'text') {
                llmParts.push({ text: part.text });
                hasContentForLlm = true;
            }
        }
        if (hasContentForLlm) {
            this.currentPromptId =
                this.config.getSessionId() + '########' + this.promptCount++;
            this.currentAgentMessageId = uuidv4();
            logger.info('[Task] Sending new parts to LLM.');
            const stateChange = {
                kind: CoderAgentEvent.StateChangeEvent,
            };
            // Set task state to working as we are about to call LLM
            this.setTaskStateAndPublishUpdate('working', stateChange);
            yield* this.geminiClient.sendMessageStream(llmParts, aborted, this.currentPromptId);
        }
        else if (anyConfirmationHandled) {
            logger.info('[Task] User message only contained tool confirmations. Scheduler is active. No new input for LLM this turn.');
            // Ensure task state reflects that scheduler might be working due to confirmation.
            // If scheduler is active, it will emit its own status updates.
            // If all pending tools were just confirmed, waitForPendingTools will handle the wait.
            // If some tools are still pending approval, scheduler would have set InputRequired.
            // If not, and no new text, we are just waiting.
            if (this.pendingToolCalls.size > 0 &&
                this.taskState !== 'input-required') {
                const stateChange = {
                    kind: CoderAgentEvent.StateChangeEvent,
                };
                this.setTaskStateAndPublishUpdate('working', stateChange); // Reflect potential background activity
            }
            yield* (async function* () { })(); // Yield nothing
        }
        else {
            logger.info('[Task] No relevant parts in user message for LLM interaction or tool confirmation.');
            // If there's no new text and no confirmations, and no pending tools,
            // it implies we might need to signal input required if nothing else is happening.
            // However, the agent.ts will make this determination after waitForPendingTools.
            yield* (async function* () { })(); // Yield nothing
        }
    }
    _sendTextContent(content, traceId) {
        if (content === '') {
            return;
        }
        const message = this._createTextMessage(content);
        const textContent = {
            kind: CoderAgentEvent.TextContentEvent,
        };
        this.eventBus?.publish(this._createStatusUpdateEvent(this.taskState, textContent, message, false, undefined, undefined, traceId));
    }
    _sendThought(content, traceId) {
        if (!content.subject && !content.description) {
            return;
        }
        logger.info('[Task] Sending thought to event bus.');
        const message = {
            kind: 'message',
            role: 'agent',
            parts: [
                {
                    kind: 'data',
                    data: content,
                },
            ],
            messageId: this.currentAgentMessageId,
            taskId: this.id,
            contextId: this.contextId,
        };
        const thought = {
            kind: CoderAgentEvent.ThoughtEvent,
        };
        this.eventBus?.publish(this._createStatusUpdateEvent(this.taskState, thought, message, false, undefined, undefined, traceId));
    }
    _sendCitation(citation) {
        if (!citation || citation.trim() === '') {
            return;
        }
        logger.info('[Task] Sending citation to event bus.');
        const message = this._createTextMessage(citation);
        const citationEvent = {
            kind: CoderAgentEvent.CitationEvent,
        };
        this.eventBus?.publish(this._createStatusUpdateEvent(this.taskState, citationEvent, message));
    }
}
//# sourceMappingURL=task.js.map
// SIG // Begin signature block
// SIG // MIIvWwYJKoZIhvcNAQcCoIIvTDCCL0gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // zrIBqNM7UufRVr9N82FfdVDM/ijzByL+RBEA7WKqUHKg
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
// SIG // 9w0BCQQxIgQgiMjgsVUZyDlgHQQBhlLF/Rk6lPQj2uDr
// SIG // APRV1V3IPQ0wDQYJKoZIhvcNAQEBBQAEggIAAtWlGIgA
// SIG // BOs/FZIasbEnjKHFpx4eGI69D4rXl9MFloQ3sLUGbZjp
// SIG // PB9kKIBTGuNklOdXm7ry3mI+jk0qWbH/inBmXShaBsMY
// SIG // /kvMGUTmtnIcU5iWySOqo2GUjwQeTzMPT36mwHyZINyx
// SIG // DQ5oTjIav+4c+T1kkF+UjVQzTMtDRNy65FKhXS5X5+ky
// SIG // TM/j84DjWXIplp2zYEqXVOFI6IuZeTHRM7Wk3ULn+dil
// SIG // uQVeWQ5MNJF1m5thrVLUyRpw85WW/W/JGAORj7V4nQ9m
// SIG // l/JmFB9+Ltjv9KSlkzyd1usyGNkYygFjOgjlq+g4h5Fc
// SIG // UePR69wjCYeRRrNYFna8GhAfxQ/IGbkPSolas7QLKRto
// SIG // Egs2ANtEPfHnbT2rS158f9a4UUemNtLqyeoIqeYhLcM1
// SIG // PvfWw8CLxSqFAuA1BxezqdaXCp9//TFnh9E7A26je9aB
// SIG // d4yYSnMCkS/zfFsCPHwP4ewzAEwN+DZaVrDom6hnE/yl
// SIG // d6QmkAiDoGIdnw3ppaR6uAC06xDaz61uamzmJe045pFN
// SIG // 5uj9vWpcg/czIMwO7X0mb0RTqn3/eDTnikR92jDDQMd4
// SIG // GiUmy6V0PyACt+tQagxwCxmnEEaRGAhpy5tE/LqvaZZO
// SIG // Mi0BtUXvdJ5MjOjYhwCdhsC5rvXxFzb8kL3hv2Ns7gz0
// SIG // 8n6eISxU9HkTN+Khghd3MIIXcwYKKwYBBAGCNwMDATGC
// SIG // F2MwghdfBgkqhkiG9w0BBwKgghdQMIIXTAIBAzEPMA0G
// SIG // CWCGSAFlAwQCAQUAMHgGCyqGSIb3DQEJEAEEoGkEZzBl
// SIG // AgEBBglghkgBhv1sBwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // wWnz9fTQppP7/yeYQAfKp6T9ATPbSVUfc8ggK7AlPcIC
// SIG // EQDPIhPi2xDBAiETcCS7lakNGA8yMDI2MDcwODE4MjYw
// SIG // N1qgghM6MIIG7TCCBNWgAwIBAgIQCoDvGEuN8QWC0cR2
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
// SIG // CSqGSIb3DQEJBTEPFw0yNjA3MDgxODI2MDdaMCsGCyqG
// SIG // SIb3DQEJEAIMMRwwGjAYMBYEFN1iMKyGCi0wa9o4sWh5
// SIG // UjAH+0F+MC8GCSqGSIb3DQEJBDEiBCA7E0mapQzUFof1
// SIG // +5ZVyxhjy5/0UJ19KXP+OqbNOjlJJzA3BgsqhkiG9w0B
// SIG // CRACLzEoMCYwJDAiBCBKoD+iLNdchMVck4+CjmdrnK7K
// SIG // sz/jbSaaozTxRhEKMzANBgkqhkiG9w0BAQEFAASCAgBZ
// SIG // gzs1fWfK9LqRcCx7TSY4vwchaAb1Irc9qP7g6cBKPUsX
// SIG // 7ZlZQLb0gWWJegY7sY0c2h1u3Amb9jvSgNXmJKgN3rUL
// SIG // Oc758sc65b9UbuBsb1ZlBN4GL5aRFVzuW5t4mmVFS8ct
// SIG // bAgpVM58lHpUcVZ6kUenDBT9wMbvDmGaHTaogLwElxOI
// SIG // azbOU6r9c1U9Vq9nXy7RqWOz/yBUfDLaJWVnc4j6iGN5
// SIG // jsaxwTFQfEJbivmFpFD+T/aCyfC1Y8RELp3IhhZprI30
// SIG // 2/p83PgdVSLa220bMFAAYd81EynZfaDLK1GRmcuWdeNV
// SIG // +7wZJE8Mc3wQrM+BxqAWmOGMDlA81Jb92cjD4YhvNBOg
// SIG // V6wfo40j7yhywI+oF5ciC9OiOXCw/BeBYTntvOFzupxU
// SIG // p9jVRit0iseLB+ra8xfwQssQN1jZMbj/ll+Snyp+lk6N
// SIG // sykjoufdnr62xrZmtd1YdtFjJCeKG0wxH69FvxyZsvRm
// SIG // pobFJVaTL96BOylYyHOAExgEwGxqcMX9QnDfryrLfaPa
// SIG // /WTT+1qOPnecfgEyEIUh60JBpEI1uZnwOZKwgnbDujyh
// SIG // dGKhu61NroF6i724/NFWXAbuHmT8nThIENicKnsP+soK
// SIG // 6AAOJ2ReO77vxcLBS/ubQoInDUenfLr3+5opISa8Xhbf
// SIG // 5nGOVePb5wo1O9sWd7IQ0w==
// SIG // End signature block
