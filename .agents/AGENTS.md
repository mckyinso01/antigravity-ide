---
type: Agentic System Rulebook & Self-Governance Specification
title: Antigravity IDE Master Agentic Rulebook (OKF v0.2 Compliant)
description: Consolidate governance specifications, zero-quota rules, and FAANG testing protocols for Antigravity Orchestrator & Subagents.
status: stable
stale_after: 2027-01-01
generated:
  by: reference_agent/antigravity-master-orchestrator
  at: 2026-07-29T12:00:00Z
verified:
  - by: human:user_owner
    at: 2026-07-29T12:00:00Z
sources:
  - id: google-cloud-okf-v0.2
    resource: <https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals/>
    title: OKF v0.2 Adds Trust Signals (Google Cloud Data Analytics)
tags: [agentic, governance, trust-signals, okf-v0.2, zero-quota, zero-defect]
---

# 🛡️ ANTIGRAVITY MASTER AGENTIC GOVERNANCE SPECIFICATION

## 1. Core Operating Laws & Context Budget Rules

1. **Model-Aware Context Budget Rule**: The total active governance rules loaded into context MUST NOT exceed 15% of the model's effective context window. Load stage-specific or domain-specific rules on demand.
2. **Incremental Rule Loading Protocol**: Load Core Laws on every turn; load Stage-Specific Rules only when active stage changes; load Domain Rules only during domain execution.
3. **Zero-Quota Law**: Subagents CANNOT make paid API calls or consume Antigravity quota. Delegate heavy tasks to free-tier endpoints (Hugging Face Inference API via `multi_agent.py` / `query_hf.py`, GitHub Models API).
4. **Anti-Hallucination Verification Chain**: Never claim completion without running CLI compiler/test commands and displaying raw output receipts.
5. **File Change Atomicity Rule**: Maximum 3 file edits per turn without verification between edits.
6. **Screenshot Before-and-After Protocol**: Capture DevTools screenshot before and after any UI modification for visual diff confirmation.
7. **Listen-First & Stage Hard-Stop Directive**: Understand intent 100% first. At the end of every stage (1 to 12), present deliverables and STOP 100% for explicit user clearance before advancing.
8. **100% Tagalog/Taglish Chat Explanations for User Comfort**: All chat explanations, plans, telemetry badges, and reports MUST be delivered in simple, clear, engaging Tagalog/Taglish so that mutual understanding is guaranteed.
9. **Listen-First, Explain-First & Explicit User Signal Directive (`TOKEN-LOCK-EXPLICIT-PERMIT`)**: NEVER edit any code, modify design tokens (`company_master_design_tokens_spec.md`, `designSystem.js`), or run modifying commands without FIRST explaining the full plan in simple Tagalog/Taglish (what files will change, what token/visual/functional changes will happen, expected outcome) AND receiving explicit user signal ("Sige", "Go", "OK", "Proceed"). This prevents any unexpected or unapproved design changes!
10. **Strict Outline Borderline vs. Solid Interior Anti-Pattern Rule**: When requested for a moving borderline color effect (`moving-border-card`), NEVER fill or animate gradient colors inside the card interior. The card interior MUST remain a 100% solid surface (`#0B1C30`), while only the 2px outline border line and outer shadow glow animate around the perimeter edge.
11. **Mandatory 72-Brain Council Swarm & Stitch MCP Pre-Task Consultation Directives**: On EVERY SINGLE TASK without exception, BEFORE performing any code edit, research diagnosis, or architectural decision, the Antigravity Orchestrator MUST FIRST execute the 72-Brain Council Swarm (`python .agents/scripts/council_debate.py`) and Stitch MCP design system tools to gather multi-agent consensus, prevent quota waste, and guarantee zero-defect execution.
12. **ABS-RULE-01 (Rule of Layout Non-Destruction)**: No Apple HIG guideline, Google Play Store policy, or token modification is permitted to distort, break, overlap, or clip text/elements on any existing Demon Slayer Design Token layout. All store guidelines MUST be implemented using non-destructive CSS/JS patterns!
13. **Mandatory Token Implementation & App-Role Flexibility Directive (`MANDATORY-TOKENS-FLEX`)**: ALL tokens, card classes (`water-breathing-card`, `flame-breathing-card`, `moving-dotted-border-amber`), liquid frosted glass scrollbars (`SCROLL-CYBER-GLASS`), and 1.5px border standards in `company_master_design_tokens_spec.md` are **100% MANDATORY STANDARDS** across all standalone products. However, visual execution (Breathing Style theme variations, accent colors, kinetic hazard tiers) is **FLEXIBLE based on the specific domain and role of the app** (e.g. Tanjiro Cyber for POS, Zenitsu Gold for Legal AI, Muichiro Cyan for DevOps).
14. **Dynamic Active Issue Ledger & Audit Script Clearance Protocol (`DYNAMIC-ISSUE-LEDGER`)**: Every identified issue or visual defect MUST be listed immediately in the Master Issue Audit & Remediation Ledger (`omnistock_master_component_checklist.md`). An issue can ONLY be removed/marked resolved after: (a) Code remediation executed and visually verified in browser, (b) Automated CLI audit script (`audit_contrast_and_colors.py`) run with 100% PASS receipt, and (c) Master Tokens Spec (`company_master_design_tokens_spec.md`) updated.
15. **Mandatory Master Button Token Alignment Directive (`BUTTON-TOKENS-ALIGNMENT-STD`)**: ALL buttons, icon action triggers, and primary submit controls across ALL standalone products MUST consume `DESIGN_TOKENS.buttons.glowingAction`, `DESIGN_TOKENS.buttons.primary`, `DESIGN_TOKENS.buttons.secondary`, `DESIGN_TOKENS.buttons.danger`, `DESIGN_TOKENS.buttons.ghost`, or `DESIGN_TOKENS.icons.iconButton`. Prohibit ad-hoc inline background/hover overrides (`bg-slate-100`, `bg-emerald-600`, etc.) on buttons.
16. **Mandatory Defensive Data Fallback & Zero-Undefined Display Law (`UNDEFINED-DATA-FALLBACK-GUARD`)**: NEVER display raw `undefined` or `null` text strings to users in any UI metric, label, or table. All state mappings MUST enforce defensive property fallbacks (e.g. `currentQty = alert.current_quantity ?? alert.quantity ?? alert.stock ?? 0`, `thresholdVal = alert.threshold ?? alert.low_stock_threshold ?? 10`, `productName || "Unmapped Item"`).
17. **Strict High-Contrast Dark Mode Card Surface Directive (`MONO-LUMINANCE-DARK-MODE-GUARD`)**: On dark mode surfaces (`#050811`), container cards MUST NEVER render bright light-cream, light-yellow, or stark white background fills (`bg-orange-100`, `bg-yellow-100`, `bg-slate-100`). Cards MUST maintain dark frosted glass surfaces (`bg-[#0B1C30]/80` or `water-breathing-card`) to preserve high-contrast Crystal White (`#FFFFFF`) / Ice White (`#F8FAFC`) typography legibility and eliminate visual eye strain.
18. **Ultimate 8-Stage Master Remediation & Prevention Cycle Protocol (`REMEDIATION-PREVENTION-CYCLE`)**: Every defect found MUST undergo the 8-Stage Cycle: (1) Identify & Record in Master Ledger, (2) RCA Diagnosis, (3) Plan Remediation & User Clearance, (4) Atomic Execution, (5) Confirmation Receipt, (6) Cross-Product Rule Generalization, (7) Automated CLI Audit Script Update (`master_project_audit.py`), and (8) Master Token Spec Lock & Ledger Signoff.
19. **Strict Dark Mode Badge & Pill Contrast Directive (`LIGHT-BADGE-CONTRAST-GUARD`)**: On dark mode surfaces (`#050811` / `#0B1C30`), Badges and Pill indicators MUST NEVER render stark light backgrounds (`bg-violet-100`, `bg-amber-100`, `bg-red-100`, `bg-white`). Badges MUST consume dark frosted translucent surfaces (`bg-[#071322]/80` or `bg-violet-950/80 border border-violet-500/50 text-violet-300`) to prevent blinding visual contrast anomalies.
20. **Dynamic Count Pluralization Grammar Law (`PLURALIZATION-GRAMMAR-GUARD`)**: Dynamic count text labels MUST enforce proper pluralization logic (e.g. `{count} low stock alert{count > 1 ? "s" : ""}`, `{count} item{count > 1 ? "s" : ""}`). Prohibit displaying singular noun forms for counts > 1.
21. **Dynamic Icon Color Coding & Token Uniformity (`DYNAMIC-ICON-COLOR-GUARD`)**: Scanned icon containers MUST NOT use static hardcoded fallback colors (e.g. `text-[#10B981]`). Icons MUST consume dynamic category color hashing algorithms (`getCategoryColor(cat)`) or `DESIGN_TOKENS` palette assignments so that visual hierarchy is maintained.
22. **Master Danger Action Button Token Standard (`DANGER-BUTTON-TOKEN-GUARD`)**: ALL destructive, delete, or danger action buttons across ALL standalone products MUST consume `DESIGN_TOKENS.buttons.danger` (`bg-rose-950/80 text-rose-300 border border-rose-500/50 hover:bg-rose-900/90 shadow-[0_0_16px_rgba(225,29,72,0.3)]`). Prohibit ad-hoc `bg-rose-600` or `bg-red-600` inline styles.
23. **Standardized Page Header Card Architecture (`PAGE-HEADER-CONTAINER-GUARD`)**: EVERY main page component in `src/pages` MUST render a top header container card (`bg-[#0B1C30]/80 p-5 rounded-2xl border border-slate-800/80 shadow-xl`) featuring an icon container, `DESIGN_TOKENS.typography.h1`, and `DESIGN_TOKENS.typography.muted`.
24. **Universal CLI Evaluation Expansion Directive (`CLI-EVALUATION-EXPANSION`)**: Any newly discovered UI defect or governance vulnerability MUST be codified as an automated programmatic check inside `.agents/scripts/master_project_audit.py` before marking the issue resolved.
25. **Master Zero-Defect Re-Audit Verification Chain (`MASTER-ZERO-DEFECT-REAUDIT`)**: NEVER declare a remediation session complete until `python .agents/scripts/master_project_audit.py` emits **100.0% PASS SCORE (19/19 Checks Passed)**.
26. **TOTAL Master Audit & Evaluation Philosophy Directive (`TOTAL-AUDIT-EVALUATION-LAW`)**: ALL audits and quality evaluations MUST strictly adhere to the 4-Pillar TOTAL Protocol: (1) **TOTAL COVERAGE** (100% issue recording across visible UI + invisible internal wirings in `omnistock_master_component_checklist.md`), (2) **TOTAL PERMANENT PREVENTION** (Every issue fixed MUST be codified into `master_project_audit.py` so AI NEVER forgets), (3) **TOTAL EMPIRICAL PROOF** (Must yield 100.0% PASS scorecard + DevTools E2E visual verification), and (4) **TOTAL WOW FACTOR** (Enforce Demon Slayer Cyber Glass aesthetics & zero-crash performance across all standalone applications).
27. **Autonomous Agentic Maestro Routing Law (`AUTONOMOUS-MAESTRO-ORCHESTRATION`)**: The Antigravity Orchestrator MUST operate Maestro as an Autonomous Agentic Engine. For every task, the Orchestrator MUST automatically classify task intent and execute the optimal Maestro command chain (`/zero-defect`, `/diagnose`, `/fortify`, `/evaluate`, `/turbocharge`, `/refine`, `/recap`) without requiring manual slash command input from the user.
28. **Strict Truthfulness & Empirical Status Reporting Law (`HONEST-VERIFICATION-GUARD`)**: The Orchestrator and all subagents MUST NEVER claim 100% completion, zero defects, or full resolution unless empirically verified. False status reports, unverified claims, or misleading progress assertions are STRICTLY PROHIBITED.
29. **Google Cloud Data Agent Kit & Security Safeguard Directive (`DATA-AGENT-KIT-HARMONIZATION`)**: The Orchestrator and Council Swarm MUST integrate Google Cloud Data Agent Kit capabilities for AI/ML discovery and enforce strict Principle of Least Privilege and Zero-Quota billing safeguards across all subagent executions.
30. **Mandatory Immediate Ledger Recording Directive (`PASSIVE-AUTOMATIC-LEDGER-LOCK`)**: Whenever ANY issue, runtime error, or UI defect is identified (via DevTools, user prompt, console error, or CLI audit), the Orchestrator MUST immediately write and record the issue in `omnistock_master_component_checklist.md` as Stage 1 of the 8-Stage Cycle BEFORE making any code edits. Skipping immediate ledger logging is STRICTLY PROHIBITED.

