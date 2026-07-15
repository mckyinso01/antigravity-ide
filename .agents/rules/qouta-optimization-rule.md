---
trigger: always_on
---

# Workspace Customizations Rule for Agent AI and Tools

To prevent unwanted cloud billing, API key exhaustion, or AI credit consumption, the following rules apply globally to all agent sessions, workspace tools, scripts, and subagents in this workspace:

## Core Directives

1. **Strict Zero-Quota Rule:**
   - No subagent, custom agent (e.g., marketing agent, generator agent), or integrated third-party API wrapper (e.g., Hugging Face Inference API, external LLM endpoints) is allowed to perform requests that consume paid AI credits or account quotas.
   - The only exception is the Antigravity Master Agent itself, which manages the development workspace and responds directly to the user.

2. **Mandatory Simulation Mode:**
   - All subagents, helper agents, or application-level APIs must operate in a `"dry-run"`, `"simulation"`, or `"role-based tasks"` mock mode first.
   - Live external model API calls must be completely bypassed by default in favor of local heuristics, deterministic templates, or mock responders that consume exactly **0 credits**.

3. **Fallback and Safety Boundaries:**
   - Any integrated agent logic must gracefully handle offline/sandboxed network profiles by returning predefined local mocks instead of crashing or retrying with paid tokens.
   - Before executing any script or tool that calls out to a paid API (such as custom LLM pipelines, OpenAI, or Anthropic services), the agent must verify the current active environment mode is set to simulation/dry-run.

4. **Strict Master-Agent Orchestration:**
   - The Antigravity Master Agent (main conversation agent) must act strictly as an **orchestrator**.
   - All heavy-lifting tasks (such as code generation, deep research, code analysis, and refactoring) must be delegated to free subagents (e.g., Hugging Face multi-agent or custom role subagents) first.
   - The Master Agent must only step in, run full-context models, or consume main quota when subagents cannot complete the task or fail after execution.

5. **Token Optimization & Formatting:**
   - **Concise Code Diffs:** The agent must always provide code changes as clean, minimal unified diffs or targeted code snippets. Do not rewrite whole files or output excessive boilerplate.
   - **Targeted Search Scope:** Limit file search queries and directory analysis. Focus only on the specific files required for the task. Do not scan the entire workspace unless absolutely necessary.
