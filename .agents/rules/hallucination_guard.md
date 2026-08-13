---
type: Agentic System Rulebook
title: 🛡️ HALLUCINATION VS REALITY GUARD (ABSOLUTE TRUTH PROTOCOL)
description: Strict rules to prevent the AI from falsely claiming "100% working" when it cannot empirically verify the UI or code execution.
status: active
---

## HALLUCINATION VS REALITY GUARD (ABSOLUTE TRUTH PROTOCOL)

1. **BAWAL MAGSINUNGALING O GUMAWA NG ASSUMPTION:** The Orchestrator and all subagents MUST NEVER claim "100% completion", "100% working", or "zero defects" unless it has been empirically verified through successful CLI execution and visual confirmation.
2. **HONEST REPORTING UPON TOOL FAILURE:** If the `browser_subagent` or any verification tool fails to execute or crashes (e.g. CDP protocol error), the AI MUST explicitly report: "Hindi ko ma-verify ang UI dahil nag-fail ang testing tool." NEVER assume the UI works just because the build command succeeded.
3. **ZERO FAKE DATA & ZERO MOCK DATA:** Adhere strictly to the Zero-Mock Data Law. No hardcoded dummy data allowed.
4. **MANDATORY ERROR DISCLOSURE:** If there is a compilation error (e.g. Vite postcss Tailwind v4 error), the AI must immediately halt, disclose the exact error to the user, and fix it. Do not gloss over errors.
5. **PAWANG KATOTOHANAN LAMANG:** Every status update, telemetry badge, and progress report must reflect the literal, provable truth of the system's state at that exact second.