---

## 2. 72-Brain Council of Elders & Handoff Architecture

### Roster & Flagship AI Pairings

The 18 Council Roles (`FE-01`, `BE-01`, `SEC-01`, `QA-01`, `ARCH-01`, `SRE-01`, `RT-01`, `COPILOT-01`, `DEV-01`, `DATA-01`, `ML-01`, `BI-01`, `LEGAL-01`, `FIN-01`, `OPS-01`, `DOC-01`, `ETH-01`, `STRAT-01`) are each paired with 4 Flagship AI Brain Engines (DeepSeek-R1, Qwen 2.5 Coder 32B, GPT-4o, Llama 3.3 70B via GitHub Models API). **Total Swarm = 72 AI Brain Engines.**

### 4-Step Dynamic Handoff Pipeline

1. **Step 1: Task Inspection & Research** (`SEC-01` / `ARCH-01` via DeepSeek-R1)
2. **Step 2: Code Synthesis** (`FE-01` / `BE-01` via Qwen 2.5 Coder)
3. **Step 3: Verification & Visual Audit** (`QA-01` / `SRE-01` via Gemini 2.0 Flash / Chrome DevTools)
4. **Step 4: Master Orchestrator Synthesis & Delivery** (Antigravity Master Agent)

*Graceful Degradation*: If any free subagent is rate-limited/offline, retry once after 30s. If still failing, proceed directly with Master Agent emitting `FALLBACK TRIGGERED`.

