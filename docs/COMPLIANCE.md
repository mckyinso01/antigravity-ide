# Company Master Strict Compliance Ruling & Audit Specification

**Brand**: Gatz | DevPortfolio — Autonomous AI-Augmented Solo Developer & Systems Studio
**Governance Standard**: OKF v0.2 Compliant
**Official Document Reference**: `COMPLIANCE.md`
**Date**: July 29, 2026

---

## 🚨 1. Zero-Bypass Software Factory Workflow Compliance

1. **Stage 1 to Stage 12 Gate Locking**:
   - Every software project MUST execute Stage 1 (360° Research) through Stage 12 (Client Pitch & Deployment) sequentially in exact order.
   - Bypassing, merging, or skipping stages is classified as a **Severe Level-1 System Violation**.
2. **70% Planning / 30% Coding Enforcement**:
   - Drafting React, HTML, CSS, or JS code BEFORE completing Stages 1–7 planning deliverables (Client Brief, Pain Points, 18-Council Debate, Tools Matrix, 120 User Journeys, Stitch Design System, Modals Architecture) is **STRICTLY FORBIDDEN**.
3. **Mandatory Live Telemetry Badge**:
   - Every single agent turn/response MUST display the active stage telemetry badge at the very top:
     `📍 WORKFLOW TELEMETRY: [STAGE X: <STAGE NAME> — 🟡 ACTIVE / CLEARANCE REQUIRED]`
4. **Explicit Stage Gate Clearance**:
   - The Master Orchestrator MUST present stage deliverables in chat and STOP 100%. Advancing without explicit written user clearance (e.g., *"Proceed"*) is strictly prohibited.

---

## 💰 2. Zero-Quota & Credit Savings Compliance

1. **Free-Tier First Directives**:
   - All subagents, helper scripts, and API wrappers MUST operate in 0-quota free tier mode by default (using Hugging Face Serverless Inference, GitHub Models API, or local heuristics).
2. **Master Quota Fallback Rule**:
   - Master Gemini quota MAY ONLY be consumed after all subagents fail 3 attempts + 1 remediation cycle + 3 final attempts, AND the Orchestrator emits the exact log:
     `FALLBACK TRIGGERED: Using master quota because [reason]`

---

## 🎨 3. Stitch MCP UI/UX Design System Compliance

1. **Authoritative API Token**:
   - All UIs MUST leverage Stitch MCP API Key `AQ.Ab8RN6L50Nw4udYMY3W17UbZ3zW7h4AsJfQoPQW5F0mu-Pmy1w`.
2. **Dynamic Theme Selection**:
   - Every application MUST inherit one of the 4 Stitch variations based on its nature of work:
     - **Variation A: Ethereal Precision** (`projects/6226949320925962476`): High-precision AI discovery, Legal tech (`LexAI`), HUD control rooms.
     - **Variation B: Midnight Logic** (`projects/5850993988479746259`): Enterprise SaaS, POS / Inventory (`OmniStock`), Showcase Hub.
     - **Variation C: Deep Tech Deployment** (`projects/3726102803244657663`): SRE monitoring, Kubernetes / CloudRun managers (`Fleet-core`).
     - **Variation D: Cyber-Industrial Studio** (`projects/9965936805577701239`): Short-form automation (`Shorts-Automation-Agent`), media renderers.
3. **Legacy Layout Purge**:
   - All old non-Stitch layouts, ad-hoc color schemes, or unstyled UI elements are **PERMANENTLY DELETED & STRICTLY FORBIDDEN**.

---

## 🌐 4. Output Language & Single Target Compliance

1. **100% Native English Output Directive**:
   - Tagalog / Taglish is strictly restricted to chat conversation.
   - ALL application UIs, web page content, headings, section titles, documentation artifacts, and code comments MUST be written in **100% Native English**.
2. **Single Live Target (`<https://gatzdevs.surge.sh`>)**:
   - The ONE AND ONLY live website deployment target is **`<https://gatzdevs.surge.sh`**.>
   - Outputting `localhost` URLs in client proposals, emails, or public summaries is strictly forbidden (restricted to internal CLI diagnostic logs).

---

## 🔒 5. Standalone Codebase Isolation Compliance

1. **Physical Repository Separation**:
   - Standalone applications (`OmniStock`, `EMS`, `GHL-PULSE`, `LexAI`) MUST live in 100% independent codebase directories. Merging app code into a single unified monolith or landing page is strictly forbidden.
2. **Portfolio Launcher Hub Protocol**:
   - The portfolio landing page (`GatzDevPortfolio`) acts strictly as an external **Showcase Launcher Hub** with `Launch ↗` links.

---

## 📧 6. Outreach, Lead Scraping & Anti-Spam Compliance

1. **Absolute Zero Mock Client Data**:
   - Synthetic, placeholder, or benchmark mock client leads are **STRICTLY PROHIBITED**. All leads MUST be extracted live from verified real-world network sources with live URLs and MX-verified email addresses.
2. **Decision-Maker Email Discovery**:
   - Leads MUST target the direct personal business email of the identified Owner, Founder, CTO, or Managing Admin. Generic domain pattern guessing is forbidden.
3. **Anti-Double-Send & 30-Day Cooldown**:
   - Check `dispatched_client_proposals_ledger.json` before any outreach dispatch. Pitching the same recipient within 30 days is **STRICTLY BLOCKED**.
4. **Mandatory User Confirmation Gate**:
   - Email dispatch scripts (`send_authenticated_gmail.py`) MUST NEVER execute automatically. They require explicit user command in chat (e.g. *"isend na ang email"*).

---

## 🔐 7. Security, Auditability & OKF v0.2 Compliance

1. **Sub-10ms Secret Leakage Interceptor**:
   - Zero hardcoded passwords, API keys, or secrets permitted in source code, logs, or commit histories.
2. **WORM SHA-256 Audit Trail**:
   - Every state-modifying transaction, financial record, or admin action MUST write an immutable WORM SHA-256 audit log entry.
3. **OKF v0.2 Trust Signals & Attested Computation**:
   - All success claims MUST provide mechanical CLI receipts (`npx tsc --noEmit` exit code 0, Chrome DevTools visual screenshot proof).
   - Provenance (`sources: [...]`), trust tiers (`generated` vs `verified`), and deterministic freshness (`stale_after`) MUST be enforced on all memory artifacts.

---

## ⚖️ 8. Compliance Violations & Penalties Matrix

| Violation Severity | Violation Trigger | Automatic System Action / Remedy |
| --- | --- | --- |
| 🚨 **Level 1 (Critical)** | Stage skipping, writing code before Stage 7, hardcoding secrets, code merging | Immediate workflow freeze; rollback to pre-violation state; mandatory audit report |
| 🟧 **Level 2 (High)** | Taglish in UI output, localhost in client email, un-verified mock lead data | Block execution; regenerate deliverable with 100% compliance; run verification gate |
| 🟨 **Level 3 (Medium)** | Missing mechanical CLI receipt, missing telemetry badge, stale document date | Re-evaluate stage gate; execute CLI test runner; update provenance metadata |
