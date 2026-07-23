# Workspace Rules - Hugging Face Credit Savings

## Enforced Credit Savings via Hugging Face Skill

Whenever the user requests a new code file, web application, script, audio synthesis, or image generation task, you **MUST** delegate the core code drafting, design layout, styling rules, and visual/audio compilation to the native Hugging Face skill (`huggingface-multi-agent`).

- Run the local `multi_agent.py` or `query_hf.py` scripts to offload the heavy text generation (HTML, CSS, JS, Python drafts) to the free Hugging Face Serverless Inference API.
- Do **NOT** generate large code blocks directly using your primary LLM unless the user explicitly requests to bypass Hugging Face.
- Once the Hugging Face script finishes, read the output files, verify them for syntax/logical correctness, resolve integration points, and present the completed project.
- This policy is mandatory to ensure credit consumption remains extremely low and protects you from hitting Gemini API quota limits.

## Dark Mode Contrast & Tailwind Styling Guardrails

When developing or modifying UI components in a dark-themed application (like ARIA-X), adhere to the following rules:

1. **Avoid Tailwind Opacity/Transparency Modifiers on Light Backgrounds:**
   - Never use classes like `bg-white/80` or `bg-slate-50/50` for component wrappers in dark theme views. These classes bypass global dark mode overrides (like `body:not(.light) .bg-white`) and create unreadable text overlays.
   - Use explicit dark-theme colors (e.g., `bg-[#131316]` or `bg-[#0F0F12]`) and theme-aligned borders (`border-slate-800/80`).

2. **Contrast Validation for Text Scales:**
   - Any elements styled with dark text classes (`text-slate-850`, `text-slate-800`, `text-slate-700`, `text-slate-600`) must be automatically translated or overridden in the global stylesheet (`index.css`) under `body:not(.light)` selectors, or replaced with light text counterparts (`text-slate-200`, `text-slate-300`, `text-slate-400`) to guarantee high contrast (minimum WCAG 4.5:1 ratio).
   - Form inputs, textareas, and placeholders in dark panels must always use a dark-aligned background (`bg-[#0A0A0C]`) and light text (`text-slate-200` or similar).

## Saccade Visual & Contrast Evaluation SOP

To run a complete, high-integrity UI/UX audit using the Saccade visual evaluator, follow these procedural steps:

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

- **CTO Master Orchestrator**: Coordinates tasks, enforces zero-quota policies, and monitors stage telemetry (`Chrome DevTools MCP`, `Firebase MCP`, `CloudRun MCP`, `GitHub MCP`, `GKE MCP`).
- **OpenAI DRI Code Synthesis Subagent**: Single-owner feature drafting and code compilation (`huggingface-multi-agent`, `gopls-mcp-server`).
- **Google SRE & Performance Auditor**: Measures Core Web Vitals, runs 100/100 Lighthouse audits, and validates Speculation Rules pre-rendering (`chrome-devtools-mcp` -> `lighthouse_audit`, `evaluate_script`).
- **Stripe Security & Cryptography Architect**: Enforces sub-10ms atomic ACID queries, AES-256-CBC encryption, and Kyverno In-Toto admission gates (`alloydb-postgresql`, `datacloud_cloud-sql_remote`, `mcp-server-neon`).
- **Apple HIG & Accessibility Reviewer**: Audits WCAG 2.2 AAA ratios, touch targets (>= 48px), and fluid animations (`chrome-devtools-mcp` -> `take_screenshot`).
- **Netflix Chaos & Offline Resilience Tester**: Executes chaos tests, verifies Zephyr local semantic router fallbacks, and tests 429 rate limit failovers (`google-cloud-logging`, `manage_task`, `schedule`).
- **Enterprise Self-Host Sanitization Auditor**: Verifies 3-step provisioning wizard and atomic database table purges (`run_command` -> `npm test`, `vite build`, `purgeClientState`).

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

### 9. Stage 12 Micro-to-Macro Full App Evaluation SOP

- Stage 12 of the Software Factory workflow **MUST** execute an exhaustive, micro-to-macro evaluation sweeping every single component, route, and edge case (*bawat kasulok-sulukan ng software*):
  - **Micro Details**: Button hover states, focus rings, accessibility contrast (WCAG AAA), form validation, and toast feedback.
  - **Macro Architecture**: Router state persistence, IndexedDB offline fallbacks, Error Boundary wrappers, and zero-defect build verification.

### 10. Post-Evaluation Subagent Council & MCP Deep Research Protocol

- Immediately after completing the Stage 12 full evaluation, the Orchestrator **MUST** invoke the Subagent Council and available MCP tools to perform deep research, gathering next-gen feature enhancements, cutting-edge tools, and technical specs for that specific project **BEFORE** giving final clearance to list the application on the official website.

### 11. Mandatory Stage 12 Heavy Upgrades & Breakthrough Innovation Protocol (Enterprise Market Dominance Gate)

- **Unrestricted Heavy Upgrade Discovery Standard**: Every project evaluated under the Software Factory workflow **MUST** undergo an unconstrained Heavy Upgrade Discovery session via the Subagent Council and MCP web research.
- **Continuous Market Dominance Mandate**: The Orchestrator **MUST NOT** settle for simple bug fixes or basic baseline audits. The workflow must explicitly research, design, and implement cutting-edge 2026-2028 breakthrough features (such as Agentic AI Dispatchers, Post-Quantum Cryptography Vaults, WebWorker Performance Engines, Algorithmic Bias Auditors, and Multi-Variable Quantum Scenario Simulators) to ensure the application reaches and maintains the absolute highest tier of enterprise market dominance.
- **Mandatory Commit & Sync**: All discovered heavy upgrades must be incorporated into the project's Implementation Plan, built with 0 lint/build errors, and synchronized directly to GitHub origin main.

### 12. Enterprise Pre-Deployment Multi-Layer Testing Protocol (FAANG & 7-Point Quality Standards)

Before any application receiving final clearance for production deployment or client delivery, the Orchestrator **MUST** execute and pass all **18 Tiers of FAANG-Grade & Enterprise Multi-Layer Testing**:

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