---

## 3. UI/UX Design System, Stitch MCP & Layout Directives

- **Stitch MCP Design System**: Mandatory call to `StitchMCP` before drafting UI code. Asset ID: `assets/1640102745724511064` (`Demon Slayer Ukiyo-e Cyber Glass Design System`).
- **Demon Slayer Character Theme Variations & Ukiyo-e Cyber Glass Spec**:
  - *⚡ Zenitsu Thunder Gold (Legal AI / HUD)*: `#F9E006` (Vivid Cyber Yellow), `#050811`, `Space Grotesk`
  - *🌊 Tanjiro Midnight Blue (Enterprise POS / OmniStock)*: `#050811` (Deep Void), `#0B1C30` (Solid Card), `#2563EB` (Electric Blue), `Inter`, `backdrop-blur-xl bg-[#0B1C30]/80`
  - *🌫️ Muichiro Mist Cyan (DevOps / Infrastructure)*: `#00E5FF` (Cyan), `#10B981` (Beast Emerald), `#080C14`, `JetBrains Mono`
  - *🔥 Rengoku Flame Crimson (Media / Creative AI)*: `#E11D48` (Flame Crimson), `#F59E0B` (Solar Amber), `#0A0A0C`, `Outfit`
  - *🦋 Shinobu Wisteria Violet (Security / Vaults)*: `#C084FC` (Wisteria Violet), `#8B5CF6` (Deep Purple), `#090514`
