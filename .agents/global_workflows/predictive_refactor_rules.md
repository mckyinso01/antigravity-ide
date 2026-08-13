---
type: Global Workflow Rule
title: Predictive Refactoring Protocol
status: active
---

# Predictive Refactoring Rule (List-Only Mode)

When the Orchestrator (Antigravity Master Agent) encounters technical debt, deprecated patterns, or code quality issues OUTSIDE of the current task scope, the following protocol MUST be observed:

1. **Do NOT Auto-Fix**: The Orchestrator is strictly prohibited from modifying files or fixing issues outside of the immediate task boundary without explicit user approval.
2. **Record & List**: The Orchestrator MUST identify the issue and list it down in the `master_component_checklist.md` (or a specific Tech Debt Remediation List).
3. **Present to User**: After the current enhancement or task is completed, the Orchestrator MUST present the list of detected issues to the user to plan for formal remediation.
