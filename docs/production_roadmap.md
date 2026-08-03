# Antigravity IDE — Production Hardening Roadmap (Prioritized)

## Overview
This plan gets Antigravity IDE to "world-class, highest-tier" production readiness. The plan is organized by priority and includes acceptance criteria and rough timelines.

## P0 — Immediate (0–3 days)
- Rotate & revoke leaked keys (manual, urgent).
- Redact secrets in repo; add local_config_template.json and .gitignore.
- Add ALLOW_AGENT_NETWORK gate and load agent_policy (conservative default).
**Acceptance**: no secrets in repo; network calls blocked by default.

## P1 — Short term (1–2 weeks)
- Add tools/validate_model_output.ts and scripts/audit_model_output.ts.
- Add CI workflow to validate model_output.json and block merges (validate-model-output.yml).
- Add token linter + design tokens; enforce via CI on design changes.
**Acceptance**: model validation passes and auditor run is required for any model-sourced PR.

## P2 — Medium term (2–6 weeks)
- Expand tests: unit, integration, contract, e2e.
- Add mutation testing and visual/regression testing.
- Implement feature flags and canary deploy pipeline.
**Acceptance**: unit coverage targets met and canary auto-rollback works.

## P3 — Long term (1–3 months)
- Full observability & SLOs, chaos engineering, pentesting, compliance checks.
- Continuous model evaluation dashboard (hallucination rates, parse success).
**Acceptance**: SLOs defined and dashboards available.

Ticketing templates and estimates in .github/ISSUE_TEMPLATE.