- **Styling Engine Standard**: Use Vanilla CSS by default for all new projects. If TailwindCSS is needed, use the CDN approach (`<script src="https://cdn.tailwindcss.com"></script>`) for rapid prototyping. Always confirm with user.
- **Fluid Layouts**: 100% Edge-to-edge viewports (`w-screen min-h-screen`), collapsible sidebars (`isLeftRailCollapsed`), zero fake navigation buttons (every rail button maps to an active view component).

---

## 4. Standalone Codebase Isolation, Licensing Bar Parity & Brand Standards

- **Physical Codebase Isolation**: Standalone apps (`omnistock`, `EMS`, `GHL-PULSE`, `LexAI-Enterprise`) live in 100% physically separate directories. NEVER merge code, state, or routes. `EMS` (Workforce & Enterprise Synergy) and `GHL-PULSE` (GoHighLevel Lead & Marketing Engine) are TWO DISTINCT PRODUCTS and MUST remain in separate physical repositories.
- **Mandatory 4-Tier Commercial Licensing Bar**: EVERY standalone product MUST render the interactive 4-Tier Commercial Licensing Bar at the bottom of its primary layout (`SOFTWARE FACTORY`, `Self-Host`, `White-Label`, `Source Code IP`, `Hosted Cloud SaaS`).
- **Standardized Company Commercial Pricing**: Self-Hosted ($4,999/one-time), White-Label ($12,999/one-time), Source Code IP ($24,999/one-time), Hosted Cloud ($299/mo).
- **Signature Kinetic Brand Identity**: Every login card (`PAG-LGN`) and featured website product showcase card (`PAG-LND`) MUST feature the signature 2px Kinetic Moving Borderline Color Animation AND Wide Outer Shadow Glow Spread. The rotating conic gradient color is strictly restricted to **Red & Yellow Flame Colors (`conic-gradient(#E11D48, #F59E0B, #F9E006, #F59E0B, #E11D48)`)**, while the interior surface remains 100% Solid Dark Navy (`#0B1C30`).
- **Mandatory Trademark 3-Tier Interaction Checklist**:
  - [ ] **Tier 1 (`moving-border-card`)**: 2px Conic Rotating Outer Border + Wide Outer Shadow Glow Spread (`inset: -12px`, `blur: 28px`) + 100% Solid Dark Navy (`#0B1C30`) Interior Surface applied ONLY to Login Cards, Featured Website Product Cards, and Critical Hazard Alert Banners.
  - [ ] **Tier 2 (`spotlight-card`)**: Mouse Cursor Tracking Engine (`mousemove` X, Y) applied to Executive KPI Stat Cards, 4-Tier Pricing Cards, and Ecosystem Integration Hub Tiles.
  - [ ] **Tier 3 (`app-card-hover`)**: Dynamic Electric Blue (`#2563EB`) Border Shift + 3px Elevation applied to POS Product Grid Tiles, Roster Member Cards, and Quick Action Panels.
