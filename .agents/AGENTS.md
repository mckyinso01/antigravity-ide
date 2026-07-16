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

