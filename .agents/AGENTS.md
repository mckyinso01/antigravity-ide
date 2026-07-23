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