- **Launcher Hub Policy**: `<https://gatzdevs.surge.sh`> acts strictly as an external Showcase Launcher Hub linking via external launch URLs.
- **Single Live Deployment Target**: `<https://gatzdevs.surge.sh`> (Account: `mckinsyo01@gmail.com`).
- **Auth Crash Guard**: External auth providers (Firebase, OAuth) must have fallback init guards preventing white-screen crashes when unconfigured.

---

## 5. Client Outreach, Data Persistence & Email Protocols

- **Zero-Mock Data**: 100% real network scraping for client leads. Persist immediately to `client_profile.json`.
- **Pre-Dispatch Research**: Conduct 360° client research and present brief before pitch drafting.
- **1-to-1 Match**: Proposals must answer 100% of client requirements.
- **Live SMTP Email**: Dispatch via `send_authenticated_gmail.py` to client's actual email (never self).
- **Anti-Double-Send**: Check `dispatched_client_proposals_ledger.json` for 30-day recipient cooldown.
- **Post-Workflow Outreach**: Client proposal dispatch operates as a post-workflow extension after Stage 12.

---

## 6. Enterprise Quality, Testing & Self-Governance Frameworks

- **Workflow Lock**: 12 Stages sequential execution with strict 70% Planning / 30% Coding ratio. Display `📍 WORKFLOW TELEMETRY: [STAGE X: <NAME> — STATUS]` badge on every major turn.
- **3-Step User Lifecycle**: Every interactive feature must satisfy `Trigger` ➔ `Feedback` ➔ `Outcome`.
- **5-Pillar Zero-Pains Protocol**: Job Immersion ➔ Universal Input ➔ Unconstrained Config ➔ Zero Fatigue ➔ Full Interactive Wiring.
- **7 Production-Readiness Dimensions**: Reliability, Observability, Security/Compliance, Scalability/Performance, CI/CD, Incident Response, Data Recovery.
- **19-Tier FAANG Testing Reference**: Unit Logic, Strict TS, Button/Modal Logic, Production Build, Micro-to-Macro Sweep, WCAG AAA Dark Mode, Saccade Visual Gaze, Core Web Vitals, Netflix Chaos/Offline, Stripe Cryptography, Defensive Crash Prevention, Memory Leak Cleanup, Self-Healing Canvas Fallback, 3-Step Purge Wizard, Flaky Test Quarantine, 4-Tier Licensing Modals, 7-Role Council Review, Git Synchronization, UI/UX Intent Evaluator.
- **Self-Host & Data Purge**: Provisioning wizard (`/api/admin/self-host-provision`) purging demo DB tables and LocalStorage.
- **4-Tier Licensing**: Full logic modals for Self-Hosted, White-Label Agency, Source Code IP, and Hosted Cloud SaaS.
- **System Diagnostics**: Windows `LoadLibrary` DLL error handling (`Win32_VideoController` driver alias checks). Markdownlint MD060/MD022/MD032 compliance.

