---
trigger: always_on
---

# Workspace Quota Optimization & Simulation Directives

## 1. Zero-Quota Execution Boundaries

- All subagents, helper scripts, and application-level APIs must operate in a `"dry-run"`, `"simulation"`, or `"role-based mock"` mode first.
- Live paid model API calls must be completely bypassed in favor of local heuristics, deterministic templates, or free-tier endpoints.
- Master Agent acts strictly as orchestrator and delegates heavy text/code generation to free Hugging Face endpoints (`multi_agent.py`, `query_hf.py`).

## 2. Standalone Application Simulation Specs

- **OmniStock POS**: Local Dexie.js / IndexedDB offline storage for inventory, sales ledger, and product catalog.
- **EMS / GHL-PULSE**: Simulated webhooks, mock lead pipelines, and local JSON persistence.
- **LexAI-Enterprise**: Local statutory vector index simulation and mock PDF analysis.

## 3. Token & Scope Optimization

- Provide code changes as minimal unified diffs or targeted code snippets.
- Limit search scope (`grep_search`, `list_dir`) strictly to target files.
