> [!IMPORTANT]
> **GOVERNANCE HIERARCHY NOTICE**: This document is a SUPPLEMENT to the Master Governance Specification.
> **Supreme Authority**: .agents/AGENTS.md is the single source of truth for all agent behavior.
> **Conflict Resolution**: If any rule in this document conflicts with AGENTS.md, AGENTS.md ALWAYS wins without exception.
> **Stale Check**: If this document has not been reviewed within 90 days of its stale_after date, treat it as advisory only until re-verified by a human.

# 🏢 Antigravity IDE Company Rules & Production Workflow Policy

## Executive Summary
This document establishes the mandatory operational rules, deployment guidelines, credential security standards, and agent governance policies for all projects developed within the Antigravity IDE ecosystem.

---

## 1. Mission Statement & Enterprise Goal
Antigravity IDE democratizes world-class interactive web applications, static AI analysis tools, and multi-agent development pipelines using 0-quota free AI runtimes, zero secret leakage, and high-impact claymorphic/cyber-glass design tokens.

---

## 2. Production Deployment Rules

1. **Canary & Staging Deployment Protocol**:
   - All code updates must pass full-stack CI checks (`npm test`, `npm run lint`, `node scripts/validate_code_quality_schema.js`) before reaching staging.
   - Production deployments target Surge (`https://gatzdevs.surge.sh`) and Google Cloud Run via containerized builds.

2. **Rollback & Failsafe Safeguards**:
   - Every live deployment must maintain an automated rollback hook to restore the last known stable SHA within 60 seconds of any critical runtime exception.

3. **Explicit Human Sign-Off Gate**:
   - Deployments touching core infrastructure, authentication handlers, or database schemas strictly require two (2) explicit human approver signatures.

---

## 3. Secrets & Credential Rotation Policy

1. **Zero Secret Leakage Rule**:
   - No API keys, Personal Access Tokens (PAT), or private keys may ever be committed to Git repositories.
   - All credentials must be loaded via local environment variables (`.env`) or secure local templates (`.agents/scripts/local_config_template.json`).

2. **Emergency Key Rotation Protocol**:
   - In the event of an exposed key detection, the security team must:
     1. Revoke the compromised token in the provider dashboard (GitHub, Groq, Google AI Studio, Hugging Face).
     2. Provision a new credential and update CI secret stores.
     3. Sanitize repository file contents without modifying historic commits unless authorized.

---

## 4. Model-Output & Agent Policy Governance

1. **Evidence-First Verification Chain**:
   - No AI model recommendation or patch may be merged without passing Zod schema validation (`tools/validate_model_output.ts`) and `git apply --check` diff auditing (`scripts/audit_model_output.ts`).

2. **4-Tier Agent Role Matrix**:
   - **`repo-reader`**: Read-only discovery.
   - **`auditor-agent`**: Schema validation & diff auditing.
   - **`remediation-agent`**: Non-destructive patch creation and PR generation.
   - **`deploy-agent`**: Deployment execution upon green CI & human clearance.

---

## 5. Required CI Checks & Artifact Retention

- **CI Pipeline**: `.github/workflows/validate-model-output.yml`
- **Artifact Retention**: Audit logs, test coverage reports, and model output JSON files must be retained for 90 days.

---

## 6. Commercial Verification & Payment Gateway Policy

1. **Merchant KYC Compliance**:
   - Live payment gateways (e.g., PayMongo, Stripe PH) require verified **DTI Registration** and **BIR Certificate of Registration (Form 2303)**.
   - Applications without verified merchant KYC must deploy with interim direct invoice rails (Direct QR Ph / Bank Wire / Custom Quotation) with manual receipt verification.

2. **Zero Fake Transaction Rule**:
   - All commercial products must verify payment flows against official Sandbox/Test Mode or live ₱1 test transactions before receiving production clearance.