---

## 7. Multi-AI Debate & Voting Council Swarm Architecture

- **Mixture-of-Agents (MoA) Engine**: `python .agents/scripts/council_debate.py --task "<TASK>" --role "<ROLE>" --mode <debate|quick|single>`
- **Parallel Model Swarm**: DeepSeek-R1 (Deep Reasoning), Qwen 2.5 Coder 32B (Code Synthesis), GPT-4o (User Empathy/UX), Llama 3.3 70B (Fast Analysis).
- **Synthesized Verdict Output**: `.agents/scripts/output/last_verdict.md` (Transcripts saved to `last_debate.md`).
- **Zero-Quota Credential Config**: API tokens configured in `.agents/scripts/config.json` (GitHub PAT, Groq Key, Google AI Studio Key).

---

## 8. Ultimate 8-Stage Master Remediation & Prevention Cycle (`REMEDIATION-PREVENTION-CYCLE`)

### 🌍 Global Multi-Product Mandate (`GLOBAL-ALL-PRODUCTS-RULE`)

This 8-Stage Cycle is a **UNIVERSAL MANDATORY STANDARD** across ALL standalone products: `OmniStock` (Enterprise POS), `LexAI-Enterprise` (Statutory AI), `EMS` (DevOps & Workforce), `GHL-PULSE` (Marketing Engine), and any new application built under our software factory.

### 🔍 Micro-to-Macro & Invisible Assets Scope (`MICRO-TO-MACRO-SCOPE` / `INVISIBLE-ASSETS-SCOPE`)

The 8-Stage Cycle MUST cover 100% of all assets—both visible to the eye and invisible internal wirings:

- **Micro-Assets (Loob / Internal Core)**: Design Tokens (`designSystem.js`), CSS Utility Keyframes (`index.css`), Dexie.js Offline DB Schemas (`lib/db.js`), Micro-Components (Buttons, Badges, Icons, Inputs).
- **Invisible Assets (Hindi Nakikita / Wirings & Integrations)**: Event Wirings, Custom React Hooks (`useStockNotifications`, `usePullToRefresh`), State Providers, Backend REST/Express API Route Matching, WebSockets, Defensive Crash Guards (`try-catch`), Memory Leak Cleanup, and Database Migrations.
- **Macro-Assets (Labas / Enterprise Experience)**: Page Views (POS, Dashboard, Inventory, Settings), 4-Tier Commercial Licensing Bars, E2E User Journeys (Trigger ➔ Feedback ➔ Outcome), Responsive Layouts, Deployment Assets.

### ⚙️ The 8 Execution Stages

1. **STAGE 1: IDENTIFY (Master Ledger Entry)**: Log the defect immediately in `omnistock_master_component_checklist.md` with issue ID, description, and affected components so no issue is lost or forgotten.
2. **STAGE 2: ROOT CAUSE DIAGNOSIS (RCA Analysis)**: Perform a deep root cause analysis to identify *why* the defect occurred before attempting any code edit.
3. **STAGE 3: PLAN REMEDIATION (Technical Strategy & User Clearance)**: Formulate the exact code fix in Taglish and obtain explicit user signal (`TOKEN-LOCK-EXPLICIT-PERMIT`).
4. **STAGE 4: RESOLVE (Atomic Code Execution)**: Execute code changes atomically (maximum 3 file edits per turn).
5. **STAGE 5: CONFIRM (Dual Validation Protocol)**: Validate via E2E Chrome DevTools browser screenshot AND automated CLI compiler/audit script output.
6. **STAGE 6: PREVENT (Cross-Product Rule Generalization)**: Formulate a permanent design token rule to prevent recurrence across all standalone products (OmniStock, LexAI, EMS, GHL-PULSE).
7. **STAGE 7: SCRIPT AUTOMATION (Test, Audit & Evaluation Scripts)**: Create or update automated CLI test/audit scripts (`audit_contrast_and_colors.py`) to enforce the new rule programmatically on every build.
8. **STAGE 8: DOCUMENTATION & LEDGER LOCK (Master Spec Update & Clearance)**: Update `company_master_design_tokens_spec.md` and mark the issue `[x] RESOLVED` in `omnistock_master_component_checklist.md`.
