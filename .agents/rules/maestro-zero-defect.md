---
trigger: always_on
---

## MANDATORY PREPARATION

Invoke `/agent-workflow` before proceeding to verify workflow principles, anti-patterns, and the Context Gathering Protocol.

---

## The 9 Execution Precision Rules

Follow these for every session and interaction:

| # | Rule | Why |
| --- | --- | --- |
| 1 | **Read before writing** — Re-read code/context before modification | Prevents edits based on stale mental models |
| 2 | **Verify before claiming** — Run CLI build/test verification before success claims | Prevents false completion reports |
| 3 | **One logical change at a time** — Avoid sprawling multi-file edits | Reduces cascading failures |
| 4 | **State uncertainty explicitly** — Say "I'm not sure about X" instead of guessing | Prevents confident hallucination |
| 5 | **Check every import and reference** — Verify functions, variables, modules exist | Prevents "symbol not found" errors |
| 6 | **Dry-run mentally before committing** — Trace happy path and edge cases | Catches logic errors before shipping |
| 7 | **Never hallucinate APIs** — Only use parameters that exist in codebase/docs | Prevents non-existent API calls |
| 8 | **Re-derive, don't recall** — Work out math/logic fresh instead of from memory | Prevents wrong recalled answers |
| 9 | **Verify file existence before editing** — `view_file` target lines first to confirm exact match | Prevents failed replace chunks |

---

## Pre-Commit Checklist Gate

Before claiming ANY work is complete, verify:
- [ ] Code compiles / lints clean (`tsc --noEmit` or `npm run build`)
- [ ] Automated tests pass (`npm test`)
- [ ] Imports/dependencies verified to exist
- [ ] Edge cases handled (null, empty, boundary, error states)
- [ ] Error handling present for external/network calls
- [ ] Output displayed as raw CLI terminal receipt

---

## 🧾 Mandatory Verification Receipt Format Standard

**RULE: VALID-RECEIPT-FORMAT** — A valid verification receipt MUST contain ALL of the following fields in this exact format:

✅ VERIFICATION RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMAND   : [the exact command that was run, copy-paste ready]
EXIT CODE : [0 = PASS / non-zero = FAIL — show the actual number]
TIMESTAMP : [ISO8601 timestamp — e.g., 2026-08-13T15:32:00Z]
SCOPE     : [list the files or components verified]
OUTPUT    :
[verbatim raw output — no paraphrasing, no summarizing, no trimming of errors]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**RULE: INVALID-RECEIPT-PROHIBITION** — The following are explicitly PROHIBITED as receipts:
- Saying "the build succeeded" without showing the command and full output
- Paraphrasing or summarizing the output instead of showing it verbatim
- Showing only the success line while hiding warnings or errors above it
- Claiming a receipt was generated without displaying it in the response
- Showing a receipt from a PREVIOUS session and presenting it as current

**RULE: INVALID-RECEIPT-CONSEQUENCE** — Any completion claim made WITHOUT a valid receipt is automatically INVALID. The user must be notified: "⚠️ UNVERIFIED CLAIM — No valid receipt was produced. Task status: NOT COMPLETE."

---

## Anti-Pattern Quick-Reference

| Sloppy Pattern | Correct Protocol |
| --- | --- |
| "This should work" without testing | Run test, paste exact output |
| Editing code without re-reading file first | View target lines, then edit |
| Making 5+ file changes in one turn | Limit to max 3 verified changes |
| Saying "Done!" before verification | Run build/test command first |
