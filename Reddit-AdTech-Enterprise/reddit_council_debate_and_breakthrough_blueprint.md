# Stage 2: 18-Council Debate & Breakthrough Blueprint — Reddit AdTech Enterprise

> 📍 **WORKFLOW TELEMETRY**: `[STAGE 2: 18-COUNCIL DEBATE & BLUEPRINT — 🟢 COMPLETED]`  
> **Council Reviewers**: `SEC-01` (Security), `FE-01` (Frontend), `ARCH-01` (Architect), `QA-01` (QA Lead), `SRE-01` (Reliability)  

---

## 🏛️ Council Debate Transcript & Technical Directives

### 1. `FE-01` (Lead UI/UX & Frontend Specialist)
* **Directive**: *"Main layout MUST be 100% fluid edge-to-edge (`w-screen min-h-screen flex flex-col`). Never wrap the application in artificial max-width constraints. We must support both Reddit Night Mode (`#0F1419` dark canvas with `#1A1F26` card containers) and Clean White Professional theme (`#FFFFFF`)."*

### 2. `ARCH-01` (Lead Solutions Architect)
* **Directive**: *"The application must be architected around 4 distinct core components: `<AdRankingStreamConsole />`, `<MLLatencyHistogram />`, `<CampaignBudgetOptimizerModal />`, and `<AdPolicyComplianceAuditor />`. State persistence MUST use `LocalStorage` so filter configurations and unlocked states persist across reloads."*

### 3. `SEC-01` (Security & DevSecOps Specialist)
* **Directive**: *"The policy scanner MUST execute regex scanning in sub-1.5 milliseconds and verify 0 secret leakage across 5 critical token classes: (1) Reddit OAuth Client Secrets (`secret_[a-zA-Z0-9]{27}`), (2) AWS Access Keys (`AKIA[0-9A-Z]{16}`), (3) Stripe Live Keys (`sk_live_[0-9a-zA-Z]{24}`), (4) GitHub Fine-Grained PATs (`github_pat_[0-9a-zA-Z_]{82}`), and (5) OpenAI API Keys (`sk-[a-zA-Z0-9]{48}`). All ad compliance actions MUST append a cryptographic SHA-256 block to an immutable audit trail ledger."*


### 4. `QA-01` (QA Automation & Testing Lead)
* **Directive**: *"We MUST formulate 120 Exhaustive User Journey Scenarios (30 per component across 4 core components) before code drafting. Pre-dispatch verification REQUIRES running `exhaustive_e2e_compliance_auditor.py` with 100% zero-defect pass."*

### 5. `SRE-01` (Site Reliability Engineer)
* **Directive**: *"Every view MUST be wrapped inside React Error Boundaries with fallback UI containers to prevent blank white-screen crashes under unexpected state exceptions."*
