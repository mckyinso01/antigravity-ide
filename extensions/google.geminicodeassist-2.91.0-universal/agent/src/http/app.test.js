/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GeminiEventType, ApprovalMode, } from '@google/gemini-cli-core';
import express from 'express';
import request from 'supertest';
import { afterAll, afterEach, beforeEach, beforeAll, describe, expect, it, vi, } from 'vitest';
import { createApp, main } from './app.js';
import { commandRegistry } from '../commands/command-registry.js';
import { assertUniqueFinalEventIsLast, assertTaskCreationAndWorkingStatus, createStreamMessageRequest, createMockConfig, } from '../utils/testing_utils.js';
// Import MockTool from specific path to avoid vitest dependency in main core bundle
import { MockTool } from '@google/gemini-cli-core/src/test-utils/mock-tool.js';
const mockToolConfirmationFn = async () => ({});
const streamToSSEEvents = (stream) => stream
    .split('\n\n')
    .filter(Boolean) // Remove empty strings from trailing newlines
    .map((chunk) => {
    const dataLine = chunk
        .split('\n')
        .find((line) => line.startsWith('data: '));
    if (!dataLine) {
        throw new Error(`Invalid SSE chunk found: "${chunk}"`);
    }
    return JSON.parse(dataLine.substring(6));
});
// Mock the logger to avoid polluting test output
// Comment out to debug tests
vi.mock('../utils/logger.js', () => ({
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
let config;
const getToolRegistrySpy = vi.fn().mockReturnValue({
    getTool: vi.fn(),
    getAllToolNames: vi.fn().mockReturnValue([]),
    getAllTools: vi.fn().mockReturnValue([]),
    getToolsByServer: vi.fn().mockReturnValue([]),
});
const getApprovalModeSpy = vi.fn();
const getShellExecutionConfigSpy = vi.fn();
const getExtensionsSpy = vi.fn();
vi.mock('../config/config.js', async () => {
    const actual = await vi.importActual('../config/config.js');
    return {
        ...actual,
        loadConfig: vi.fn().mockImplementation(async () => {
            const mockConfig = createMockConfig({
                getToolRegistry: getToolRegistrySpy,
                getApprovalMode: getApprovalModeSpy,
                getShellExecutionConfig: getShellExecutionConfigSpy,
                getExtensions: getExtensionsSpy,
            });
            config = mockConfig;
            return config;
        }),
    };
});
// Mock the GeminiClient to avoid actual API calls
const sendMessageStreamSpy = vi.fn();
vi.mock('@google/gemini-cli-core', async () => {
    const actual = await vi.importActual('@google/gemini-cli-core');
    return {
        ...actual,
        GeminiClient: vi.fn().mockImplementation(() => ({
            sendMessageStream: sendMessageStreamSpy,
            getUserTier: vi.fn().mockReturnValue('free'),
            initialize: vi.fn(),
        })),
        performRestore: vi.fn(),
    };
});
describe('E2E Tests', () => {
    let app;
    let server;
    beforeAll(async () => {
        app = await createApp();
        server = app.listen(0); // Listen on a random available port
    });
    beforeEach(() => {
        getApprovalModeSpy.mockReturnValue(ApprovalMode.DEFAULT);
    });
    afterAll(() => new Promise((resolve) => {
        server.close(() => {
            resolve();
        });
    }));
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('should create a new task and stream status updates (text-content) via POST /', async () => {
        sendMessageStreamSpy.mockImplementation(async function* () {
            yield* [{ type: 'content', value: 'Hello how are you?' }];
        });
        const agent = request.agent(app);
        const res = await agent
            .post('/')
            .send(createStreamMessageRequest('hello', 'a2a-test-message'))
            .set('Content-Type', 'application/json')
            .expect(200);
        const events = streamToSSEEvents(res.text);
        assertTaskCreationAndWorkingStatus(events);
        // Status update: text-content
        const textContentEvent = events[2].result;
        expect(textContentEvent.kind).toBe('status-update');
        expect(textContentEvent.status.state).toBe('working');
        expect(textContentEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'text-content',
        });
        expect(textContentEvent.status.message?.parts).toMatchObject([
            { kind: 'text', text: 'Hello how are you?' },
        ]);
        // Status update: input-required (final)
        const finalEvent = events[3].result;
        expect(finalEvent.kind).toBe('status-update');
        expect(finalEvent.status?.state).toBe('input-required');
        expect(finalEvent.final).toBe(true);
        assertUniqueFinalEventIsLast(events);
        expect(events.length).toBe(4);
    });
    it('should create a new task, schedule a tool call, and wait for approval', async () => {
        // First call yields the tool request
        sendMessageStreamSpy.mockImplementationOnce(async function* () {
            yield* [
                {
                    type: GeminiEventType.ToolCallRequest,
                    value: {
                        callId: 'test-call-id',
                        name: 'test-tool',
                        args: {},
                    },
                },
            ];
        });
        // Subsequent calls yield nothing
        sendMessageStreamSpy.mockImplementation(async function* () {
            yield* [];
        });
        const mockTool = new MockTool({
            name: 'test-tool',
            shouldConfirmExecute: vi.fn(mockToolConfirmationFn),
        });
        getToolRegistrySpy.mockReturnValue({
            getAllTools: vi.fn().mockReturnValue([mockTool]),
            getToolsByServer: vi.fn().mockReturnValue([]),
            getTool: vi.fn().mockReturnValue(mockTool),
        });
        const agent = request.agent(app);
        const res = await agent
            .post('/')
            .send(createStreamMessageRequest('run a tool', 'a2a-tool-test-message'))
            .set('Content-Type', 'application/json')
            .expect(200);
        const events = streamToSSEEvents(res.text);
        assertTaskCreationAndWorkingStatus(events);
        // Status update: working
        const workingEvent2 = events[2].result;
        expect(workingEvent2.kind).toBe('status-update');
        expect(workingEvent2.status.state).toBe('working');
        expect(workingEvent2.metadata?.['coderAgent']).toMatchObject({
            kind: 'state-change',
        });
        // Status update: tool-call-update
        const toolCallUpdateEvent = events[3].result;
        expect(toolCallUpdateEvent.kind).toBe('status-update');
        expect(toolCallUpdateEvent.status.state).toBe('working');
        expect(toolCallUpdateEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(toolCallUpdateEvent.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'scheduled',
                    request: { callId: 'test-call-id' },
                },
            },
        ]);
        // State update: awaiting_approval update
        const toolCallConfirmationEvent = events[4].result;
        expect(toolCallConfirmationEvent.kind).toBe('status-update');
        expect(toolCallConfirmationEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-confirmation',
        });
        expect(toolCallConfirmationEvent.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'awaiting_approval',
                    request: { callId: 'test-call-id' },
                },
            },
        ]);
        expect(toolCallConfirmationEvent.status?.state).toBe('working');
        assertUniqueFinalEventIsLast(events);
        expect(events.length).toBe(6);
    });
    it('should handle multiple tool calls in a single turn', async () => {
        // First call yields the tool request
        sendMessageStreamSpy.mockImplementationOnce(async function* () {
            yield* [
                {
                    type: GeminiEventType.ToolCallRequest,
                    value: {
                        callId: 'test-call-id-1',
                        name: 'test-tool-1',
                        args: {},
                    },
                },
                {
                    type: GeminiEventType.ToolCallRequest,
                    value: {
                        callId: 'test-call-id-2',
                        name: 'test-tool-2',
                        args: {},
                    },
                },
            ];
        });
        // Subsequent calls yield nothing
        sendMessageStreamSpy.mockImplementation(async function* () {
            yield* [];
        });
        const mockTool1 = new MockTool({
            name: 'test-tool-1',
            displayName: 'Test Tool 1',
            shouldConfirmExecute: vi.fn(mockToolConfirmationFn),
        });
        const mockTool2 = new MockTool({
            name: 'test-tool-2',
            displayName: 'Test Tool 2',
            shouldConfirmExecute: vi.fn(mockToolConfirmationFn),
        });
        getToolRegistrySpy.mockReturnValue({
            getAllTools: vi.fn().mockReturnValue([mockTool1, mockTool2]),
            getToolsByServer: vi.fn().mockReturnValue([]),
            getTool: vi.fn().mockImplementation((name) => {
                if (name === 'test-tool-1')
                    return mockTool1;
                if (name === 'test-tool-2')
                    return mockTool2;
                return undefined;
            }),
        });
        const agent = request.agent(app);
        const res = await agent
            .post('/')
            .send(createStreamMessageRequest('run two tools', 'a2a-multi-tool-test-message'))
            .set('Content-Type', 'application/json')
            .expect(200);
        const events = streamToSSEEvents(res.text);
        assertTaskCreationAndWorkingStatus(events);
        // Second working update
        const workingEvent = events[2].result;
        expect(workingEvent.kind).toBe('status-update');
        expect(workingEvent.status.state).toBe('working');
        // State Update: Validate the first tool call
        const toolCallValidateEvent1 = events[3].result;
        expect(toolCallValidateEvent1.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(toolCallValidateEvent1.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'scheduled',
                    request: { callId: 'test-call-id-1' },
                },
            },
        ]);
        // --- Assert the event stream ---
        // 1. Initial "submitted" status.
        expect(events[0].result.status.state).toBe('submitted');
        // 2. "working" status after receiving the user prompt.
        expect(events[1].result.status.state).toBe('working');
        // 3. A "state-change" event from the agent.
        expect(events[2].result.metadata?.['coderAgent']).toMatchObject({
            kind: 'state-change',
        });
        // 4. Tool 1 is scheduled.
        const toolCallUpdate1 = events[3].result;
        expect(toolCallUpdate1.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(toolCallUpdate1.status.message?.parts).toMatchObject([
            {
                data: {
                    request: { callId: 'test-call-id-1' },
                    status: 'scheduled',
                },
            },
        ]);
        // 5. Tool 2 is scheduled.
        const toolCallUpdate2 = events[4].result;
        expect(toolCallUpdate2.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(toolCallUpdate2.status.message?.parts).toMatchObject([
            {
                data: {
                    request: { callId: 'test-call-id-2' },
                    status: 'scheduled',
                },
            },
        ]);
        // 6. Tool 1 is awaiting approval.
        const toolCallAwaitEvent1 = events[5].result;
        expect(toolCallAwaitEvent1.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-confirmation',
        });
        expect(toolCallAwaitEvent1.status.message?.parts).toMatchObject([
            {
                data: {
                    request: { callId: 'test-call-id-1' },
                    status: 'awaiting_approval',
                },
            },
        ]);
        // 7. Tool 2 is awaiting approval.
        const toolCallAwaitEvent2 = events[6].result;
        expect(toolCallAwaitEvent2.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-confirmation',
        });
        expect(toolCallAwaitEvent2.status.message?.parts).toMatchObject([
            {
                data: {
                    request: { callId: 'test-call-id-2' },
                    status: 'awaiting_approval',
                },
            },
        ]);
        // 8. The final event is "input-required".
        const finalEvent = events[7].result;
        expect(finalEvent.final).toBe(true);
        expect(finalEvent.status.state).toBe('input-required');
        // The scheduler now waits for approval, so no more events are sent.
        assertUniqueFinalEventIsLast(events);
        expect(events.length).toBe(8);
    });
    it('should handle multiple tool calls sequentially in YOLO mode', async () => {
        // Set YOLO mode to auto-approve tools and test sequential execution.
        getApprovalModeSpy.mockReturnValue(ApprovalMode.YOLO);
        // First call yields the tool request
        sendMessageStreamSpy.mockImplementationOnce(async function* () {
            yield* [
                {
                    type: GeminiEventType.ToolCallRequest,
                    value: {
                        callId: 'test-call-id-1',
                        name: 'test-tool-1',
                        args: {},
                    },
                },
                {
                    type: GeminiEventType.ToolCallRequest,
                    value: {
                        callId: 'test-call-id-2',
                        name: 'test-tool-2',
                        args: {},
                    },
                },
            ];
        });
        // Subsequent calls yield nothing, as the tools will "succeed".
        sendMessageStreamSpy.mockImplementation(async function* () {
            yield* [{ type: 'content', value: 'All tools executed.' }];
        });
        const mockTool1 = new MockTool({
            name: 'test-tool-1',
            displayName: 'Test Tool 1',
            shouldConfirmExecute: vi.fn(mockToolConfirmationFn),
            execute: vi
                .fn()
                .mockResolvedValue({ llmContent: 'tool 1 done', returnDisplay: '' }),
        });
        const mockTool2 = new MockTool({
            name: 'test-tool-2',
            displayName: 'Test Tool 2',
            shouldConfirmExecute: vi.fn(mockToolConfirmationFn),
            execute: vi
                .fn()
                .mockResolvedValue({ llmContent: 'tool 2 done', returnDisplay: '' }),
        });
        getToolRegistrySpy.mockReturnValue({
            getAllTools: vi.fn().mockReturnValue([mockTool1, mockTool2]),
            getToolsByServer: vi.fn().mockReturnValue([]),
            getTool: vi.fn().mockImplementation((name) => {
                if (name === 'test-tool-1')
                    return mockTool1;
                if (name === 'test-tool-2')
                    return mockTool2;
                return undefined;
            }),
        });
        const agent = request.agent(app);
        const res = await agent
            .post('/')
            .send(createStreamMessageRequest('run two tools', 'a2a-multi-tool-test-message'))
            .set('Content-Type', 'application/json')
            .expect(200);
        const events = streamToSSEEvents(res.text);
        assertTaskCreationAndWorkingStatus(events);
        // --- Assert the sequential execution flow ---
        const eventStream = events.slice(2).map((e) => {
            const update = e.result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const agentData = update.metadata?.['coderAgent'];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const toolData = update.status.message?.parts[0];
            if (!toolData) {
                return { kind: agentData.kind };
            }
            return {
                kind: agentData.kind,
                status: toolData.data?.status,
                callId: toolData.data?.request.callId,
            };
        });
        const expectedFlow = [
            // Initial state change
            { kind: 'state-change', status: undefined, callId: undefined },
            // Tool 1 Lifecycle
            {
                kind: 'tool-call-update',
                status: 'scheduled',
                callId: 'test-call-id-1',
            },
            {
                kind: 'tool-call-update',
                status: 'scheduled',
                callId: 'test-call-id-1',
            },
            {
                kind: 'tool-call-update',
                status: 'executing',
                callId: 'test-call-id-1',
            },
            {
                kind: 'tool-call-update',
                status: 'success',
                callId: 'test-call-id-1',
            },
            // Tool 2 Lifecycle
            {
                kind: 'tool-call-update',
                status: 'scheduled',
                callId: 'test-call-id-2',
            },
            {
                kind: 'tool-call-update',
                status: 'scheduled',
                callId: 'test-call-id-2',
            },
            {
                kind: 'tool-call-update',
                status: 'executing',
                callId: 'test-call-id-2',
            },
            {
                kind: 'tool-call-update',
                status: 'success',
                callId: 'test-call-id-2',
            },
            // Final updates
            { kind: 'state-change', status: undefined, callId: undefined },
            { kind: 'text-content', status: undefined, callId: undefined },
        ];
        // Use `toContainEqual` for flexibility if other events are interspersed.
        expect(eventStream).toEqual(expect.arrayContaining(expectedFlow));
        assertUniqueFinalEventIsLast(events);
    });
    it('should handle tool calls that do not require approval', async () => {
        // First call yields the tool request
        sendMessageStreamSpy.mockImplementationOnce(async function* () {
            yield* [
                {
                    type: GeminiEventType.ToolCallRequest,
                    value: {
                        callId: 'test-call-id-no-approval',
                        name: 'test-tool-no-approval',
                        args: {},
                    },
                },
            ];
        });
        // Second call, after the tool runs, yields the final text
        sendMessageStreamSpy.mockImplementationOnce(async function* () {
            yield* [{ type: 'content', value: 'Tool executed successfully.' }];
        });
        const mockTool = new MockTool({
            name: 'test-tool-no-approval',
            displayName: 'Test Tool No Approval',
            execute: vi.fn().mockResolvedValue({
                llmContent: 'Tool executed successfully.',
                returnDisplay: 'Tool executed successfully.',
            }),
        });
        getToolRegistrySpy.mockReturnValue({
            getAllTools: vi.fn().mockReturnValue([mockTool]),
            getToolsByServer: vi.fn().mockReturnValue([]),
            getTool: vi.fn().mockReturnValue(mockTool),
        });
        const agent = request.agent(app);
        const res = await agent
            .post('/')
            .send(createStreamMessageRequest('run a tool without approval', 'a2a-no-approval-test-message'))
            .set('Content-Type', 'application/json')
            .expect(200);
        const events = streamToSSEEvents(res.text);
        assertTaskCreationAndWorkingStatus(events);
        // Status update: working
        const workingEvent2 = events[2].result;
        expect(workingEvent2.kind).toBe('status-update');
        expect(workingEvent2.status.state).toBe('working');
        // Status update: tool-call-update (scheduled)
        const scheduledEvent1 = events[3].result;
        expect(scheduledEvent1.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(scheduledEvent1.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'scheduled',
                    request: { callId: 'test-call-id-no-approval' },
                },
            },
        ]);
        // Status update: tool-call-update (scheduled)
        const scheduledEvent2 = events[4].result;
        expect(scheduledEvent2.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(scheduledEvent2.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'scheduled',
                    request: { callId: 'test-call-id-no-approval' },
                },
            },
        ]);
        // Status update: tool-call-update (scheduled)
        const scheduledEvent3 = events[5].result;
        expect(scheduledEvent3.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(scheduledEvent3.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'scheduled',
                    request: { callId: 'test-call-id-no-approval' },
                },
            },
        ]);
        // Status update: tool-call-update (executing)
        const executingEvent = events[6].result;
        expect(executingEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(executingEvent.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'executing',
                    request: { callId: 'test-call-id-no-approval' },
                },
            },
        ]);
        // Status update: tool-call-update (success)
        const successEvent = events[7].result;
        expect(successEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(successEvent.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'success',
                    request: { callId: 'test-call-id-no-approval' },
                },
            },
        ]);
        // Status update: working (before sending tool result to LLM)
        const workingEvent3 = events[8].result;
        expect(workingEvent3.kind).toBe('status-update');
        expect(workingEvent3.status.state).toBe('working');
        // Status update: text-content (final LLM response)
        const textContentEvent = events[9].result;
        expect(textContentEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'text-content',
        });
        expect(textContentEvent.status.message?.parts).toMatchObject([
            { text: 'Tool executed successfully.' },
        ]);
        assertUniqueFinalEventIsLast(events);
        expect(events.length).toBe(11);
    });
    it('should bypass tool approval in YOLO mode', async () => {
        // First call yields the tool request
        sendMessageStreamSpy.mockImplementationOnce(async function* () {
            yield* [
                {
                    type: GeminiEventType.ToolCallRequest,
                    value: {
                        callId: 'test-call-id-yolo',
                        name: 'test-tool-yolo',
                        args: {},
                    },
                },
            ];
        });
        // Second call, after the tool runs, yields the final text
        sendMessageStreamSpy.mockImplementationOnce(async function* () {
            yield* [{ type: 'content', value: 'Tool executed successfully.' }];
        });
        // Set approval mode to yolo
        getApprovalModeSpy.mockReturnValue(ApprovalMode.YOLO);
        const mockTool = new MockTool({
            name: 'test-tool-yolo',
            displayName: 'Test Tool YOLO',
            execute: vi.fn().mockResolvedValue({
                llmContent: 'Tool executed successfully.',
                returnDisplay: 'Tool executed successfully.',
            }),
        });
        getToolRegistrySpy.mockReturnValue({
            getAllTools: vi.fn().mockReturnValue([mockTool]),
            getToolsByServer: vi.fn().mockReturnValue([]),
            getTool: vi.fn().mockReturnValue(mockTool),
        });
        const agent = request.agent(app);
        const res = await agent
            .post('/')
            .send(createStreamMessageRequest('run a tool in yolo mode', 'a2a-yolo-mode-test-message'))
            .set('Content-Type', 'application/json')
            .expect(200);
        const events = streamToSSEEvents(res.text);
        assertTaskCreationAndWorkingStatus(events);
        // Status update: working
        const workingEvent2 = events[2].result;
        expect(workingEvent2.kind).toBe('status-update');
        expect(workingEvent2.status.state).toBe('working');
        // Status update: tool-call-update (scheduled)
        const scheduledEvent = events[3].result;
        expect(scheduledEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(scheduledEvent.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'scheduled',
                    request: { callId: 'test-call-id-yolo' },
                },
            },
        ]);
        // Status update: tool-call-update (scheduled)
        const awaitingEvent = events[4].result;
        expect(awaitingEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(awaitingEvent.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'scheduled',
                    request: { callId: 'test-call-id-yolo' },
                },
            },
        ]);
        // Status update: tool-call-update (scheduled)
        const scheduledEvent3 = events[5].result;
        expect(scheduledEvent3.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(scheduledEvent3.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'scheduled',
                    request: { callId: 'test-call-id-yolo' },
                },
            },
        ]);
        // Status update: tool-call-update (executing)
        const executingEvent = events[6].result;
        expect(executingEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(executingEvent.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'executing',
                    request: { callId: 'test-call-id-yolo' },
                },
            },
        ]);
        // Status update: tool-call-update (success)
        const successEvent = events[7].result;
        expect(successEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'tool-call-update',
        });
        expect(successEvent.status.message?.parts).toMatchObject([
            {
                data: {
                    status: 'success',
                    request: { callId: 'test-call-id-yolo' },
                },
            },
        ]);
        // Status update: working (before sending tool result to LLM)
        const workingEvent3 = events[8].result;
        expect(workingEvent3.kind).toBe('status-update');
        expect(workingEvent3.status.state).toBe('working');
        // Status update: text-content (final LLM response)
        const textContentEvent = events[9].result;
        expect(textContentEvent.metadata?.['coderAgent']).toMatchObject({
            kind: 'text-content',
        });
        expect(textContentEvent.status.message?.parts).toMatchObject([
            { text: 'Tool executed successfully.' },
        ]);
        assertUniqueFinalEventIsLast(events);
        expect(events.length).toBe(11);
    });
    it('should include traceId in status updates when available', async () => {
        const traceId = 'test-trace-id';
        sendMessageStreamSpy.mockImplementation(async function* () {
            yield* [
                { type: 'content', value: 'Hello', traceId },
                { type: 'thought', value: { subject: 'Thinking...' }, traceId },
            ];
        });
        const agent = request.agent(app);
        const res = await agent
            .post('/')
            .send(createStreamMessageRequest('hello', 'a2a-trace-id-test'))
            .set('Content-Type', 'application/json')
            .expect(200);
        const events = streamToSSEEvents(res.text);
        // The first two events are task-creation and working status
        const textContentEvent = events[2].result;
        expect(textContentEvent.kind).toBe('status-update');
        expect(textContentEvent.metadata?.['traceId']).toBe(traceId);
        const thoughtEvent = events[3].result;
        expect(thoughtEvent.kind).toBe('status-update');
        expect(thoughtEvent.metadata?.['traceId']).toBe(traceId);
    });
    describe('/listCommands', () => {
        it('should return a list of top-level commands', async () => {
            const mockCommands = [
                {
                    name: 'test-command',
                    description: 'A test command',
                    topLevel: true,
                    arguments: [{ name: 'arg1', description: 'Argument 1' }],
                    subCommands: [
                        {
                            name: 'sub-command',
                            description: 'A sub command',
                            topLevel: false,
                            execute: vi.fn(),
                        },
                    ],
                    execute: vi.fn(),
                },
                {
                    name: 'another-command',
                    description: 'Another test command',
                    topLevel: true,
                    execute: vi.fn(),
                },
                {
                    name: 'not-top-level',
                    description: 'Not a top level command',
                    topLevel: false,
                    execute: vi.fn(),
                },
            ];
            const getAllCommandsSpy = vi
                .spyOn(commandRegistry, 'getAllCommands')
                .mockReturnValue(mockCommands);
            const agent = request.agent(app);
            const res = await agent.get('/listCommands').expect(200);
            expect(res.body).toEqual({
                commands: [
                    {
                        name: 'test-command',
                        description: 'A test command',
                        arguments: [{ name: 'arg1', description: 'Argument 1' }],
                        subCommands: [
                            {
                                name: 'sub-command',
                                description: 'A sub command',
                                arguments: [],
                                subCommands: [],
                            },
                        ],
                    },
                    {
                        name: 'another-command',
                        description: 'Another test command',
                        arguments: [],
                        subCommands: [],
                    },
                ],
            });
            expect(getAllCommandsSpy).toHaveBeenCalledOnce();
            getAllCommandsSpy.mockRestore();
        });
        it('should handle cyclic commands gracefully', async () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
            const cyclicCommand = {
                name: 'cyclic-command',
                description: 'A cyclic command',
                topLevel: true,
                execute: vi.fn(),
                subCommands: [],
            };
            cyclicCommand.subCommands?.push(cyclicCommand); // Create cycle
            const getAllCommandsSpy = vi
                .spyOn(commandRegistry, 'getAllCommands')
                .mockReturnValue([cyclicCommand]);
            const agent = request.agent(app);
            const res = await agent.get('/listCommands').expect(200);
            expect(res.body.commands[0].name).toBe('cyclic-command');
            expect(res.body.commands[0].subCommands).toEqual([]);
            expect(warnSpy).toHaveBeenCalledWith('Command cyclic-command already inserted in the response, skipping');
            getAllCommandsSpy.mockRestore();
            warnSpy.mockRestore();
        });
    });
    describe('/executeCommand', () => {
        const mockExtensions = [{ name: 'test-extension', version: '0.0.1' }];
        beforeEach(() => {
            getExtensionsSpy.mockReturnValue(mockExtensions);
        });
        afterEach(() => {
            getExtensionsSpy.mockClear();
        });
        it('should return extensions for valid command', async () => {
            const mockExtensionsCommand = {
                name: 'extensions list',
                description: 'a mock command',
                execute: vi.fn(async (context) => {
                    // Simulate the actual command's behavior
                    const extensions = context.config.getExtensions();
                    return { name: 'extensions list', data: extensions };
                }),
            };
            vi.spyOn(commandRegistry, 'get').mockReturnValue(mockExtensionsCommand);
            const agent = request.agent(app);
            const res = await agent
                .post('/executeCommand')
                .send({ command: 'extensions list', args: [] })
                .set('Content-Type', 'application/json')
                .expect(200);
            expect(res.body).toEqual({
                name: 'extensions list',
                data: mockExtensions,
            });
            expect(getExtensionsSpy).toHaveBeenCalled();
        });
        it('should return 404 for invalid command', async () => {
            vi.spyOn(commandRegistry, 'get').mockReturnValue(undefined);
            const agent = request.agent(app);
            const res = await agent
                .post('/executeCommand')
                .send({ command: 'invalid command' })
                .set('Content-Type', 'application/json')
                .expect(404);
            expect(res.body.error).toBe('Command not found: invalid command');
            expect(getExtensionsSpy).not.toHaveBeenCalled();
        });
        it('should return 400 for missing command', async () => {
            const agent = request.agent(app);
            await agent
                .post('/executeCommand')
                .send({ args: [] })
                .set('Content-Type', 'application/json')
                .expect(400);
            expect(getExtensionsSpy).not.toHaveBeenCalled();
        });
        it('should return 400 if args is not an array', async () => {
            const agent = request.agent(app);
            const res = await agent
                .post('/executeCommand')
                .send({ command: 'extensions.list', args: 'not-an-array' })
                .set('Content-Type', 'application/json')
                .expect(400);
            expect(res.body.error).toBe('"args" field must be an array.');
            expect(getExtensionsSpy).not.toHaveBeenCalled();
        });
        it('should execute a command that does not require a workspace when CODER_AGENT_WORKSPACE_PATH is not set', async () => {
            const mockCommand = {
                name: 'test-command',
                description: 'a mock command',
                execute: vi
                    .fn()
                    .mockResolvedValue({ name: 'test-command', data: 'success' }),
            };
            vi.spyOn(commandRegistry, 'get').mockReturnValue(mockCommand);
            delete process.env['CODER_AGENT_WORKSPACE_PATH'];
            const response = await request(app)
                .post('/executeCommand')
                .send({ command: 'test-command', args: [] });
            expect(response.status).toBe(200);
            expect(response.body.data).toBe('success');
        });
        it('should return 400 for a command that requires a workspace when CODER_AGENT_WORKSPACE_PATH is not set', async () => {
            const mockWorkspaceCommand = {
                name: 'workspace-command',
                description: 'A command that requires a workspace',
                requiresWorkspace: true,
                execute: vi
                    .fn()
                    .mockResolvedValue({ name: 'workspace-command', data: 'success' }),
            };
            vi.spyOn(commandRegistry, 'get').mockReturnValue(mockWorkspaceCommand);
            delete process.env['CODER_AGENT_WORKSPACE_PATH'];
            const response = await request(app)
                .post('/executeCommand')
                .send({ command: 'workspace-command', args: [] });
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Command "workspace-command" requires a workspace, but CODER_AGENT_WORKSPACE_PATH is not set.');
        });
        it('should execute a command that requires a workspace when CODER_AGENT_WORKSPACE_PATH is set', async () => {
            const mockWorkspaceCommand = {
                name: 'workspace-command',
                description: 'A command that requires a workspace',
                requiresWorkspace: true,
                execute: vi
                    .fn()
                    .mockResolvedValue({ name: 'workspace-command', data: 'success' }),
            };
            vi.spyOn(commandRegistry, 'get').mockReturnValue(mockWorkspaceCommand);
            process.env['CODER_AGENT_WORKSPACE_PATH'] = '/tmp/test-workspace';
            const response = await request(app)
                .post('/executeCommand')
                .send({ command: 'workspace-command', args: [] });
            expect(response.status).toBe(200);
            expect(response.body.data).toBe('success');
        });
        it('should include agentExecutor in context', async () => {
            const mockCommand = {
                name: 'context-check-command',
                description: 'checks context',
                execute: vi.fn(async (context) => {
                    if (!context.agentExecutor) {
                        throw new Error('agentExecutor missing');
                    }
                    return { name: 'context-check-command', data: 'success' };
                }),
            };
            vi.spyOn(commandRegistry, 'get').mockReturnValue(mockCommand);
            const agent = request.agent(app);
            const res = await agent
                .post('/executeCommand')
                .send({ command: 'context-check-command', args: [] })
                .set('Content-Type', 'application/json')
                .expect(200);
            expect(res.body.data).toBe('success');
        });
        describe('/executeCommand streaming', () => {
            it('should execute a streaming command and stream back events', (done) => {
                const executeSpy = vi.fn(async (context) => {
                    context.eventBus?.publish({
                        kind: 'status-update',
                        status: { state: 'working' },
                        taskId: 'test-task',
                        contextId: 'test-context',
                        final: false,
                    });
                    context.eventBus?.publish({
                        kind: 'status-update',
                        status: { state: 'completed' },
                        taskId: 'test-task',
                        contextId: 'test-context',
                        final: true,
                    });
                    return { name: 'stream-test', data: 'done' };
                });
                const mockStreamCommand = {
                    name: 'stream-test',
                    description: 'A test streaming command',
                    streaming: true,
                    execute: executeSpy,
                };
                vi.spyOn(commandRegistry, 'get').mockReturnValue(mockStreamCommand);
                const agent = request.agent(app);
                agent
                    .post('/executeCommand')
                    .send({ command: 'stream-test', args: [] })
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'text/event-stream')
                    .on('response', (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk.toString();
                    });
                    res.on('end', () => {
                        try {
                            const events = streamToSSEEvents(data);
                            expect(events.length).toBe(2);
                            expect(events[0].result).toEqual({
                                kind: 'status-update',
                                status: { state: 'working' },
                                taskId: 'test-task',
                                contextId: 'test-context',
                                final: false,
                            });
                            expect(events[1].result).toEqual({
                                kind: 'status-update',
                                status: { state: 'completed' },
                                taskId: 'test-task',
                                contextId: 'test-context',
                                final: true,
                            });
                            expect(executeSpy).toHaveBeenCalled();
                            done();
                        }
                        catch (e) {
                            done(e);
                        }
                    });
                })
                    .end();
            });
            it('should handle non-streaming commands gracefully', async () => {
                const mockNonStreamCommand = {
                    name: 'non-stream-test',
                    description: 'A test non-streaming command',
                    execute: vi
                        .fn()
                        .mockResolvedValue({ name: 'non-stream-test', data: 'done' }),
                };
                vi.spyOn(commandRegistry, 'get').mockReturnValue(mockNonStreamCommand);
                const agent = request.agent(app);
                const res = await agent
                    .post('/executeCommand')
                    .send({ command: 'non-stream-test', args: [] })
                    .set('Content-Type', 'application/json')
                    .expect(200);
                expect(res.body).toEqual({ name: 'non-stream-test', data: 'done' });
            });
        });
    });
    describe('main', () => {
        it('should listen on localhost only', async () => {
            const listenSpy = vi
                .spyOn(express.application, 'listen')
                .mockImplementation((...args) => {
                // Trigger the callback passed to listen
                const callback = args.find((arg) => typeof arg === 'function');
                if (callback) {
                    callback();
                }
                return {
                    address: () => ({ port: 1234 }),
                    on: vi.fn(),
                    once: vi.fn(),
                    emit: vi.fn(),
                };
            });
            // Avoid process.exit if possible, or mock it if main might fail
            const exitSpy = vi
                .spyOn(process, 'exit')
                .mockImplementation(() => undefined);
            await main();
            expect(listenSpy).toHaveBeenCalledWith(expect.any(Number), 'localhost', expect.any(Function));
            listenSpy.mockRestore();
            exitSpy.mockRestore();
        });
    });
});
//# sourceMappingURL=app.test.js.map
// SIG // Begin signature block
// SIG // MIIvWwYJKoZIhvcNAQcCoIIvTDCCL0gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // PCnIg/exaZm7CTd+CrwsZz6PeiuXvnsrjyao2q2BKEqg
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
// SIG // 9w0BCQQxIgQgNZpZaMiFAwRgD7n1AevoYR6neQl11XFD
// SIG // LvaW6z2/oaIwDQYJKoZIhvcNAQEBBQAEggIAdvWw7j0B
// SIG // +FMdWGyWE3ZrUBTiRcPuD9rK65O7QQxAex818lbstqLF
// SIG // n5OG0opfCeteboiHlW40CKjkbIQ+8T4BHaHSqGheMxSA
// SIG // z8A68XliQa8f9urmpKLW2KpxlolHmPwo1ags8md9IZ43
// SIG // Z7Dm2vwS0IPjJMNoZdq7oqe+j0hWEp2tczuse4CEGYXT
// SIG // ZpXetW3E6tuR46gxoL1pcDYvpMBmXy1yFWpWcmWhfvBZ
// SIG // siAPp9UU6JszN5OIHVxbeP1oD+ee2vxokVGCP+rqG/EJ
// SIG // rjbw2fjrXQ5Mp3iqecLwVQZ45OiuSTQUaGuQakm9FyQq
// SIG // tgPh7b1k4k4biotswDQ7cc3rmiBES12czcPXclX8Jmo7
// SIG // U8CH9SRKs+kha4SkUFr1Njf4YHff/E6Chq0KbRmhk1BV
// SIG // VWG8BsLV8U0Xvx92e7pE7a20RjLw1ljg5qLZkRWQ7HUc
// SIG // RH5lU6ZC7C4MxatNOf5ScVWFGAZbiqdI2YEVmJX/HCAI
// SIG // KBrsPmg0PiOTyHL6KqEi/wP4uXm3hgU6k7fa5QxZ869W
// SIG // wOrKdjszAR3UuyzUGgQDEi/zxrZ13olOrdlYwc9SKUIW
// SIG // j6jvwxfCnmBU79Sd9xKiykA0VLYTlDJ8GONiMj1WiNyL
// SIG // 2xXB/Tz8Fd1MeDMfYV7gbYkjjn4krcDWcbVoOACziCF/
// SIG // KmpqX94ZMuqiG+2hghd3MIIXcwYKKwYBBAGCNwMDATGC
// SIG // F2MwghdfBgkqhkiG9w0BBwKgghdQMIIXTAIBAzEPMA0G
// SIG // CWCGSAFlAwQCAQUAMHgGCyqGSIb3DQEJEAEEoGkEZzBl
// SIG // AgEBBglghkgBhv1sBwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // PbdAiilTpqhG9+gpLTJpjwnNpUd2NvUDbW9ABRDrMBEC
// SIG // EQC9DIFmnIxqtGSZKsbhyD2iGA8yMDI2MDcwODE4MjYx
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
// SIG // UjAH+0F+MC8GCSqGSIb3DQEJBDEiBCBkNZuKvNhtVJah
// SIG // RTAWG2yPuA7Une2pFEXGzHtHcr2QZjA3BgsqhkiG9w0B
// SIG // CRACLzEoMCYwJDAiBCBKoD+iLNdchMVck4+CjmdrnK7K
// SIG // sz/jbSaaozTxRhEKMzANBgkqhkiG9w0BAQEFAASCAgAc
// SIG // Us2cZT0PPvM53ndMkQB8mRteyj9soaT3z42XHuiAJxYK
// SIG // qeSGD1cr23tonB9VQKWVQw0hvrZT97t/lupsQMnmB1HV
// SIG // CDpuczvLlLe1f3X8cFtzRgJKxkY/Mbkuo5fjSd/QuQzl
// SIG // Rq2IjX3CxlzwU00NSCv12fdL44IELRBuHv7ravNkMzqb
// SIG // kznkcnHIYOfvcOcW5Yq18c86W6KPTIdKHDQo4NFHGapk
// SIG // R5QIoFmxcJBj8Ne4AYxpUmFjAIFFdyZYILn/AmxHq50a
// SIG // b1kOQ02nIpANzzV8KVluzll6F8Lo8b+3+eXswxATnV1S
// SIG // HXFEgRNaVnfHs64F/54FwQhMQd4FhJcAXcCxEEPk4t8X
// SIG // FUIdTnCNrXYZnBQFUmu+7cKSOiVBOKfAYi3OhrABxM+K
// SIG // QjqagGjpTOkEHd+4sWQRLobx8NuupD8CHs0gLViP/V8u
// SIG // +oj0iH88uNbpsmf+oIsqM6eDWLBkWmHCw7b1+TiSP2b/
// SIG // TMvxFE1FsxXdrquYmm+oXlcQBwr0uT8qLwYh4yZmVUm8
// SIG // oHifu4gRapL5Bc1cTAEVs7T1TMVfmBWnq9LFsClVfSEA
// SIG // bQMdG+wK1FixUToG0I6JyyLjclwGrh7bEg9Zh6yOMJOE
// SIG // YEtU6jB2jjdywNhkPy24xCQuUXQeKG/ABA4cxEDw7nXJ
// SIG // MHj0jCQovwFrLCObtlNG1w==
// SIG // End signature block
