# Procedural Memory

Records the exact tool-calling strategies, successful terminal commands, and specific sequences of operations that yielded 100% PASS verdicts to prevent redundant tool usage errors.

## God-Tier Auditor Execution
To audit a subproject and ensure it adheres to all 49+ rules:
`python .agents/scripts/master_project_audit.py <path_to_src>`
Example: `python .agents/scripts/master_project_audit.py omnistock/src`

## Sentinel DevOps Run
To verify workspace compliance and trigger Hard Stops if any codebase degrades:
`python .agents/scripts/sentinel_checklist.py`

## Council Swarm Debate
To spawn a Multi-Agent debate without hitting network quotas:
`python .agents/scripts/council_debate.py --task "<Task Description>" --role <RoleID> --mode single`
Roles: `FE-01` (Frontend), `BE-01` (Backend), `SEC-01` (Security), `QA-01` (Quality Assurance).

## The Sandbox-First Command Chain
1. Create isolated files in `scratch/`.
2. Build via `npm run build` or `tsc --noEmit` before copying into the active `src/`.
3. Use `multi_replace_file_content` for surgical application of changes.

## 12-Stage Software Factory Protocol
For any NEW project, the Orchestrator MUST follow `C:\Users\Admin\.gemini\config\global_workflows\ultimate-workflow.md`.
1. **No Code Rule**: Stages 1 to 4 must be completed before writing application code.
2. **MCP Integration**: Use `call_mcp_tool` for GCP deployment, DB provisioning, and Stitch UI generation.
3. **Mandatory Compliance Emphasis**: From this point forward, EVERYTHING we do (every plan, every UI code, every response) MUST explicitly emphasize strict compliance with the 5 Stage-Gated Compliance Gates and the Award-Winning 6-Point Preflight Checklist. Never present a solution without proving how it passes these FAANG-level standards.
