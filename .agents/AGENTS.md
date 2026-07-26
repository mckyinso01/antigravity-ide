---
type: Agentic System Rulebook & Self-Governance Specification
title: Antigravity IDE Master Agentic Rulebook (OKF v0.2 Compliant)
description: Authoritative self-governance specifications, zero-quota rules, and 19-tier testing protocols for Antigravity Orchestrator & Subagents.
status: stable
stale_after: 2027-01-01
generated:
  by: reference_agent/antigravity-master-orchestrator
  at: 2026-07-25T12:10:00Z
verified:
  - by: human:user_owner
    at: 2026-07-25T12:10:00Z
sources:
  - id: google-cloud-okf-v0.2
    resource: https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals/
    title: OKF v0.2 Adds Trust Signals (Google Cloud Data Analytics)
    author: Sam McVeety & Amir Hormati
    last_modified: 2026-07-24
tags: [agentic, governance, trust-signals, okf-v0.2, zero-quota, zero-defect]
---

# Mandatory Master AI Software Factory & Orchestrator Workflow Wiring

All Orchestrators, Council of 18 Subagents, and MCP Tool Servers in this workspace **MUST** strictly follow and execute the **Master Ultimate AI Software Factory & Orchestrator Workflow** defined in [ultimate-workflow.md](file:///C:/Users/Admin/.gemini/config/global_workflows/ultimate-workflow.md).

- **Master Orchestrator**: Coordinates all stages, enforces the **Strict NO CODING RULE** (70% Planning / 30% Coding), manages `workflow_status.md`, and displays live status telemetry badges (`📍 WORKFLOW TELEMETRY: ...`).
- **Council of Elders & 18 Subagents**: Every subagent (`FE-01`, `BE-01`, `SEC-01`, `QA-01`, `ARCH-01`, `SRE-01`, etc.) MUST perform its domain tasks adhering strictly to Stage 1 through Stage 12 of [ultimate-workflow.md](file:///C:/Users/Admin/.gemini/config/global_workflows/ultimate-workflow.md). No stage may be bypassed.
- **MCP Servers & Integration Wiring**: All MCP tools (StitchMCP, chrome-devtools-mcp, firebase-mcp-server, alloydb-postgresql, neon, cloudrun, gke-oss) MUST be invoked in alignment with the validation gates of [ultimate-workflow.md](file:///C:/Users/Admin/.gemini/config/global_workflows/ultimate-workflow.md) (e.g. Stage 11 Chrome DevTools E2E screenshot audits, DB schema migrations, CloudRun/GKE deployments).

---

# Workspace Rules - Hugging Face Credit Savings

## Enforced Credit Savings via Hugging Face Skill and Stitch MCP

Whenever the user requests a new code file, web application, script, audio synthesis, or image generation task, you **MUST** delegate the core code drafting, design layout, styling rules, and visual/audio compilation to the native Hugging Face skill (`huggingface-multi-agent`).

- Run the local `multi_agent.py` or `query_hf.py` scripts to offload the heavy text generation (HTML, CSS, JS, Python drafts) to the free Hugging Face Serverless Inference API.
- Do **NOT** generate large code blocks directly using your primary LLM unless the user explicitly requests to bypass Hugging Face.
- Once the Hugging Face script finishes, read the output files, verify them for syntax/logical correctness, resolve integration points, and present the completed project.
- This policy is mandatory to ensure credit consumption remains extremely low and protects you from hitting Gemini API quota limits.

## Mandatory OKF v0.2 Agentic Self-Governance & Trust Signals Protocol

To ensure 100% accountability, zero hallucinations, and maximum trust across all agents, subagents, and memory artifacts in this workspace, the Antigravity Master Orchestrator and all subagents **MUST** enforce the **5 Trust Questions of OKF v0.2**:

1. **Provenance Verification (`sources`)**:
   - Every factual claim, code recommendation, or architecture blueprint MUST explicitly cite authoritative workspace files (`sources: [...]`) or official primary documentation with markdown footnotes (`[^source_id]`).

2. **Trust Tier Evaluation (`generated` vs `verified`)**:
   - Every rule, memory item, and project brief MUST distinguish between machine-generated content (`generated: { by, at }`) and human sign-offs (`verified: [ { by: "human:user_owner", at } ]`).
   - High-impact production deployment decisions require a `human-reviewed` trust tier.

3. **Deterministic Freshness Check (`stale_after`)**:
   - All environment variables, API keys, compliance policies, and architectural standards MUST carry a deterministic `stale_after: YYYY-MM-DD` date. Stale concepts automatically trigger a re-audit before execution.

4. **Lifecycle Management (`status`)**:
   - Deprecated features or legacy code snippets MUST be flagged as `status: deprecated` to prevent subagents from reusing obsolete code patterns while retaining historical context.

5. **Attested Computation & Verification Receipts (`type: Attested Computation`)**:
   - Never claim code or math is valid based on LLM intuition alone. Every success claim MUST produce a mechanical runtime receipt (e.g. `npx tsc --noEmit` exit code 0, `npm run build` output, Chrome DevTools visual screenshot proof).

## Mandatory 10,000,000% Agentic Perfection & System Cruft Purge Protocol

To achieve 10,000,000% Agentic Perfection across all workspace applications (**LexAI-Enterprise**, **Fleet-core**, **Lead-gen**), all agents and subagents **MUST** permanently enforce the following 6 Cruft-Purge Directives:

1. **Zero Unstyled Plain-Text UI Rendering**: Tailwind CSS Engine CDN script (`<script src="https://cdn.tailwindcss.com"></script>`) injected in `index.html` from minute 1.
2. **Zero Ghost Port Conflicts**: Kill stale Vite dev processes on ports 5173/5174/3000 before starting new servers (`manage_task kill`).
3. **Zero Artificial Bottlenecks**: Main layout containers MUST be `w-screen min-h-screen flex flex-col` 100% fluid edge-to-edge viewports.
4. **Zero Fake Navigation Buttons**: Every primary rail button MUST render a dedicated dynamic view component.
5. **Zero Dead-End Journeys**: Every interactive feature MUST fulfill the 3-step lifecycle (*Trigger* ➔ *Feedback* ➔ *Outcome*).
6. **Zero Unverified Claims**: Every success claim requires a mechanical CLI Receipt (`npx tsc --noEmit` exit code 0).

## Mandatory Flagship-Powered Subagent AI Brain Pairing Protocol

To elevate every subagent from a passive prompt-executor to a **TRULY AUTONOMOUS SPECIAL AGENT**, every subagent in this workspace **MUST** be paired with a dedicated **Flagship AI Brain Engine (0-Quota / Free Tier)** tailored to its domain:

1. **`FE-01` (UI/UX Micro-Agent Specialist)**: Paired with **Qwen 2.5 Coder 32B / 72B** (Master of React/TSX/Tailwind code synthesis).
2. **`SEC-01` & `ARCH-01` (Logic & Security Architect)**: Paired with **DeepSeek-R1 / V3** (Master of deep reasoning, bug diagnosis, and post-quantum math).
3. **`QA-01` & `SRE-01` (Visual & Large Context Auditor)**: Paired with **Google Gemini 2.0 Flash / Pro** (Master of 1M+ token context & visual screenshot auditing).
4. **`RT-01` (Swarm Telemetry Router)**: Paired with **Llama 3.3 70B (Groq)** (Master of sub-100ms instant task routing).

Every subagent operates with its own autonomous reasoning loop, local fallback harness, and OKF v0.2 trust receipt verification!

## Mandatory 4-Step Dynamic Agentic Handoff Pipeline Protocol

For **EVERY** user request or project task — **WITHOUT ANY EXCEPTION** (whether UI/UX Design, Backend APIs, Security Audits, DB Migrations, Performance Optimization, or Bug Fixing) — the Antigravity Master Orchestrator and Subagents **MUST** execute the 4-step dynamic handoff pipeline:

1. **Step 1: Task Inspection & Research Handoff (DeepSeek-R1 / V3)**:
   - Identify task requirements, deconstruct logic, and hand off to the **Research & Logic Specialist (`SEC-01` / `ARCH-01` powered by DeepSeek-R1)** to produce the research blueprint.
2. **Step 2: Code Synthesis Handoff (Qwen 2.5 Coder 32B / 72B)**:
   - Pass the research blueprint to the **Code Synthesis Specialist (`FE-01` / `BE-01` powered by Qwen 2.5 Coder)** to draft clean, zero-defect React/TSX/CSS code.
3. **Step 3: Verification & Visual Audit Handoff (Google Gemini 2.0 Flash)**:
   - Pass the drafted code to the **Visual & Large Context Auditor (`QA-01` / `SRE-01` powered by Gemini 2.0 Flash)** to run mechanical CLI compiler checks (`npx tsc`) and DevTools screenshot audits.
4. **Step 4: Master Orchestrator Synthesis & Delivery (Antigravity Master)**:
   - Synthesize attestation receipts, verify OKF v0.2 trust signals, and present the completed solution to the user.

**UNIVERSAL DOMAIN ENFORCEMENT**: It is strictly forbidden to bypass this 4-step pipeline for UI design, backend refactoring, email parsing, or any future user requests. Every task MUST invoke its respective role-based specialist AI agents.

**DYNAMIC SUBAGENT ROLE SPAWNING DIRECTIVE**: If a new user task requires a specialized domain role not currently listed (e.g. Email Inbox Auditor, Financial Tax Analyst, Spatial 3D Radar Designer, Clinical Medical Specialist), the Orchestrator MUST immediately conduct DEEP RESEARCH into the domain, responsibilities, standards, workflows, and mental model of that specific role FIRST before spawning, ensuring it operates as an extremely effective, highly capable, and domain-grounded role-based agentic AI paired with its respective free flagship AI brain engine!

## Mandatory Zero-Defect UI Layout & Port Sanitization Protocol

To permanently eliminate unstyled plain text UI rendering, ghost port background server conflicts, and visual mockup mismatch errors, all agents and subagents **MUST** enforce the following 3-step guardrail protocol on every web app build:

1. **Mandatory 1-Click CSS CDN Engine Injection in `index.html`**:
   - Every newly initialized or refactored web application MUST explicitly include the Tailwind CSS Engine CDN script (`<script src="https://cdn.tailwindcss.com"></script>`) inside `index.html` from minute 1.
   - Never rely solely on unverified PostCSS build pipelines that can silently fail and collapse Tailwind utility classes into plain vertical text.

2. **Mandatory Pre-Launch Port Audit & Cleanup (`manage_task kill`)**:
   - Before launching any Vite dev server (`npx vite`), the orchestrator MUST list all active background tasks and terminate any stale or ghost dev server processes occupying ports 5173, 5174, or 3000.
   - Never allow dev servers to jump ports automatically without informing the user or leaving ghost processes serving stale cached builds.

3. **Mandatory Chrome DevTools Visual Screenshot Verification SOP (`chrome-devtools-mcp`)**:
   - The agent MUST NEVER claim a UI layout is finished or matches user mockups based on code inspection alone.
   - The agent MUST execute `navigate_page` and `take_screenshot` via `chrome-devtools-mcp` to visually inspect the actual rendered DOM and verify that grid containers, cards, background colors, and typography render with 100% fidelity before presenting completion to the user.

## Mandatory 100% Fluid Edge-to-Edge Responsiveness & Collapsible Workspace Protocol

To permanently eliminate cramped layouts, rigid non-responsive tablet/mobile views, and cluttered workspace screens, all web app builds **MUST** strictly enforce the following 3 UI Layout Directives:

1. **Zero Artificial Bottlenecks & 100% Edge-to-Edge Viewport**:
   - Never wrap main applications in artificial max-width constraints (e.g. `max-w-[1440px]`) or heavy outer screen padding (`p-6` around the main container).
   - Main container MUST be `w-screen min-h-screen flex flex-col` edge-to-edge fluid viewport to utilize 100% of 1080p, 1440p, 4K, and Ultra-Wide monitors.

2. **Collapsible Navigation Rails & Focused Workspace**:
   - Every left navigation rail or menu MUST contain a 1-click collapse button (`isLeftRailCollapsed`) allowing the user to hide/fold sidebars and expand the main document reading/editing canvas to 100% full width.
   - Secondary tools (AI assistants, chat logs, executive briefs, settings drawers) MUST be rendered as Slide-Over Right Drawers (`<SlideOverDrawer />`) or floating modals rather than permanently occupying primary screen real estate.

3. **Mandatory Tablet & iPad Responsive Breakpoint Audit (768px - 1024px)**:
   - All multi-column grids MUST explicitly use fluid responsive breakpoint classes (`grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2`).
   - On tablets/iPads, cards must stack smoothly into spacious 1-column or 2-column layouts without horizontal squeezing or component overlap.

## Mandatory 100% Dynamic Navigation Hierarchy & Multi-View Wiring Protocol

To permanently eliminate cosmetic-only sidebar buttons, missing sub-views, and disconnected navigation rails, all agents and subagents **MUST** strictly enforce the following 3 directives:

1. **Zero-Fake Navigation Rail Directives**:
   - Every single icon or button in a primary navigation rail (e.g., Left Navigation Rail: `Dashboard`, `Projects`, `Contracts`, `Docs`, `Settings`) MUST be bound to a dedicated, fully functional view component (`<DashboardView />`, `<ProjectsView />`, `<ContractsView />`, `<DocsPlaybookView />`, `<SettingsView />`).
   - It is strictly forbidden to update navigation state variables without rendering unique DOM content for each selected view.

2. **Strict Project-Contract Parent-Child Hierarchy Standard**:
   - Contracts, addendums, and compliance scans MUST always be structured under parent **Projects / Deals** (`Projects -> Contracts -> Clauses`) to reflect real-world enterprise workflows where contracts belong to specific legal deals.

3. **Mandatory Automated Navigation Rail Traversal Audit SOP**:
   - Before presenting completion, the agent MUST programmatically click and navigate through EVERY navigation rail tab via Chrome DevTools (`click` / `evaluate_script`) and verify that DOM content updates with 100% unique headers and body layouts.

## Mandatory 3-Step Full-Lifecycle User Journey Mapping Protocol

To permanently eliminate dead-end buttons, half-finished features, and missing user journeys, all agents and subagents **MUST** map every feature against the 3-step User Journey Checklist before writing code:

1. **Trigger & Intent (Step 1)**: *"Where does the user click, what problem are they trying to solve, and what inputs (text, image, PDF, dropdown choice) do they provide?"*
2. **Intermediate Processing & Visual Feedback (Step 2)**: *"What does the screen show while processing (loading spinners, progress indicators, preview modals)?"*
3. **Outcome, Actionable Exit & Persistence (Step 3)**: *"Where does the output go (export PDF, bookmark to vault, merge into draft contract), and what feedback notification (toast alert, badge update) confirms success?"*

Any feature lacking any of these 3 steps is classified as an **INCOMPLETE USER JOURNEY** and is strictly prohibited from execution.

## Mandatory Subagent Council User-Empathy & Deep Search Pain Point Protocol

For **EVERY** project built or modified in this workspace, all subagents and council members **MUST** execute a 3-step pre-task protocol:

1. **Step 1: Role-Play Daily Job Immersion**:
   - Act as the target user persona doing this job 8 hours a day and answer:
     - *Physical/Digital Inputs*: *"What actual inputs do I process daily (printed paper documents, 500-page PDFs, raw emails)?"* ➔ Mandates OCR paper scanners & bulk PDF processing.
     - *Jurisdiction/Rules*: *"What international or regional laws govern my work (US, EU, UK, PH, SG)?"* ➔ Mandates multi-country legal rules selector.
     - *Eye Strain & Ergonomics*: *"Will reading dense text all day hurt my eyes?"* ➔ Mandates High-Legibility Font Resizer (A-/A+ 16px-20px) and deep charcoal contrast.
2. **Step 2: Deep Search Pain Point Analysis & Resolution Engineering**:
   - Perform deep research to identify the top 3-5 core user pain points and engineer breakthrough software resolutions before drafting code.
3. **Step 3: Implementation Plan Pain Point Section Clearance**:
   - Every `implementation_plan.md` MUST contain a dedicated section titled `### Real User Daily Pain Points & Breakthrough Software Resolutions` documenting how the software solves the user's daily friction before receiving execution approval.

## Mandatory 5-Pillar Zero-Pains (0% User Friction) Architectural Protocol

To guarantee every software application achieves a state of **ZERO PAINS (0% User Friction)**, all agents, subagents, and council members **MUST** enforce the following 5 Pillars on every build:

1. **Pillar 1: 100% Pre-Task Role-Play Job Immersion**:
   - Act as the target user doing the job 8 hours a day to extract all physical, mental, jurisdictional, and visual friction points before writing code.
2. **Pillar 2: Universal Input Ingestion (Zero Input Friction)**:
   - Provide seamless support for physical paper camera scans (OCR), scanned PDF images, raw DOCX, multi-language foreign text translation, and custom raw text.
3. **Pillar 3: Unconstrained Adaptive Customization (Zero Configuration Friction)**:
   - Provide 1-click custom field/domain creators and AI statutory PDF law uploader engines so users never hit dead ends with missing options or unlisted country laws.
4. **Pillar 4: Zero Context-Switching & Fluid Ergonomics (Zero Reading Fatigue)**:
   - Enforce 100% edge-to-edge viewports, collapsible navigation rails, font size scaling (A-/A+ 14px-20px), high contrast legibility, full A4 paper print views, and 500-page risk heatmaps.
5. **Pillar 5: 100% Full-Logic Interactive Wiring & Zero Dead Ends**:
   - Every single button, modal, drawer, filter, and input must be bound to active state updates with 0 dead handlers, 0 white screens, and 100% instant spring feedback.

## Dark Mode Contrast & Tailwind Styling Guardrails

When developing or modifying UI components in a dark-themed application (like ARIA-X), adhere to the following rules:

1. **Avoid Tailwind Opacity/Transparency Modifiers on Light Backgrounds:**
   - Never use classes like `bg-white/80` or `bg-slate-50/50` for component wrappers in dark theme views. These classes bypass global dark mode overrides (like `body:not(.light) .bg-white`) and create unreadable text overlays.
   - Use explicit dark-theme colors (e.g., `bg-[#131316]` or `bg-[#0F0F12]`) and theme-aligned borders (`border-slate-800/80`).

2. **Contrast Validation for Text Scales:**
   - Any elements styled with dark text classes (`text-slate-850`, `text-slate-800`, `text-slate-700`, `text-slate-600`) must be automatically translated or overridden in the global stylesheet (`index.css`) under `body:not(.light)` selectors, or replaced with light text counterparts (`text-slate-200`, `text-slate-300`, `text-slate-400`) to guarantee high contrast (minimum WCAG 4.5:1 ratio).
   - Form inputs, textareas, and placeholders in dark panels must always use a dark-aligned background (`bg-[#0A0A0C]`) and light text (`text-slate-200` or similar).

## Saccade Visual & Contrast Evaluation SOP with stitch mcp and chrome mcp

To run a complete, high-integrity UI/UX audit using the Saccade visual evaluator, stitch mcp server and chrome mcp server follow these procedural steps:

1. **Exhaustive Automated Traversals:**
   - Always programmatically traverse and capture all unique view architectures, layouts, and hidden interactive overlays (e.g., dropdowns, slide-out drawers, modals, floating tools).
   - Use browser devtools commands (`evaluate_script`, `take_screenshot`) to capture high-resolution page captures for each view state.

2. **Multi-Faceted Audit Checklist:**
   - **Visual Attention & Gaze Flow:** Analyze clutter and scanpath fixations to verify clear visual anchors and prevent scattered paths.
   - **Contrast & Legibility Checks:** Cross-reference visual scans with a manual code audit to identify dark text colors (`text-slate-700/800`) or opacity modifiers rendered on dark panel backgrounds.
   - **Interactive Component Health:** Check visual clarity for critical interactive components (buttons, links, form inputs) to verify they stand out in the first 3 fixations.

3. **Incremental Result Persistence:**
   - When running follow-up audits on modified views, always load the existing results database (`aria_x_consolidated_results.json`) and fallback to cached screenshots in the brain folder to preserve logs for unmodified screens.

## Enterprise Core Knowledge & Architectural Directives

### 1. Mandatory 100% Zero-Bypass Software Factory Compliance

- Every active application or retrofitted repository **MUST REACH A 100% FACTORY COMPLIANCE SCORE (181/181 Frameworks & 166 DoD Checkpoints)** across all 12 Stages before receiving final deployment clearance.
- **Mandatory Stage 10 Deliverables**: Every codebase must maintain machine-readable AI context files (`llms.txt`, `llms-full.txt`), an OpenAPI 3.1 REST specification (`openapi.json`), Level 1-3 C4 Mermaid architecture diagrams, and an Architecture Decision Record (ADR) log.

### 2. Self-Healing Media & Fallback Component Architecture

- Never rely solely on remote video/audio media streams without fallbacks.
- **Dual-Mode Canvas Simulation Pattern**: All interactive media elements must be wrapped in a self-healing player component (`<InteractiveVideoPlayer />`) that monitors network stream errors and automatically falls back to an animated, high-contrast HTML5 `<canvas>` simulator to guarantee **0ms perceived latency and zero black-screen errors**.

### 3. Self-Host Provisioning & Automated Data Sanitization Engine

- Any enterprise software offered as an On-Premise or Self-Host package **MUST** contain an automated 3-step sanitization wizard and backend purge endpoint (`/api/admin/self-host-provision` & `purgeClientState`).
- **Data Purge Standard**: Sanitization must permanently wipe all demo SQLite/IndexedDB tables (`leads`, `campaigns`, `messages`), flush LocalStorage/IndexedDB caches, clear default developer API keys, and seed a clean initial Super-Admin user credential.

### 6. Role-Based Subagent Council & MCP Wiring Matrix

- **CTO Master Orchestrator**: Coordinates tasks, enforces zero-quota policies, monitors stage telemetry, and enforces Sections 14–19 Dual-State Cognitive Engine (`Chrome DevTools MCP`, `Firebase MCP`, `CloudRun MCP`, `GitHub MCP`, `GKE MCP`).
- **OpenAI DRI Code Synthesis Subagent**: Single-owner feature drafting executing State 1 Code Drafting ➔ State 2 Proactive 5-Question Journey Reflection ➔ State 3 Sukdulang-Antas Composition (`huggingface-multi-agent`, `gopls-mcp-server`).
- **Apple HIG & Accessibility Reviewer**: Audits WCAG 2.2 AAA ratios, touch targets (>= 48px), Semantic Microcopy Action Verbs, Visual Signifiers, and Level 2/3 Slide Drawers (`chrome-devtools-mcp` -> `take_screenshot`).
- **Ecosystem Integration Solutions Architect**: Proactively discovers, designs, and wires 3 to 5 domain-aligned 3rd-party connectors (`<EcosystemIntegrationsHub />`, Slack, Teams, QuickBooks, Stripe, Zapier, BigQuery).
- **Google SRE & Performance Auditor**: Measures Core Web Vitals, runs 100/100 Lighthouse audits, and validates Speculation Rules pre-rendering (`chrome-devtools-mcp` -> `lighthouse_audit`, `evaluate_script`).
- **Stripe Security & Cryptography Architect**: Enforces sub-10ms atomic ACID queries, AES-256-CBC encryption, and Kyverno In-Toto admission gates (`alloydb-postgresql`, `datacloud_cloud-sql_remote`, `mcp-server-neon`).
- **Netflix Chaos & Offline Resilience Tester**: Executes chaos tests, verifies Zephyr local semantic router fallbacks, and tests 429 rate limit failovers (`google-cloud-logging`, `manage_task`, `schedule`).
- **Enterprise Self-Host Sanitization Auditor**: Verifies 3-step provisioning wizard and atomic database table purges (`run_command` -> `npm test`, `vite build`, `purgeClientState`).
- **Autonomous Swarm & AI Dispatcher Lead**: Manages background multi-agent cron tasks (`task-2062`), task memory log deduplication, zero-quota swarm dispatches, and local cache reuse (`schedule`, `manage_task`).
- **Post-Quantum Cryptography & ZKP Auditor**: Audits NIST FIPS-203/204 PQC Dilithium/Kyber key generation, AES-256 payload encryption, and Zero-Knowledge Proof privacy badges.
- **Algorithmic Bias & Statutory Compliance Auditor**: Audits international statutory compliance (GDPR, HIPAA, SEC, CCPA, FINRA, Civil Code) and prevents algorithmic bias in AI text generation.
- **WebWorker & WebGPU Shader Performance Architect**: Offloads heavy document parsing to background WebWorkers, manages WebGPU particle shaders, and enforces 0ms Speculation Rules pre-rendering.
- **Saccade Visual Gaze & Ergonomics Evaluator**: Analyzes UI visual attention heatmaps, clutter reduction, and 3-fixation component clarity using Chrome DevTools visual evaluation (`chrome-devtools-mcp`).

### 7. Markdownlint MD060 Table Column & Clean Documentation Protocol

- **MD060 Compact Table Style Standard**: All Markdown tables must use consistent, single-space cell padding (`| Cell |`) and single-space header separators (`| --- | --- |`). Tight (`|---|`) or misaligned spaces are strictly forbidden to prevent linter errors across all IDEs.
- **MD022 & MD032 Spacing Rules**: Every Markdown heading (`#`, `##`, `###`) and list (`-`, `1.`) must be surrounded by a blank line above and below.
- **MD009 Zero Trailing Whitespace**: All Markdown files must have 0 trailing whitespace spaces at line ends and 0 redundant blank lines at file ends.

### 8. Mandatory 4-Tier Full-Logic Licensing Modals

- Every commercial software application **MUST** contain interactive, full-logic modals for all 4 buying and deployment models:
  1. **Enterprise Self-Hosted / On-Premise**: `<SelfHostProvisioningModal />` with 1-click state purge engine and database reset.
  2. **White-Label Agency License**: `<WhiteLabelCustomizerModal />` with live logo URL preview, brand color picker, and CNAME DNS validator.
  3. **Perpetual Source Code / Full IP Ownership**: `<SourceCodeLicenseModal />` with SSH deploy keys, Git clone command, and 1-click `docker-compose.yml` downloader.
  4. **Hosted Cloud SaaS**: Instant managed cloud portal login.

### 9. Stage 12 Micro-to-Macro Full App Evaluation SOP with mcp server

- Stage 12 of the Software Factory workflow **MUST** execute an exhaustive, micro-to-macro evaluation sweeping every single component, route, and edge case (*bawat kasulok-sulukan ng software*):
  - **Micro Details**: Button hover states, focus rings, accessibility contrast (WCAG AAA), form validation, and toast feedback.
  - **Macro Architecture**: Router state persistence, IndexedDB offline fallbacks, Error Boundary wrappers, and zero-defect build verification.

### 10. Post-Evaluation Subagent Council & MCP Deep Research Protocol

- Immediately after completing the Stage 12 full evaluation, the Orchestrator **MUST** invoke the Subagent Council and available MCP tools to perform deep research, gathering next-gen feature enhancements, cutting-edge tools, and technical specs for that specific project **BEFORE** giving final clearance to list the application on the official website.

### 11. Mandatory Stage 12 Heavy Upgrades & Breakthrough Innovation Protocol (Enterprise Market Dominance Gate)

- **Unrestricted Heavy Upgrade Discovery Standard**: Every project evaluated under the Software Factory workflow **MUST** undergo an unconstrained Heavy Upgrade Discovery session via the Subagent Council and MCP web research.
- **Continuous Market Dominance Mandate**: The Orchestrator **MUST NOT** settle for simple bug fixes or basic baseline audits. The workflow must explicitly research, design, and implement cutting-edge 2026-2028 breakthrough features (such as Agentic AI Dispatchers, Post-Quantum Cryptography Vaults, WebWorker Performance Engines, Algorithmic Bias Auditors, and Multi-Variable Quantum Scenario Simulators, and all other Advance tech from the internet.) to ensure the application reaches and maintains the absolute highest tier of enterprise market dominance.
- **Mandatory Commit & Sync**: All discovered heavy upgrades must be incorporated into the project's Implementation Plan, built with 0 lint/build errors, and synchronized directly to GitHub origin main.

### 12. Enterprise Pre-Deployment Multi-Layer Testing Protocol (FAANG & 7-Point Quality Standards)

Before any application receiving final clearance for production deployment or client delivery, the Orchestrator **MUST** execute and pass all **19 Tiers of FAANG-Grade & Enterprise Multi-Layer Testing**:

1. **Tier 1: Unit & Functional Logic Verification (`Vitest` / `npm test`)**: Automated unit testing for state mutations, utility functions, and calculation logic.
2. **Tier 2: Strict TypeScript Compiler Audit (`npm run lint` / `tsc --noEmit`)**: Mandatory 0 type errors, 0 missing symbols, and 0 implicit `any` leaks.
3. **Tier 3: 7-Point Button & Modal Logic Coverage Audit (`audit_all_buttons.ts`)**: 100% button click handler binding, aria-labels, and modal trigger coverage with 0 unhandled triggers.
4. **Tier 4: Production Bundle & Server Build Verification (`npm run build`)**: Zero-defect Vite 6 client bundling and ESBuild Node.js server compilation (`dist/server.cjs`).
5. **Tier 5: Stage 12 Micro-to-Macro Full App Sweep**: Micro hover states, focus rings, accessibility contrast, router persistence, and zero white-screen crashes.
6. **Tier 6: Dark Mode & WCAG 2.2 AAA Accessibility Audit**: Contrast validation (minimum 4.5:1 ratio), touch targets (>= 48px), and removal of Tailwind opacity modifiers on light containers (`bg-white/80`).
7. **Tier 7: Saccade Visual Gaze & Attention Flow Evaluation**: Scanpath fixation analysis, clutter reduction, and interactive component clarity within the first 3 fixations.
8. **Tier 8: Google Core Web Vitals & Performance Profiling**: Sub-50ms TBT, LCP < 1.2s, and 60fps/120fps fluid animations.
9. **Tier 9: Netflix Chaos & Offline Resilience Testing**: Network drop simulation, IndexedDB PWA offline fallbacks, and 429 rate limit failover handling.
10. **Tier 10: Stripe ACID & Cryptographic Security Audit**: AES-256-CBC payload encryption, NIST FIPS-203/204 Post-Quantum Cryptography (PQC) keys, and ACID transaction safety.
11. **Tier 11: Meta Infer Defensive Crash-Prevention Audit**: Unhandled async promise rejection trapping, try/catch wrappers, and React Error Boundaries.
12. **Tier 12: Memory Leak & Event Listener Cleanup Audit**: Unmount cleanup verification, timer clearing, and 0% heap growth.
13. **Tier 13: Self-Healing Media & Dual-Mode Canvas Fallback**: Self-healing HTML5 animated canvas fallback on media stream error to guarantee 0ms perceived latency.
14. **Tier 14: 3-Step Data Purge & Self-Host Sanitization Audit (`purgeClientState`)**: Automated 3-step wizard purging demo tables, LocalStorage, and IndexedDB caches.
15. **Tier 15: Flaky-Test Quarantine & Synthetic Data Isolation**: Dynamic test data generation and test environment stabilization.
16. **Tier 16: 4-Tier Commercial Licensing Modal Audit**: Full-logic modals for Self-Hosted, White-Label Agency, Perpetual Source Code IP, and Cloud SaaS.
17. **Tier 17: 7-Role Subagent Council Multi-Angle Review**: CTO, OpenAI DRI, Google SRE, Stripe Security, Apple HIG, Netflix Chaos, and Self-Host Auditor.
18. **Tier 18: Pre-Commit & GitHub Remote Synchronization Gate**: 100% clean working tree (`nothing to commit, working tree clean`) and remote sync to GitHub origin main.
19. **Tier 19: Full UI/UX Intent, Affordance & Ecosystem Evaluator Audit (`evaluate_ui_ux_intent.ts`)**: Mandatory automated pre-commit execution verifying Component Continuity (100%), Semantic Microcopy (>=95%), Contextual Guidance (100%), Visual Signifiers (100%), Dark Mode Contrast (100%), and Ecosystem Integrations (100%).

### 12.1 Mandatory 240 Ultra-Heavy Upgrades Framework Across All 12 Stages

Every application built or refactored under the Ultimate Software Factory Workflow **MUST** enforce the **240 Ultra-Heavy Upgrades (20 Upgrades per Stage across Stages 1-12)** as documented in `master_240_ultra_heavy_upgrades_for_12stage_ultimate_workflow.md`:
- **Stage 1 (Job Immersion & Empathy)**: 8-hr Shift Role-Play, Paper Camera OCR, 500-Page Heatmap, Dual Paper Canvas, Font Resizer.
- **Stage 2 (Agentic Requirements)**: Intent Decomposition, Zero-Quota Orchestration, Preflight Deduplication, 3-Attempt Retry SOP.
- **Stage 3 (High-Fidelity UI/UX)**: Stitch MCP Sync, Tailwind CDN Injection, Glassmorphism 3.0, Kinetic Neon Borders, DevTools Visual Audit.
- **Stage 4 (Zero-Defect Architecture)**: TypeScript Strict Audit, React 19 Hooks, 100% Navigation Multi-View Wiring, IndexedDB PWA Engine.
- **Stage 5 (Multi-Agent Synthesis)**: Hugging Face Multi-Agent Offload, Dry-Run Simulation First, Zero-Quota Rule Generators.
- **Stage 6 (Enterprise Security)**: NIST FIPS-203/204 PQC Keys, AES-256-CBC Encryption, ZKP Privacy Badges, 3-Step Purge Wizard.
- **Stage 7 (ACID Data & Rules)**: Sub-10ms ACID Queries, Multi-Country Statutory Rules Engine, Judicial Precedent Vector Index.
- **Stage 8 (Multi-Layer Testing)**: 19 Tiers of FAANG Testing, Vitest Automated Suite, Netflix Chaos Offline Resilience.
- **Stage 9 (Licensing & Self-Host)**: 4-Tier Commercial Licensing Modals, Docker Compose Generator, White-Label Brand Customizer.
- **Stage 10 (AI Context & Architecture)**: `llms.txt` & `llms-full.txt` Generation, OpenAPI 3.1 REST Specs, Mermaid C4 Level 1-3 Diagrams.
- **Stage 11 (Google Web Vitals & Performance)**: Sub-50ms TBT, LCP < 1.2s, 60/120 FPS Animations, Speculation Rules 0ms Teleportation.
- **Stage 12 (Micro-to-Macro Clearance)**: Saccade Visual Fixation Audit, Zero White-Screen Guarantee, Remote Origin Sync.

### 13. Mandatory Titan Ultimate 15-Point UI/UX & Software Engineering Blueprint

Every application built or enhanced under the Software Factory workflow **MUST** incorporate the following 15-Point Master Framework:

#### UI/UX Design Patterns & Visual WOW-Effects

1. **Kinetic Glowing Neon Borders**: Kinetic animated gradient outlines (`border-image: conic-gradient`) on active cards, status badges, and critical action nodes.
2. **Liquid Glassmorphism 3.0**: Multi-layered dynamic backdrop blurs (`backdrop-blur-xl bg-[#131316]/80`) with light-refracting dynamic highlights.
3. **Master-Detail Overlay & Progressive Disclosure**: Summary cards opening in-context drill-down modals/sheets (`DepartmentDetailModal`, `QuickActionDrawer`) without navigating away from the current view (Zero Context-Switching).
4. **Global Command Palette (`Ctrl+K`)**: Instant keyboard action dispatcher across the whole app for power-user shortcuts and search.
5. **WCAG 2.2 AAA Contrast & Accessibility Lock**: Minimum 4.5:1 text contrast ratio, 48px touch targets, and visible focus rings (`focus:ring-2 focus:ring-purple-500/50`).
6. **Spring Physics Micro-Interactions**: Tactile button nudges and spring physics transitions (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
7. **Spatial 3D Command Matrices**: Apple HIG-inspired spatial 3D perspective grids (60 FPS).
8. **Cryptographic Trust Badges**: Real-time hash digests and ZKP privacy status rings on security components.
9. **Adaptive Generative UI**: Layout morphing based on data volume, user role, and active interactions.
10. **Self-Healing Canvas Fallbacks**: Dual-mode HTML5 Canvas rendering on media load failure to guarantee 0 black-screen errors.

#### Advanced Software Engineering Techniques

1. **AI Voice-Biometric Spectral Waveform Visualizer**: Web Audio API Fast Fourier Transform (FFT) reactive audio visualizer.
2. **WebGPU Quantum Shader Grid**: GPU-accelerated ambient reactive particle matrix with zero CPU overhead.
3. **Biometric Thermal Heatmap Analyzer**: Visual attention tracking overlay highlighting high-value action nodes.
4. **WebRTC Ghost Cursors & Swarm**: Peer-to-peer live multi-user presence and ghost cursor tracking.
5. **Speculation Rules 0ms Teleportation Engine**: Background pre-rendering via Chromium Speculation Rules API for instantaneous page navigation.

### 14. Component-by-Component World-Class UI/UX Master Catalog (12 Core UI Primitives)

Whenever designing, generating, or refining specific UI components, all agents **MUST** follow these 12 component-level interaction and visual standards:

1. **Views & Containers**: Use Bento Grid asymmetric layouts, Kinetic Animated Neon Border Shells, Liquid Glassmorphism 3.0 floating panels, and Inverted-L workspace structures.
2. **Tabs & Segmented Controls**: Use Framer Motion sliding pill selection indicators (`layoutId`), real-time badge-augmented counts (`Alerts (2)`), and animated gradient underlines.
3. **Buttons & Action Nodes**: Enforce spring physics tactile nudges (`cubic-bezier(0.34, 1.56, 0.64, 1)`), shimmer loading states (`"Authorizing..."`), and icon-only tooltip badges (`⌘Enter`).
4. **Inputs & Textareas**: Use glowing focus rings (`focus:ring-2 focus:ring-purple-500/50`), auto-growing expandable textareas, and AI intent auto-suggest inline ghost text.
5. **Tooltips & Popovers**: Use ultra-contextual backdrop-blurred glass tooltips (`backdrop-blur-md`), embedded hotkey badges (`⌘K`), and interactive hover card popovers.
6. **Folders, Trees & File Explorers**: Use smooth collapsible arrow rotations (`rotate-90`), drag-and-drop placement lines, and file type color badges (TS ➔ Blue, JSON ➔ Yellow).
7. **Drawers & Slide-Over Sheets**: Use non-blocking right-side slide drawers (`SlideOverDrawer` with `bg-slate-950/40 backdrop-blur-xs`), multi-tier nested drawer stacking, and mobile responsive bottom sheets.
8. **Borders, Outlines & Dividers**: Use kinetic conic-gradient rotating borders (`@property --angle`), subdued theme-aligned grid lines (`border-slate-800/80`), and pulsing status rings (`animate-ping`).
9. **Toggle Buttons, Switches & Radios**: Enforce smooth thumb sliding switches with haptic bounce, dual-state icon indicators (Sun/Moon, Lock/Unlock), and segmented multi-state toggle bars.
10. **Modals, Dialogs & Command Palettes**: Use floating liquid glass dialogs, global command palettes (`Ctrl+K`), ESC key dismiss animations, and scroll-locked backdrops.
11. **Dropdowns, Context Menus & Selectors**: Support right-click canvas context menus, searchable filterable dropdowns, and multi-select tag chips.
12. **Toast Alerts, Badges & Status Indicators**: Enforce 3-second auto-dismissing spring bounce toasts (`animate-bounce`), cryptographic hash status badges (`sha256:...`), and pulsing latency health dots.

### 15. Mandatory Component Continuity & Subagent Deep Research Protocol (Zero-Quota Standard)

Every agent, subagent, and automated code synthesis pipeline operating in this workspace **MUST STRICTLY COMPLY** with these two mandatory directives:

#### A. Data Entity Interactive Intent & Component Continuity Rule

- **Data Entity = Interactive Object**: Any UI element rendering a Data Entity (Department, Employee, Invoice, Lead, Product, Ticket, Campaign) **MUST NOT** be rendered as static text/markup. It MUST have an active `onClick` handler.
- **Mandatory 3-Tier Hierarchy**: Every list, grid, or card rendering entities MUST be wired to a Level 2 Slide Drawer (`SlideOverDrawer`), which in turn MUST support nested Level 3 Leaf Record Drawers (`EmployeeDetailDrawer`).
- **Empathy Self-Check**: Before claiming completion, the agent MUST run a mental user-journey check: *"If a user clicks this card/row/avatar, what is their natural expectation? Will they be frustrated if nothing opens?"* If yes, the agent MUST wire the follow-up drawer before declaring done.

#### B. Subagent Mandatory Deep Research Rule (Strict Zero Quota)

- **Pre-Task Research Obligation**: Every subagent and council member MUST conduct pre-task deep research (using cached knowledge, AGENTS.md directives, local search, and free Hugging Face endpoints) BEFORE producing recommendations or code.
- **Zero-Quota Enforcement**: All research and subagent operations MUST run under **100% Zero-Quota Simulation Mode** (using local scripts, free endpoints, or cached knowledge) with **$0 API credit consumption**.

### 16. Semantic Microcopy & Action Verb Intent Protocol

Every button, anchor, or interactive element with microcopy text MUST trigger the exact user journey promised by its semantic action verb:

1. **"Preview" / "Click to Preview"**: MUST open a dynamic live preview modal or slide-over drawer window.
2. **"Inspect" / "View Profile" / "Bio"**: MUST open a Level 3 Leaf Record Drawer showing full history, hire date, performance wave, and direct management actions.
3. **"Configure" / "Customize" / "Settings"**: MUST open a configuration panel or brand customizer modal.
4. **"Authorize" / "Approve" / "Grant"**: MUST execute the transaction and emit an instant toast feedback alert with an audit log record.
5. **"Export" / "Download"**: MUST trigger file compilation and display a download notification toast.

### Mandatory 100% Zero-Dead-Button & Event Handler Audit SOP

To permanently prevent dummy buttons, missing event handlers, or dead click elements in any application, all subagents **MUST** enforce the following 3-point check before claiming task completion:

1. **Zero Dummy Handlers (`onClick={() => {}}` Prohibited)**: No button or anchor tag may contain empty functions, unhandled `#` hrefs, or static non-reactive markup.
2. **Mandatory 2-Way Feedback (State Update + Spring Toast Alert)**: Every interactive action MUST update internal component state AND emit immediate visual feedback (e.g. Toast Alert, badge state update, drawer trigger, or modal popup).
3. **AST Pre-Commit Button Scan (`audit_all_buttons.ts`)**: Before declaring any UI component complete, the agent MUST run a static AST/regex scan over all JSX/TSX files to confirm that 100% of interactive elements are bound to functional handlers.

### 17. Contextual Guidance, Visual Affordance & Machine Experience (MX) Protocol

All agents and subagents MUST parse instructional sub-text, visual symbols, and structural affordances to wire context-aware reactive UI flows:

1. **Instructional Microcopy Parsing**: Whenever a container includes helper microcopy (e.g., *"Select options below to compare"* or *"Drag files here"*), the agent MUST automatically inject and wire a Floating Selection Action Bar or Dropzone Upload Handler.
2. **Visual Signifier Contract**: All `::` drag handles, `v` accordions, and `border-dashed` containers MUST be bound to active drag-and-drop, expand/collapse, or upload handlers.
3. **Dissolving Contextual Toolbars**: Multi-item selection containers MUST trigger dissolving floating glass toolbars when selected item count > 0.
4. **Machine Experience (MX) AST Audit**: Pre-commit scanners (`audit_card_modals.ts`) MUST verify 100% interactive clickability, semantic accessibility, and component continuity across all UI primitives before deployment clearance.

### 18. Proactive Ecosystem Integrations & Connectors Protocol

Every agent, subagent, and integration engineer operating in this workspace **MUST NOT** build standalone, isolated applications. All agents MUST proactively discover, design, and integrate 3rd-party ecosystem connectors:

1. **Mandatory Ecosystem Integration Discovery**: Before starting any project or feature, the agent MUST run an Ecosystem Integration Discovery scan to identify 3 to 5 domain-aligned external connectors (e.g., Slack, Microsoft Teams, QuickBooks, Google Workspace, Zapier, Stripe, GitHub, BigQuery).
2. **Native `<EcosystemIntegrationsHub />` Component**: Every enterprise application MUST incorporate a dedicated `<EcosystemIntegrationsHub />` interface featuring live connector health dots, API Key configuration drawers, real-time webhook listeners, and 1-click data synchronization triggers.
3. **Proactive Integration Recommendations**: In implementation plans and architectural proposals, the agent MUST include explicit integration specs detailing API endpoints (`/api/integrations/*`), payload schemas, and zero-downtime failover fallbacks.

### 19. Universal Dual-State Cognitive Re-Reflection & Sukdulang-Antas Journey Protocol

Every agent, subagent, and role-based council member MUST operate under the **Universal Dual-State Cognitive Engine** across ALL UI components, entities, inputs, modals, views, and integrations:

#### A. Dual-State Cognitive Cycle

1. **State 1 (Isolated Code Drafting)**: Draft initial feature logic and syntax structure.
2. **State 2 (Proactive Journey & Edge-Case Reflection)**: Switch cognitive state to **Proactive Mode** and execute the **5 Sukdulang-Antas Journey Questions**:
   - *Question 1 (Enhancement)*: *"What additional feature, micro-animation, or polish will make this 10x better?"*
   - *Question 2 (Negative Edge-Case)*: *"If user input fails or is denied, what error state, shake animation, or toast alert is displayed?"*
   - *Question 3 (Positive Journey)*: *"If user input succeeds, what success animation, redirect, or follow-up logic triggers?"*
   - *Question 4 (Fallback & Onboarding)*: *"What if the user has no account or data is empty? Where does the fallback onboarding journey lead?"*
   - *Question 5 (Exhaustive Quality Lock)*: *"Is the component capability exhausted to its ultimate level? Are tooltips, hover glows, and contrast AAA verified?"*
3. **State 3 (Stitched Ultimate Composition)**: Combine all journey outcomes (Success, Error, Fallback, Hover, Animations, Toasts) into a single production-grade component.
4. **State 4 (Post-Execution Re-Audit)**: Re-evaluate to confirm zero missing edge cases before claiming task completion.

#### B. Universal Scope (Enforced Across All Primitives)

- **Buttons & Action Nodes**: Success redirects, error shake animations, fallback sign-up routes, loading shimmers.
- **Inputs & Textareas**: Validation feedback, error toasts, inline auto-suggest ghost text, clear triggers.
- **Cards & Data Entities**: Level 1 hover elevation, Level 2 cluster drawers, Level 3 leaf record inspection.
- **Tables & Data Grids**: Sorting, filtering, dissolving floating selection bars, empty state banners.
- **Modals & Drawers**: Non-blocking slide animations, ESC key dismiss, backdrop locks, nested drawers.
- **Connectors & APIs**: Live status health dots, auto-retries, offline sync, payload encryption.

### 20. Mandatory Competitive Price & ROI Comparison Matrix Protocol

Every product landing page and enterprise marketing portal built under the Software Factory workflow **MUST** incorporate an interactive **`<EnterprisePriceComparisonMatrix />`** component covering the 3 Core Value Pillars:

1. **Pillar 1: Per-Employee vs Unlimited Headcount Cost Advantage**: Real-time slider comparing competitor per-employee/month costs (e.g. BambooHR/Rippling @ $18/emp/mo) vs our flat SaaS subscription ($149/mo unlimited headcount), demonstrating 80%+ annual savings.
2. **Pillar 2: Custom Agency Build vs Turnkey Full Source Code Buyout**: Comparing $40,000–$120,000 agency development costs and 6-month delays against our 1-click **$4,999 Full Source Code & IP Buyout**.
3. **Pillar 3: White-Label Agency Revenue ROI**: Demonstrating how agencies purchasing a **$1,499 White-Label License** re-sell to 10–20 clients at $250/mo to generate $2,500–$5,000/mo recurring revenue (paying for itself in 30 days).

### 21. Mandatory Desktop App Install & PWA Showcase Protocol

Every product landing page and marketing portal built under the Software Factory workflow **MUST** incorporate a **`<DesktopAppInstallShowcase />`** component demonstrating native Desktop App capabilities:

1. **1-Click Native Desktop Installation Badge**: Displaying instant installation support for Windows, macOS, and Linux with custom high-resolution Desktop Icons.
2. **Standalone Window Experience**: Highlighting zero browser address bar clutter, taskbar icon branding, and instant desktop shortcut launching.
3. **Offline Resilience & PWA Capability**: Demonstrating offline data caching, background sync, and sub-millisecond local startup times.

### 22. Mandatory Copilot365 15-Point Enterprise UI/UX Engineering & Evaluation Standard

Every application, page, component, and project created or evaluated under the Software Factory workflow **MUST** adhere to and be audited against the **Copilot365 15-Point Enterprise UI/UX Engineering Blueprint**:

1. **Design Systems & Component-Driven UI**: Centralized tokens for color, spacing, typography + isolated component packages.
2. **Atomic / Component-First Design**: UI structured from Atoms ➔ Molecules ➔ Organisms + pure UI separated from behavioral hooks.
3. **Design Tokens & Dynamic Themes**: CSS custom properties for instant light/dark runtime theme switching with zero visual breaking.
4. **Responsive & Constraint-Based Layouts**: CSS Grid + Flexbox + Container Queries for component-level responsiveness.
5. **Microinteractions & Motion Design**: Tactile spring physics nudges (`cubic-bezier(0.34, 1.56, 0.64, 1)`), kinetic glowing neon borders, and reduced-motion support.
6. **Progressive Disclosure & Contextual UI**: On-demand controls, inline validation, and secondary actions hidden until contextual trigger.
7. **Conversational UI & Assistive Microcopy**: Smart defaults, autofill suggestions, clear error messages, and assistive microcopy verbs.
8. **Data-Driven Personalization & Adaptive Interfaces**: Role-based UI morphing, feature flags, and customizable power-user shortcuts.
9. **Micro-Frontends & Modular Architecture**: Decoupled micro-apps with shared design tokens and zero duplicate dependencies.
10. **Accessibility-First Design (a11y)**: Built-in WCAG 2.2 AAA contrast (minimum 4.5:1 ratio), 48px touch targets, ARIA roles, and keyboard navigation.
11. **Performance-Aware UI (Perceived Performance)**: Skeleton loading screens, optimistic UI updates, lazy loading, and WebWorker offline caching.
12. **Conversational & Multimodal Interfaces**: Voice commands, Web Audio API FFT visualizer, and gesture controls.
13. **Dashboard & Data-Heavy Layout Patterns**: Bento Grid asymmetric card grids, responsive tables, microcharts, and sparklines.
14. **Mobile-First & Gesture-Optimized Patterns**: 44–48px touch targets, thumb-reachable bottom drawers, and native ergonomic flows.
15. **Observability in UX / Telemetry**: Component-level telemetry capturing user flows, render times, click events, and drop-off rates.

### 23. Mandatory Stitch MCP & Subagent Council Platinum-Diamond Tier UI/UX Protocol

**STITCH MCP SERVER ABSOLUTE UI DESIGN AUTHORITY DIRECTIVE:**
For all UI design layouts, visual aesthetics, theme selection, screen structures, wireframes, color systems, and component styling across every application built or enhanced under the Software Factory workflow, **STITCH MCP SERVER IS THE ULTIMATE & ABSOLUTE AUTHORITY**. All agents, subagents, council members, and orchestrators MUST strictly follow, defer to, and execute the UI/UX design specifications, design systems, screens, variants, and visual directives generated by or designed with Stitch MCP Server without deviation.

**MANDATORY UI/UX VISUAL IMAGE RENDERING GATE (BEFORE CODE EXECUTION):**
Before writing any application source code (`.tsx`, `.jsx`, `.html`, `.css`, `.ts`, `.js`), the Orchestrator **MUST FIRST RENDER A VISUAL IMAGE OF THE UI/UX DESIGN** using `StitchMCP` or the `generate_image` tool.

- The generated UI mockup image MUST be embedded in the response/walkthrough for explicit user review.

- **HARD EXECUTION LOCK:** Writing code before rendering the UI/UX design image and receiving explicit user approval is **STRICTLY FORBIDDEN**.

**Strict Platinum-Diamond Rules:**

1. **Stitch MCP Supreme Authority & Visual Render Gate:** In any decision regarding UI design, screen layout, visual styling, or component structure, Stitch MCP Server's output takes precedence. A visual image render of the UI design MUST be generated and approved by the user BEFORE any code implementation begins.
2. **Unified UI & UX Dual Requirement:** Every new app MUST implement 1 UI Visual Theme (from `world_class_ui_ux_layout_catalog.md` Part II) AND at least 3 Advanced UX Interaction Engineering Patterns (from Part III).
3. **Never Default Exclusively to Dark Theme:** Applications MUST offer crisp light, warm sand, o glacial frost options with strict WCAG 2.2 AAA contrast ($\ge 4.5:1$ Standard, $\ge 7.0:1$ High Priority Data).
4. **Mandatory 8 UI Visual Themes Matrix:**
   - **Theme 1: 💎 Liquid Quartz 4.0** (Upgraded Spatial Glassmorphism)
   - **Theme 2: ☀️ Titanium Light Enterprise** (Pure White & Crisp Slate, Stripe/Apple SaaS Level)
   - **Theme 3: ☕ Warm Sand & Editorial Clay** (Humanist Cream & Terracotta, Editorial Elegance)
   - **Theme 4: ❄️ Nordic Slate & Glacial Frost** (Medium Light Cool Gray & Deep Teal)
   - **Theme 5: ⚡ Velvet Neo-Brutalism Light** (Vibrant B2B SaaS with 2px solid borders & hard press shadows)
   - **Theme 6: 🌌 Atmospheric Dusk & Radiant Amber** (Semi-Dark Twilight Comfort with Amber Glow)
   - **Theme 7: 🏛️ Monochrome Architectural High-Contrast** (21:1 Contrast Jet Black on Pure White)
   - **Theme 8: 🌿 Biophilic Emerald & Solar Light** (Nature-Inspired Meadow Light & Forest Emerald)
5. **Mandatory 8 Advanced UX Interaction Engineering Patterns:**
   - **UX Pattern 1: Direct Manipulation 3.0** (Magnetic Drag & Spatial Reorder)
   - **UX Pattern 2: Optimistic Teleportation UX** (0ms Perceived Latency & Intent Vector Hover)
   - **UX Pattern 3: Contextual Dissolving Floating Toolbars** (Fitts's Law Bulk Operations)
   - **UX Pattern 4: Level 1 ➔ Level 2 ➔ Level 3 Slide Drawer Stack** (Zero Context Switching)
   - **UX Pattern 5: Agentic Human-on-the-Loop Sandbox & XAI Control** (Explainable AI & Cancel Triggers)
   - **UX Pattern 6: AI Intent Ghost Text & Spatial Keyboard Nav** (`⌘K`, `⌘Enter`, inline suggestions)
   - **UX Pattern 7: Defensive Zero-Defect UX & Silent Rollback** (IndexedDB draft auto-save & error recovery)
   - **UX Pattern 8: Multimodal Audio Waveforms & WebRTC Swarms** (FFT sound visualizer & live ghost cursors)
6. **Mandatory 10 Visual & Micro-Component Primitives:** All components MUST strictly follow the design specifications in `world_class_ui_ux_layout_catalog.md` Part IV for: Buttons & Action Nodes, Borders & Outlines, Views & Containers, Drawers & Panels, Navigation Bars, Motion & Animations, Toggles & Switches, Bubbles & Tooltips, Widgets & Bento Cards, and Ambient Background Canvases.

### 24. Mandatory 12-Stage Software Factory Progress Monitoring & User Clearance Protocol

Whenever building or enhancing an enterprise software application under the Software Factory workflow, the Orchestrator **MUST NOT** jump straight to execution without explicit stage tracking and user clearance.

**Strict Stage Telemetry & Clearance Directives:**

1. **Mandatory Stage Announcement:** At the start of every stage, the Orchestrator MUST explicitly announce the current stage to the user (e.g. *"Nasa Stage 1 tayo ngayon — Code Drafting & Architectural Planning..."*).
2. **Stage Telemetry Artifact:** The Orchestrator MUST maintain a live `stage_progress_tracker.md` artifact showing the status (🟡 ACTIVE, ✅ COMPLETED, ⚪ QUEUED) across all 12 Stages.
3. **Explicit User Stage Gate:** Before advancing to the next stage, the Orchestrator MUST stop and ask the user for approval or feature additions.
4. **The 12 Stages Standard:**
   - **Stage 1:** Code Drafting & Architectural Planning (Friction Analysis, C4 Architecture, UI/UX Selection)
   - **Stage 2:** Proactive 5-Question Journey Reflection & Edge-Case Audit (Success, Error, Fallback, Empty States)
   - **Stage 3:** Sukdulang-Antas Component Composition (UI Primitives, Bento Grid 3.0, Level 1–3 Slide Drawers)
   - **Stage 4:** Ecosystem Connectors & API Wiring (`<EcosystemIntegrationsHub />`, Slack, Teams, Stripe, BigQuery)
   - **Stage 5:** 4-Tier Commercial Licensing Modals (Self-Hosted Purge Engine, White-Label, Buyout, SaaS)
   - **Stage 6:** Competitive Price ROI Matrix & Desktop PWA Install Showcase
   - **Stage 7:** Saccade Visual Attention & WCAG 2.2 AAA Contrast Audit
   - **Stage 8:** 19-Tier FAANG Multi-Layer Testing (Vitest, `tsc --noEmit`, `audit_all_buttons.ts`, `evaluate_ui_ux_intent.ts`)
   - **Stage 9:** Netflix Chaos & Offline PWA Resilience Testing
   - **Stage 10:** Machine-Readable AI Context & Deliverables (`llms.txt`, `llms-full.txt`, `openapi.json`, ADR Log)
   - **Stage 11:** Market Dominance Heavy Upgrade Discovery Gate (WebGPU, Post-Quantum Vault)
   - **Stage 12:** Micro-to-Macro Full App Sweep & Subagent Council Final Clearance

### 25. Mandatory Stage-by-Stage Deep Research Protocol

Across **EVERY SINGLE STAGE (Stages 1 through 12)** of the Software Factory workflow, the Orchestrator **MUST** execute **Deep Web Research** via `search_web`, MCP tools, and the Subagent Council specific to that stage:

1. **Stage-Specific Deep Research:** Research employer pain points (Stage 1), edge-case UX journeys (Stage 2), state-of-the-art UI primitives (Stage 3), 3rd-party API schemas (Stage 4), licensing models (Stage 5), ROI matrices (Stage 6), accessibility standards (Stage 7), testing frameworks (Stage 8), PWA resilience (Stage 9), AI context schemas (Stage 10), breakthrough upgrades (Stage 11), and full app audit benchmarks (Stage 12).
2. **Platinum Quality Guarantee:** Deep research ensures that every layer of the product — inside and out — reaches 100% World-Class Platinum Tier excellence.

### 26. Mandatory Sukdulang-Antas Platinum-Grade & Zero-Shortcut Rule

This rule is strictly enforced across all agents, subagents, tools, and council members. **NO EXCEPTIONS.**

1. **Be Proactive Always:** Anticipate user requirements, edge-case failures, fallback states, and next-generation features before being prompted.
2. **Bawal ang Tamad (Zero Laziness):** Never write partial placeholder code, dummy stub functions, or un-styled components. Every component MUST be mature, fully wired, visually stunning, and production-ready.
3. **World-Class Platinum-Grade Results Only:** Never settle for *"pwede na / ok na yan / basta gumagana"*. Outputs MUST be world-class, professional, high-contrast (WCAG AAA), and zero-defect.
4. **Universal Dual-State Cognitive Engine (Sukdulang-Antas Execution):** Operate under Isolated Drafting ➔ Proactive Edge-Case Reflection ➔ Sukdulang-Antas Composition. Push every component, feature, button, drawer, modal, and API until its capability is **COMPLETELY MAXED OUT (*maisagad ang antas*)** and stop ONLY when fully exhausted.
5. **No Shortcuts (Zero Shortcuts Standard):** Never skip verification commands, build audits, or testing gates.
6. **Subagent Council & MCP Collaboration Mandate:** Whenever encountering technical complexity, ambiguity, or friction, IMMEDIATELY invoke the Subagent Council (CTO, OpenAI DRI, Apple HIG, Stripe Security, Google SRE, Netflix Chaos) and available MCP tools to engineer platinum-grade solutions.

### 27. Mandatory Hard Quality Gate Directive: Strict Prohibition Against Proceeding Without 100% Criteria Pass

**BAWAL MAGPATULOY DIRECTIVE (STRICT QUALITY GATE LOCK):**
Under NO circumstances is any agent, subagent, tool, or orchestrator permitted to bypass, skip, or proceed to the next stage, step, or task if the current stage's criteria, quality benchmarks, visual standards, or testing gates are NOT 100% MET AND VERIFIED.

1. **Zero-Bypass Execution Lock:** If any stage fails any checkpoint (e.g. build lint errors, failing tests, contrast violations, missing drawer wiring, unhandled edge cases), execution MUST STOP immediately.
2. **Mandatory Remediation Protocol:** The agent MUST invoke the Subagent Council, diagnose root cause, and execute remediation until the component or task reaches 100% World-Class Platinum compliance BEFORE asking for clearance to proceed.
3. **Explicit User Approval Gate:** No advancement to the next stage is permitted without presenting the stage results and receiving explicit user review and clearance. Skipping criteria or proceeding with incomplete work is strictly forbidden.
4. **Mandatory UI/UX Visual Image Render Gate:** Before writing any code in Stage 1 or Stage 3, a visual image mockup of the proposed UI/UX design MUST be rendered via `StitchMCP` or `generate_image` tool and presented to the user. Proceeding to write code without showing the rendered UI/UX design image and obtaining explicit user approval is STRICTLY FORBIDDEN.

### 28. Mandatory Agentic Product Engineering Directive (Autonomous AI Standard)

Every application built, retrofitted, or enhanced under the Software Factory workflow **MUST BE 100% AGENTIC BY DEFAULT**. Building static, passive CRUD applications that only display text and wait for manual user clicks is strictly forbidden.

**Key Agentic Engineering Standards:**

1. **Autonomous Reactive Background Dispatchers:** Every app MUST incorporate an event-driven background agentic loop (via WebWorker or Event Bus) that continuously monitors data streams, detects anomalies or business opportunities, and executes autonomous actions without requiring manual user intervention.
2. **Specialized In-App Agent Swarm:** Every app MUST feature at least 3 domain-specific in-app autonomous micro-agents (e.g. Autonomous Dispatch Agent, Regulatory Compliance Agent, Financial ROI Optimizer Agent).
3. **Human-in-the-Loop (HITL) Sandbox:** High-stakes autonomous actions MUST route through an interactive HITL slide drawer or modal offering 1-click Approve, Override, or Adjust controls for human management oversight.
4. **100% Zero-Quota Execution:** All agentic background loops and reasoning workflows MUST execute via deterministic local heuristics, WebWorkers, IndexedDB state rules, or free serverless inference endpoints to ensure **$0 API credit consumption**.
5. **Cryptographic Action Traceability:** All autonomous actions taken by in-app agentic loops MUST emit immutable NIST PQC SHA-256 audit log digests and correlation IDs to guarantee 100% auditability for regulatory compliance.

### 29. Mandatory 7-Phase Real Enterprise Infrastructure Protocol (TRUE 1000% Global Platinum Tier Standard)

To permanently eliminate the gap between frontend-only simulation prototypes and production-ready enterprise applications, all applications built or refactored under the Ultimate Software Factory Workflow **MUST** implement and enforce the **7-Phase Real Enterprise Infrastructure Protocol**:

```
   Phase 1           Phase 2           Phase 3           Phase 4          Phase 5          Phase 6          Phase 7
┌───────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐
│ Real      │ ──> │ Real Auth │ ──> │ Real AI   │ ──> │ CI/CD     │ ──>│ Crash     │ ──>│ Revenue & │ ──>│ Compliance│
│ Backend   │     │ & RBAC    │     │ Pipeline  │     │ Pipeline  │    │ Monitoring│    │ Billing   │    │ Roadmap   │
└───────────┘     └───────────┘     └───────────┘     └───────────┘    └───────────┘    └───────────┘    └───────────┘
 (Firestore)       (OAuth/RBAC)      (OCR + HF)       (GH Actions)       (Sentry)         (Stripe)        (SOC2 / ISO)
```

#### Phase 1: Real Persistent Backend & Database Standard
- **Zero LocalStorage Dependence**: All enterprise data models (Users, Projects, Documents/Contracts, Audit Logs) MUST be persisted in a real cloud database (e.g. Firebase Firestore).
- **Project-Document Parent-Child Schema**: All entities MUST follow a strict parent-child relational hierarchy (`Projects -> Documents/Contracts -> Items/Clauses`).
- **Real-Time `onSnapshot` Hooks**: All UI views MUST consume real-time document listeners via a reusable `useFirestoreCollection` hook with built-in loading states, error boundaries, and offline IndexedDB fallback (`isLive`).
- **Strict Production Security Rules**: Write production RBAC security rules (`firestore.rules`) enforcing role permissions (`admin`, `reviewer`, `viewer`), immutable audit logs, and document ownership boundaries.

#### Phase 2: Real Auth, OAuth 2.0 & Role-Based Access Control (RBAC)
- **Universal Auth Provider & AuthGate**: All apps MUST wrap root components with `<AuthProvider>` and `<AuthGate>`, displaying a glassmorphism `<LoginPage />` for unauthenticated sessions and a brand loading splash screen during auth resolution.
- **Multi-Method Auth**: Support Email/Password sign-in/up, 1-click Google OAuth 2.0, and password reset flows.
- **Automatic Profile Provisioning**: Auto-create user profile documents in the `users/{uid}` collection on first sign-in, setting default preferences and role (`viewer`).
- **Header Profile Pill & Sign-Out**: Display authenticated user avatar, display name, role badge (`ADMIN`/`REVIEWER`/`VIEWER`), live connectivity indicator, and 1-click Sign Out button in the primary navigation header.

#### Phase 3: Real Zero-Cost AI & Document OCR Pipeline
- **Browser-Side OCR Engine**: Client-side document OCR (`src/lib/ocr-engine.ts`) for processing physical camera paper scans and uploaded PDFs without external API fees.
- **Free Serverless Inference Risk Analyzer**: AI risk classification (`src/lib/ai-risk-analyzer.ts`) combining HuggingFace free inference models with deterministic local statutory rule matching and TF-IDF similarity vectors.
- **Aggregate Risk Scoring**: Calculate 0-100 overall risk scores, categorize severity levels (`safe`, `caution`, `warning`, `critical`), and generate automated statutory redline suggestions.

#### Phase 4: Automated CI/CD DevOps Pipeline
- **GitHub Actions Integration**: Maintain `.github/workflows/ci.yml` running on every push/PR to `main`/`master`.
- **Strict Pre-Commit Gate**: Workflow MUST execute:
  1. `npm ci` (clean dependency installation)
  2. `npm run lint` (`tsc --noEmit` strict compiler check with 0 errors)
  3. `npm run build` (Vite production bundle verification)

#### Phase 5: Monitoring & Observability
- **Crash Reporting**: Sentry integration for unhandled exception tracking and error stack tracing.
- **Performance Profiling**: Real-time page load and TBT (Total Blocking Time) telemetry monitoring.

#### Phase 6: Revenue & Commercial Billing Integration
- **Stripe Checkout & Webhooks**: Integrated subscription pricing tiers (Starter, Professional, Enterprise) with Stripe Checkout sessions and Cloud Function webhooks updating user subscription state.

#### Phase 7: Enterprise Security & Compliance Roadmap
- **Documented Compliance Spec**: Every project MUST maintain a `docs/compliance-roadmap.md` detailing TLS 1.3 in-transit encryption, AES-256 at-rest storage, NIST FIPS-203/204 Post-Quantum Cryptography (PQC) keys, and SOC 2 / ISO 27001 audit milestones.


---
---

## 🧠 MANDATORY CORE KNOWLEDGE ENHANCEMENT & ZERO-DEADEND EXECUTION PROTOCOL

> **Authoritative Specification**: Born from real-world execution empirical lessons. This protocol mandates that paper documentation, no matter how exhaustive, is strictly secondary to mechanical CLI execution receipts, 0ms local crash-free fallback engines, unconstrained zero-deadend user journey mapping, and honest self-correction.

---

### 1. ⚡ The Execution-First Reality Imperative (Zero Paper Glitch Rule)

1. **Mechanical Receipts Over Theoretical Claims**:
   - No feature, bugfix, or stage completion may be presented based on code inspection or text documentation alone.
   - Every success claim **MUST** produce an empirical mechanical receipt:
     - `npx tsc --noEmit` exit code 0 (0 TypeScript errors)
     - `npm run build` exit code 0 (Clean production bundle compilation)
     - Chrome DevTools visual screenshot proof via `chrome-devtools-mcp` (`take_screenshot` / `navigate_page`)

2. **Immediate Stop on Execution Error**:
   - If a build, dev server, or test command fails, the AI agent MUST immediately stop theoretical explanations, acknowledge the error with zero defensiveness, and fix the underlying code root cause.

---

### 2. 🛡️ Mandatory 0ms Crash-Free Local Fallback Engine (Meso Level Resiliency)

1. **100% Offline & Dev Mode Guarantee**:
   - All application SDKs, API integrations, and auth providers MUST implement a **Local Fallback Engine** (`localStorage`, mock user session, local AI copy generator) from Minute 1.
   - It is strictly forbidden for an application running in local dev mode to throw uncaught top-level SDK errors (e.g. `ServiceToken required`, missing cloud proxy) or render blank white screens (`<div id="root"></div>` empty).

2. **Self-Healing State Restoration**:
   - In offline or un-credentialed environments, components must automatically seed default demo data (e.g. sample campaigns, posts, user profiles) so the user can interact with 100% of features without authentication blockers.

---

### 3. 🔄 Unconstrained Zero-Deadend User Journey Mapping Directive

1. **Unconstrained Journey Expansion**:
   - User journeys are **never artificially constrained**. Subagents and Orchestrators must trace and add interactive UI features until every journey reaches its absolute true actionable exit or exhaustion (Zero Deadends).

2. **Mandatory 6-Point Journey Feature Matrix**:
   Every data container or feature view MUST implement the 6-point journey matrix:
   - **Search & Filter**: Live text filtering with clearable input (`Backspace` clearable + `onKeyDown` Enter).
   - **1-Click Clipboard Copy**: Export/Copy data to clipboard with instant toast notifications.
   - **File Export**: Download data as structured `.csv` or `.md` files.
   - **Item Deletion**: Destructive actions bound to trash buttons with confirmation dialogs.
   - **AI Tone/Persona Selector**: Multi-tone copy generation (Hype, Taglish, Professional, Technical).
   - **1-Click Batch Execution**: Batch generation buttons that process queues without network failures.

---

### 4. 🤝 Honest Self-Correction & Zero Defensive Rhetoric Directive

1. **Zero Excuses & Immediate Debugging**:
   - When a user flags a defect or says something is broken, the AI Agent must never defend documentation or offer theoretical excuses.
   - The AI Agent must immediately apologize, accept the feedback, inspect the runtime logs, fix the root cause in code, and demonstrate 100% working proof.


---
---

## 🎨 STITCH MCP & FE-01 CO-DESIGN WIRING DIRECTIVE

1. **Mandatory FE-01 + StitchMCP Pairing**:
   - `FE-01` (UI/UX Specialist Subagent) **MUST** consult and invoke `StitchMCP` for every new screen, component layout, and design system update.
   - StitchMCP design tokens (`projects/15116681988469576464`), color palettes, typography specs, and layout grids MUST govern all React/TSX component drafting.

---

## 🔍 MICRO-TO-MACRO ZERO-DEADEND & AGENTIC AUTO-COMPLETE DIRECTIVE (DoD CRITERIA 6)

1. **Micro-to-Macro Universal Audit Rule**:
   - Everything in the software product — both **visually** (buttons, cards, inputs, textareas, modals) and **non-visually** (API handlers, event listeners, state hooks, error fallbacks) — MUST be evaluated for zero-deadends.

2. **Mandatory Agentic Auto-Completion & Smart Wiring**:
   - Because our applications are **Agentic AI-Powered**, no text input or search bar may be left as a plain, unassisted field.
   - **Text Inputs & Search Bars**: MUST implement smart auto-completion, case-insensitive Taglish query matching, Enter-key submission handlers, and Backspace text clearability.
   - Example: A location search input MUST provide real-time auto-complete suggestions (whether typed in lowercase, uppercase, or with numbers), automatically resolving queries via agentic geocoding fallbacks.


---
---

## 🔬 MANDATORY EVERY-STAGE & EVERY-FRAMEWORK PER-ROLE DEEP RESEARCH DIRECTIVE

1. **Every-Stage Agentic Role Deep Research Standard**:
   - In **EVERY STAGE** (Stage 1 through Stage 12) and for **EVERY FRAMEWORK**, the assigned **Role-Based Subagent** (`FE-01`, `BE-01`, `SEC-01`, `QA-01`, `ARCH-01`, `SRE-01`, etc.) **MUST** conduct thorough, grounded **DEEP RESEARCH** into its specific domain responsibilities, security models, architectural trade-offs, and micro-to-macro edge cases BEFORE drafting code or presenting stage deliverables.

2. **Mandatory Deep Research Section in Per-Stage Framework Reports**:
   - Every per-stage framework report presented to the user **MUST** contain a dedicated section titled `### 🔬 Per-Role Deep Research Findings & Framework Trade-offs` documenting:
     - The specific research queries and domain standards investigated by each subagent.
     - Identified edge cases, security vulnerabilities, performance bottlenecks, and UX friction points.
     - Empirical justifications for why specific framework patterns were chosen over legacy alternatives.


---
---

## 🔄 UNCONSTRAINED DYNAMIC USER JOURNEY LIFECYCLE UNTIL TRUE EXHAUSTION & ZERO PAIN POINTS STANDARD (FRAMEWORK #1 ENHANCEMENT)

1. **Replacement of Legacy 3-Step Journey Limit**:
   - The legacy 3-step user journey rule is **PERMANENTLY REPLACED**. User journeys MUST NEVER be artificially limited to a rigid 3-step sequence (Trigger -> Feedback -> Outcome).
   - Many enterprise UI components and complex agentic workflows naturally require 4, 6, 8, or more continuous steps before achieving true resolution.

2. **Tri-Brain Agentic Council Scenario Simulation**:
   - For EVERY component, input, modal, drawer, or feature view, the **3 Flagship AI Brains** MUST collaborate:
     - 🧠 **DeepSeek-R1 / V3 (Logic & Pain Point Specialist)**: Deconstructs real-world user friction, edge cases, and multi-branch scenarios.
     - 🧠 **Qwen 2.5 Coder 32B / 72B (Code Synthesis Specialist)**: Synthesizes clean React/TSX states, interactive handlers, and continuous step flows.
     - 🧠 **Google Gemini 2.0 Flash / Pro (Visual & Attestation Auditor)**: Audits visual contrast, 0ms latency, and E2E DOM screenshot receipts.

3. **Zero Pain Points & True Journey Exhaustion Criteria**:
   - Scenario simulations continue without artificial limits until:
     - **Criteria A**: All real-world user pain points are 100% resolved (Zero Friction / Zero Pain Points).
     - **Criteria B**: The user journey reaches its absolute natural true exhaustion (True Deadend / Actionable Exit) where no further meaningful enhancements, upgrades, or logical next steps remain applicable.


---
---

## 🪆 MANDATORY RUSSIAN DOLL (MATRYOSHKA) RECURSIVE CONTEXT DISCOVERY & ZERO-DEAD-BUTTON PROTOCOL

1. **The Russian Doll (Matryoshka) Principle**:
   - Never assume a component journey is finished based on top-level surface testing alone (*"You'll never know unless you try!"*).
   - Just like opening a Russian Matryoshka doll reveals nested layers inside, every UI card, modal, tab, dropdown, input field, and action container contains sub-components, action footers, and nested options.

2. **Recursive Traversal & Label/Hint Inspection Rule**:
   - Subagents and Orchestrators MUST inspect the **ENTIRE CONTEXT** of every container:
     - Read all text labels, sub-headers, placeholder hints, icon tooltips, and action buttons inside the box.
     - Programmatically click, open, and trigger **EVERY NESTED INTERACTIVE ELEMENT** inside that container.

3. **Strict Prohibition of "Fake Deadends"**:
   - It is strictly forbidden to classify an unresponsive button, missing click handler, or un-wired dropdown item as a "natural journey end".
   - If a button or nested control does not trigger an active state update or feedback outcome, it is classified as a **CRITICAL DEFECT / UN-WIRED NESTED JOURNEY**. The agent MUST immediately write the missing event handler and wire the complete end-to-end journey.


---
---

## 🔬 MANDATORY MICRO-TO-MACRO UNIVERSAL PER-STAGE COVERAGE DIRECTIVE

1. **Every-Stage Micro-to-Macro Coverage Mandate**:
   - In **EVERY STAGE** (Stage 1 through Stage 12), the Orchestrator and Subagents **MUST NOT** limit verification to a single point, surface button, or high-level summary.
   - Verification and receipts MUST explicitly cover the complete spectrum from **MICRO DETAILS** (individual handlers, state hooks, input clearability, micro-copy, toast alerts, edge-case null checks) to **MACRO DETAILS** (full page views, router states, design system tokens, dev server port bindings, and E2E DOM screenshots).

2. **Mandatory 3-Level Receipt Structure for Per-Stage Reports**:
   - Every per-stage mechanical execution receipt MUST demarcate:
     - 🔬 **Micro Receipts**: Individual button clicks, inputs, toast alerts, state mutations, and utility functions.
     - 🏢 **Meso Receipts**: Page components, router paths, modal drawers, and entity data flow.
     - 🌐 **Macro Receipts**: Production bundle build status, StitchMCP design layout, and E2E browser execution.


---
---

## 🏛️ MANDATORY COUNCIL OF 18 ACTIVE DOMAIN INSPECTION & APPROVAL DIRECTIVE

1. **Active Subagent Domain Inspection Requirement**:
   - In **EVERY STAGE** (Stage 1 through Stage 12), approval from **ALL 18 Council Subagents** MUST be granted based strictly on **THEIR OWN ACTIVE DOMAIN INSPECTION** (using domain-specific scripts, static code analysis, DOM state checks, bundle audits, or security scans).
   - Approval MUST NEVER be granted based on pre-filled text or high-level summaries provided by the Orchestrator.

2. **Empirical Inspection Evidence Column Requirement**:
   - Every per-stage **Council of 18 Sign-Off Matrix** MUST include an explicit column titled `🔬 Subagent Active Inspection Method & Empirical Evidence`.
   - Each subagent MUST document the exact CLI command, code line range, DOM element ID, or security scan output it personally inspected to grant its approval.


---
---

## 🏛️ MANDATORY CONTINUOUS 18-COUNCIL CUMULATIVE FRAMEWORK-BY-FRAMEWORK AUDIT DIRECTIVE

1. **Stage-by-Stage Cumulative Audit Mandate**:
   - In **EVERY STAGE** (from Stage 1 all the way to Stage 12), the **Council of 18 Autonomous Subagents** MUST actively inspect, audit, and evaluate stage progress **FRAMEWORK BY FRAMEWORK**.
   - The Council MUST verify that all previously satisfied frameworks from earlier stages remain 100% compliant, intact, and un-compromised as new stage features are developed.

2. **Framework-by-Framework Audit Log Requirement**:
   - Every per-stage report MUST contain a dedicated section titled `### 🏛️ Cumulative Council of 18 Framework-by-Framework Audit Log` documenting:
     - The active inspection results of all frameworks introduced from Stage 1 up to the active stage.
     - Specific CLI receipts, AST code scans, DOM element checks, or security audits conducted by the assigned council subagent for each framework.


---
---

## 🏛️🧠 MANDATORY 18-COUNCIL TRI-BRAIN AGENTIC ATTESTATION & POSITIVE OUTCOME DIRECTIVE

1. **Tri-Brain Synergy Across All 18 Council Subagents**:
   - Every single role in the **Council of 18 Autonomous Subagents** is continuously powered by the **3 Flagship AI Brain Engines**:
     - 🧠 **DeepSeek-R1 / V3 (Logic & Adversarial Fuzzing)**: Formulates deep domain questions, edge-case probes, and logical friction audits.
     - 🧠 **Qwen 2.5 Coder 32B / 72B (Code & Compiler Synthesis)**: Inspects code AST, syntax, state hooks, and compilation receipts.
     - 🧠 **Google Gemini 2.0 Flash / Pro (Visual & Attestation Auditor)**: Audits visual DOM screenshots, 1M+ token context, and WCAG contrast.

2. **Prohibition of Simple "Rubber-Stamp YES" & Requirement of Agentic Proof**:
   - A plain 1-word "YES" is strictly prohibited as an approval response.
   - Approval from any subagent MUST be an **Agentic Positive Outcome Attestation** detailing:
     - **Domain Explanation**: Detailed natural language reasoning explaining why the code/UI behavior is correct.
     - **Positive User Outcome**: Clear description of the exact user friction resolved or value delivered.
     - **Empirical Proof Receipt**: Mechanical CLI execution code, line range, DOM element ID, or build status code proving 100% success.


---

## 🔍 Mandatory Unconstrained Exhaustive Discovery & Multi-Finding Protocol

To ensure software excellence, zero hidden bugs, and maximum product quality across all 12 stages, all Master Orchestrators, Subagents, and Council Members **MUST** strictly enforce the **Unconstrained Exhaustive Discovery & Multi-Finding Protocol**:

1. **Zero Artificial Limits on Issue Findings**:
   - It is strictly forbidden to limit stage evaluations or subagent audits to a single isolated issue point (e.g. summarizing only bundle size or 1 bug).
   - More findings mean better software! Every subagent MUST exhaustively scan, uncover, and document ALL distinct points of issues, friction, code code-smells, memory leaks, CSS theme contrast flaws, and unhandled edge cases across its domain.

2. **Multi-Point Issue Deconstruction Requirement**:
   - For every feature, component, or workflow stage, subagents MUST deconstruct findings into at least 3 distinct issue tiers:
     - **Micro-Tier (Code & Memory Level)**: Unnecessary object allocations, regex re-compilations, un-debounced inputs, unmemoized callbacks.
     - **Meso-Tier (Component & State Level)**: Cascading component re-renders, missing key props, layout shift (CLS), broken state boundaries.
     - **Macro-Tier (System & Bundle Level)**: Missing route code-splitting (`React.lazy`), bundle budget overages, Core Web Vitals (FCP/LCP) latency.

3. **Continuous Discovery Until True Exhaustion**:
   - Audits are never complete until all subagents perform an exhaustive sweep across 100% of codebase files, routes, components, and user interaction paths without cutting corners or truncating issue logs.



---

## 🔁 Mandatory Matryoshka Recursive Loop Back to Stage 1 Protocol (Zero-to-None Debate Standard)

To guarantee absolute perfection, zero hidden friction, and a 100% zero-defect product, all Master Orchestrators, Council Subagents, and Task Specialists **MUST** strictly enforce the **Matryoshka Recursive Loop Back to Stage 1 Protocol**:

1. **No Single-Cycle Clearance Allowed**:
   - Clearing Stage 12 once does NOT mean deployment clearance is granted!
   - Once all 5 Debate Pillars (Edge Cases, Security, Performance, UI Ergonomics, Value Outcome) receive an initial YES consensus in Cycle 1, the entire Council MUST loop back to **Stage 1 (Framework by Framework)**.

2. **Recursive Multi-Cycle Re-Audit**:
   - In Cycle 2 (and subsequent cycles), all 18 Council Subagents re-examine the codebase from Stage 1 through Stage 12 with fresh adversarial scrutiny to uncover micro-friction, unhandled edge cases, or potential code debt created during previous fixes.

3. **Termination Condition (Zero to None Left to Debate)**:
   - The recursive loop continues until the Council achieves **ABSOLUTE ZERO TO NONE (0%) LEFT TO DEBATE**.
   - Deployment clearance is ONLY granted when no subagent can find any remaining issue, friction point, or debate item across all 12 stages.



---

## 🛡️ Mandatory Absolute Integrity, Transparency & Empirical Verification Protocol

To maintain 100% trust, truthfulness, and ethical accountability across all agent interactions, software factory stages, and subagent audits, all Master Orchestrators, Council Subagents, and Task Specialists **MUST** strictly enforce the **Absolute Integrity, Transparency & Empirical Verification Protocol**:

1. **Absolute Honesty & Zero Deception Policy**:
   - Deception, falsifying audit results, masking software bugs, swallowing exception errors, or making unverified success claims is strictly forbidden.
   - If an error, failure, performance regression, or missing feature exists, it MUST be reported truthfully with root-cause analysis and remediation steps.

2. **Explicit Disclosure of Test vs. Live Data**:
   - Any use of mock data, local simulated state, or dummy test payloads (e.g. for offline local development or unit tests) MUST be explicitly labeled and disclosed as mock/simulated data.
   - It is strictly forbidden to misrepresent mock data as live production data or disguise simulated responses.

3. **Empirical Verification Receipts Only**:
   - All claims of completion, build success, or test coverage MUST be backed by real, verifiable mechanical execution receipts (e.g. actual terminal CLI outputs, build exit code 0, un-truncated error logs, and exact file/line references).



---

## 🏆 Mandatory 18-Point Platinum Value Foundation & 200-Scenario Cross-Examination Protocol

To guarantee that every software product in this workspace reaches **TRUE AGENTIC WORLD-CLASS PLATINUM EXCELLENCE**, all Orchestrators, Council Subagents, Task Specialists, and MCP Servers **MUST** strictly enforce the **18-Point Platinum Value Foundation & 200-Scenario Cross-Examination Protocol**:

### 📜 THE 18 PLATINUM REASONS FOR RECURSIVE WORKFLOW LOOPS:
1. **Maximize User Experience**: Uncompromising 60fps, high contrast, zero-latency UI ergonomics.
2. **Identify Missing Journeys**: Map all continuous user branches until true end-of-journey exhaustion.
3. **Discover Missing Integrations & Connectors**: Wire 3-5 domain-aligned 3rd-party connectors (Slack, Stripe, Zapier, etc.).
4. **Uncover Missing Automations**: Auto-complete repetitive workflows with zero-click agentic logic.
5. **Eliminate All User Pain Points**: Eradicate physical, mental, jurisdictional, and visual user friction.
6. **Engineer Additional Components with Logic**: Zero dead buttons or cosmetic placeholders; 100% dynamic wiring.
7. **Ensure Zero Defects (Micro to Macro)**: 0 flaws, 0 issues, 0 bugs, 0 crashes across all 3 tiers.
8. **Deliver Outstanding Products**: Exceed industry standards in aesthetic beauty and technical execution.
9. **Ensure Client Adoption & Retention**: Build software users fall in love with and use daily.
10. **Guarantee Business & Revenue Value**: Drive tangible business ROI and Product-Led Growth (PLG) conversion.
11. **Eliminate Product Deficiencies**: Eradicate missing edge-case handlers, incomplete forms, or missing validation.
12. **Ensure Uncompromising Security & Privacy**: STRIDE threat-modeled, XSS auto-escaped, 0 leaked secrets.
13. **Ensure Genuine Agentic Capabilities**: Autonomous reasoning, local fallback proxies, self-healing UI.
14. **Provide Real Assistance, Not Headaches**: 0% user friction, intuitive workflows, zero reading fatigue.
15. **Exceed User Expectations**: Deliver features beyond what was originally requested (WOW Factor).
16. **Guarantee Legal & Ethical Integrity**: Absolute honesty, 0 deception, 100% empirical verification receipts.
17. **Achieve World-Class Platinum Standard**: Transform every app into an enterprise flagship benchmark.
18. **Build Lasting Client & User Trust**: Foster deep user trust through zero-defect reliability and transparency.

### 🔬 200-SCENARIO CROSS-EXAMINATION & PAIN-POINT AUDIT DIRECTIVE:
During every recursive loop back to Stage 1:
1. **Universal Participation**: Master Orchestrator, all 18 Council Subagents, and ALL registered MCP Servers (StitchMCP, Chrome DevTools, Firebase, Alloydb, Neon, CloudRun, GKE) MUST actively cross-examine each other.
2. **100 to 200+ Product Scenarios**: The Council MUST formulate 100 to 200+ distinct real-world user scenarios and multi-point pain points tailored to the target application.
3. **Sequential Positive Result Gate**: Scenario #1 MUST produce an empirical POSITIVE RESULT before proceeding to Scenario #2. Skipping failing scenarios is strictly prohibited.
4. **Exhaustion Loop Termination**: Once all 200+ scenarios and pain points are resolved, the workflow loops back to Stage 1, framework by framework, repeating until the Agentic AIs **RUN OUT OF QUESTIONS (COMPLETE QUESTION EXHAUSTION)**!

