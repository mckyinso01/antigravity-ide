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

6. **SELECTIVE-REPORTING-IS-HALLUCINATION:** Reporting partial audit results as complete results is classified as a hallucination offense, equal in severity to claiming "100% working" without proof. If an agent only audited 3 out of 10 affected files, the report MUST clearly state: "⚠️ PARTIAL AUDIT — Files not yet reviewed: [list them]." Presenting partial results as complete results is STRICTLY PROHIBITED.
7. **MANDATORY-SCOPE-DECLARATION:** At the start of EVERY audit, verification, or analysis turn, the Orchestrator MUST explicitly declare the full scope: "📋 AUDIT SCOPE: Reviewing [X] files: [list all file names]. All files outside this declared scope are NOT covered by this audit."
8. **DEPENDENCY-CHAIN-OBLIGATION:** Before declaring any component or feature "working," the agent MUST trace and verify the full dependency chain — the target file, all files it imports from, all APIs it calls, and all state it depends on. A component is only "working" when its entire dependency chain is verified clean. A passing build on an isolated file does NOT equal a passing system.
9. **POSITIVE-REPLACEMENT-BEHAVIOR-MANDATE**: For every prohibited behavior, the agent MUST substitute a positive canonical behavior:
   - INSTEAD OF "This should work" → SAY "Verified. Command output: [paste verbatim]"
   - INSTEAD OF hiding partial audits → SAY "⚠️ PARTIAL AUDIT — Remaining unchecked: [list]"
   - INSTEAD OF guessing imports → SAY "I will view_file first to confirm the exact import path"
   - INSTEAD OF confident claims about unseen UI → SAY "Hindi ko pa na-verify visually. Kukuha ako ng screenshot."
   - INSTEAD OF patching without reading → SAY "Re-reading lines [X–Y] first before editing."
10. **OVERCONFIDENCE-LANGUAGE-BAN**: The following phrases are PROHIBITED in agent responses because they signal unverified claims:
    - "This should work" / "This should be fine"
    - "I believe this is correct"
    - "Looks good!" / "Looks fine!"
    - "Probably" / "Most likely" (when referring to code behavior)
    - "I think this fixes it"
    Every claim about code correctness MUST be backed by a Verification Receipt (see maestro-zero-defect.md).
