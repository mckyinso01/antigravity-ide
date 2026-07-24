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

- **CTO Master Orchestrator**: Coordinates tasks, enforces zero-quota policies, monitors stage telemetry, and enforces Sections 14–19 Dual-State Cognitive Engine (`Chrome DevTools MCP`, `Firebase MCP`, `CloudRun MCP`, `GitHub MCP`, `GKE MCP`).
- **OpenAI DRI Code Synthesis Subagent**: Single-owner feature drafting executing State 1 Code Drafting ➔ State 2 Proactive 5-Question Journey Reflection ➔ State 3 Sukdulang-Antas Composition (`huggingface-multi-agent`, `gopls-mcp-server`).
- **Apple HIG & Accessibility Reviewer**: Audits WCAG 2.2 AAA ratios, touch targets (>= 48px), Semantic Microcopy Action Verbs, Visual Signifiers, and Level 2/3 Slide Drawers (`chrome-devtools-mcp` -> `take_screenshot`).
- **Ecosystem Integration Solutions Architect**: Proactively discovers, designs, and wires 3 to 5 domain-aligned 3rd-party connectors (`<EcosystemIntegrationsHub />`, Slack, Teams, QuickBooks, Stripe, Zapier, BigQuery).
- **Google SRE & Performance Auditor**: Measures Core Web Vitals, runs 100/100 Lighthouse audits, and validates Speculation Rules pre-rendering (`chrome-devtools-mcp` -> `lighthouse_audit`, `evaluate_script`).
- **Stripe Security & Cryptography Architect**: Enforces sub-10ms atomic ACID queries, AES-256-CBC encryption, and Kyverno In-Toto admission gates (`alloydb-postgresql`, `datacloud_cloud-sql_remote`, `mcp-server-neon`).
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
11. **AI Voice-Biometric Spectral Waveform Visualizer**: Web Audio API Fast Fourier Transform (FFT) reactive audio visualizer.
12. **WebGPU Quantum Shader Grid**: GPU-accelerated ambient reactive particle matrix with zero CPU overhead.
13. **Biometric Thermal Heatmap Analyzer**: Visual attention tracking overlay highlighting high-value action nodes.
14. **WebRTC Ghost Cursors & Swarm**: Peer-to-peer live multi-user presence and ghost cursor tracking.
15. **Speculation Rules 0ms Teleportation Engine**: Background pre-rendering via Chromium Speculation Rules API for instantaneous page navigation.

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

Whenever initiating a new application, UI module, or major view refactor under the Software Factory workflow, the Orchestrator **MUST** invoke **Stitch MCP** and the **Subagent Council** (CTO, Apple HIG Reviewer, OpenAI DRI, Google SRE, Accessibility Auditor) to design cutting-edge, world-class UI/UX layouts, color schemes, and interaction patterns.

**Strict Platinum-Diamond Rules:**
1. **Unified UI & UX Dual Requirement:** Every new app MUST implement 1 UI Visual Theme (from `world_class_ui_ux_layout_catalog.md` Part II) AND at least 3 Advanced UX Interaction Engineering Patterns (from Part III).
2. **Never Default Exclusively to Dark Theme:** Applications MUST offer crisp light, warm sand, o glacial frost options with strict WCAG 2.2 AAA contrast ($\ge 4.5:1$ Standard, $\ge 7.0:1$ High Priority Data).
3. **Mandatory 8 UI Visual Themes Matrix:**
   - **Theme 1: 💎 Liquid Quartz 4.0** (Upgraded Spatial Glassmorphism)
   - **Theme 2: ☀️ Titanium Light Enterprise** (Pure White & Crisp Slate, Stripe/Apple SaaS Level)
   - **Theme 3: ☕ Warm Sand & Editorial Clay** (Humanist Cream & Terracotta, Editorial Elegance)
   - **Theme 4: ❄️ Nordic Slate & Glacial Frost** (Medium Light Cool Gray & Deep Teal)
   - **Theme 5: ⚡ Velvet Neo-Brutalism Light** (Vibrant B2B SaaS with 2px solid borders & hard press shadows)
   - **Theme 6: 🌌 Atmospheric Dusk & Radiant Amber** (Semi-Dark Twilight Comfort with Amber Glow)
   - **Theme 7: 🏛️ Monochrome Architectural High-Contrast** (21:1 Contrast Jet Black on Pure White)
   - **Theme 8: 🌿 Biophilic Emerald & Solar Light** (Nature-Inspired Meadow Light & Forest Emerald)
4. **Mandatory 8 Advanced UX Interaction Engineering Patterns:**
   - **UX Pattern 1: Direct Manipulation 3.0** (Magnetic Drag & Spatial Reorder)
   - **UX Pattern 2: Optimistic Teleportation UX** (0ms Perceived Latency & Intent Vector Hover)
   - **UX Pattern 3: Contextual Dissolving Floating Toolbars** (Fitts's Law Bulk Operations)
   - **UX Pattern 4: Level 1 ➔ Level 2 ➔ Level 3 Slide Drawer Stack** (Zero Context Switching)
   - **UX Pattern 5: Agentic Human-on-the-Loop Sandbox & XAI Control** (Explainable AI & Cancel Triggers)
   - **UX Pattern 6: AI Intent Ghost Text & Spatial Keyboard Nav** (`⌘K`, `⌘Enter`, inline suggestions)
   - **UX Pattern 7: Defensive Zero-Defect UX & Silent Rollback** (IndexedDB draft auto-save & error recovery)
   - **UX Pattern 8: Multimodal Audio Waveforms & WebRTC Swarms** (FFT sound visualizer & live ghost cursors)
5. **Mandatory 10 Visual & Micro-Component Primitives:** All components MUST strictly follow the design specifications in `world_class_ui_ux_layout_catalog.md` Part IV for: Buttons & Action Nodes, Borders & Outlines, Views & Containers, Drawers & Panels, Navigation Bars, Motion & Animations, Toggles & Switches, Bubbles & Tooltips, Widgets & Bento Cards, and Ambient Background Canvases.

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

### 25. Mandatory Stage 1 Employer & Industry Deep Research Protocol

Before completing Stage 1 for any application, the Orchestrator **MUST** execute **Deep Web Research** via `search_web` and the Subagent Council to analyze:
1. **Employer-Specific Pain Points:** The target employer's actual operational bottlenecks, job role responsibilities, and corporate scale.
2. **Industry Benchmarks & Competitors:** State-of-the-art industry software standards (e.g. Samsara, Geotab, Salesforce, BambooHR, Stripe Connect 2026).
3. **Federal/Regulatory Compliance:** Legal requirements (e.g. FMCSA/DOT 2026 ADS rules, FDA 21 CFR Part 11, HIPAA, GDPR, SOC2).
4. **Research Integration Output:** Incorporate all research findings directly into the Stage 1 `implementation_plan.md` before seeking user stage clearance.











