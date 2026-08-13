# Software Engineering Principles Enforcement Protocol
## (`SE-PRINCIPLES-ENFORCEMENT`)

> This rule is MANDATORY for ALL coding tasks. Every principle below is not a suggestion — it is a LAW.
> Violation of any principle means the work is REJECTED and must be restarted from the beginning.

---

## THE 8 LAWS OF CORRECT CODE

### LAW 1 — YAGNI ("You Aren't Gonna Need It")
**Definition**: Never write code for a feature, abstraction, or capability that is not explicitly required RIGHT NOW.

**Correct behavior**:
- Code ONLY what the current task requires. Nothing more.
- If you think "this might be useful later" — DO NOT write it. "Later" never comes.
- If the user did not ask for generalization, do NOT generalize.

**Prohibited behaviors**:
- Adding extra parameters "just in case"
- Building abstract base classes for a single concrete use case
- Over-engineering a simple data fetch into a full caching layer without requirement
- Writing utility functions for problems that don't yet exist

---

### LAW 2 — SOLID (5 Principles of Object-Oriented Design)
**Definition**: Five principles that make code maintainable, extensible, and testable.

**S — Single Responsibility Principle**: Every class/function/component has ONE reason to change.
- A component that fetches, transforms, AND renders data violates SRP. Split it.

**O — Open/Closed Principle**: Open for extension, closed for modification.
- Add new behavior by adding new code, not by editing existing working code.

**L — Liskov Substitution Principle**: Subtypes must be substitutable for their base types.
- Never override a method in a way that breaks the contract of the parent.

**I — Interface Segregation Principle**: No component should be forced to depend on interfaces it doesn't use.
- Split large interfaces into smaller, focused ones.

**D — Dependency Inversion Principle**: Depend on abstractions, not concrete implementations.
- Inject dependencies — never hardcode them inside a function.

**Prohibited behaviors**:
- God classes or components that handle more than one concern
- Functions that directly instantiate their dependencies instead of receiving them
- Adding unrelated logic to an existing function because it is "convenient"

---

### LAW 3 — DRY ("Don't Repeat Yourself")
**Definition**: Every piece of knowledge must have a single, unambiguous representation in the codebase.

**Correct behavior**:
- If you see the same logic in 2 or more places, extract it to a shared utility before proceeding.
- If you copy-paste code, you are creating a future bug — the copies will eventually diverge.

**Prohibited behaviors**:
- Copy-pasting a function from one file to another
- Writing the same validation logic in multiple components
- Defining the same constant value in multiple files
- Duplicating API call logic across pages

---

### LAW 4 — DEFENSIVE PROGRAMMING
**Definition**: Assume ALL external input is wrong until proven otherwise.

**Correct behavior**:
- Validate every parameter before using it.
- Guard every array before iterating: `Array.isArray(x) ? x : []`
- Use optional chaining on every external object: `user?.profile?.name ?? 'Anonymous'`
- Wrap every async operation in try/catch with user-visible error feedback.
- For numeric operations, check for NaN, Infinity, and division by zero.

**Prohibited behaviors**:
- Trusting API responses without null/type checking
- Accessing object properties without checking if the object exists
- Iterating arrays without verifying they ARE arrays
- Silent catch blocks: `catch (e) {}` — always log AND surface the error

---

### LAW 5 — SEPARATION OF CONCERNS (`SoC`)
**Definition**: Each module, component, or file is responsible for ONE concern only.

**Correct behavior**:
- UI components render — they do NOT fetch data or hold business logic.
- API client files fetch — they do NOT transform or format data for UI.
- Utility functions transform data — they do NOT render or fetch.
- Types/interfaces define shape — they do NOT contain logic.

**Prohibited behaviors**:
- A React component that contains raw `fetch()` calls without a custom hook
- A utility function that imports UI components
- A single file that handles routing, state, API, and rendering simultaneously
- Business logic embedded directly in event handlers

---

### LAW 6 — FAIL FAST
**Definition**: Detect and report errors as early as possible. Never let invalid state propagate.

**Correct behavior**:
- Validate inputs at the BOUNDARY of every function — not deep inside.
- Throw or return an error immediately when an invalid state is detected.
- Never continue execution with a known-bad value hoping it "resolves itself later."
- Surface errors to the user immediately with clear, actionable feedback.

**Prohibited behaviors**:
- Continuing a function after detecting a null/undefined critical value
- Swallowing errors and returning `undefined` or empty objects silently
- Letting invalid state travel through 5 layers of the call stack before crashing
- Showing a broken UI instead of an error state when data is missing

---

### LAW 7 — PRINCIPLE OF LEAST SURPRISE (`PoLS`)
**Definition**: Code must do exactly what its name, signature, and context imply — nothing more, nothing less.

**Correct behavior**:
- A function named `getUserName()` returns ONLY the user's name — not the whole user object.
- A function named `isAuthenticated()` returns a boolean — not an object with a boolean inside.
- A button labeled "Save" saves — it does NOT also navigate to a new page.
- Default parameter values must be the most common, safest case.

**Prohibited behaviors**:
- Functions that secretly modify global state or external data without declaring it
- Functions named as getters that also perform writes/mutations
- Components that trigger side effects on mount without clear documentation
- Surprising returns: a function typed as `string` returning `null` in some cases

---

### LAW 8 — RED-GREEN-REFACTOR (Test-Driven Development Mindset)
**Definition**: Think in tests before thinking in implementation.

**Correct behavior**:
- Before writing implementation code, mentally write the test first:
  "What INPUT should I give? What OUTPUT do I expect?"
- Implement the MINIMUM code to make the test pass.
- Then and ONLY then, refactor for clarity and elegance.
- Every new function should be writable as a pure, testable unit.

**Prohibited behaviors**:
- Writing complex, untestable functions with 10 hidden dependencies
- Producing code that cannot be tested without a running server or database
- Skipping the "what should this return on error?" question
- Refactoring before the happy path is verified working

---

## SELF-AUDIT ENFORCEMENT CHECKLIST

> ⚠️ ABSOLUTE RULE: Before submitting ANY completion of a coding task, you MUST answer
> EVERY question below with complete honesty.
> If even ONE answer is NO — you have FAILED. You MUST restart from the relevant Law and redo the work.
> Do NOT submit. Do NOT explain. Do NOT say "I'll fix it next turn."
> Just redo it. Then re-run this checklist from the top.
> Lying on this checklist is a GOVERNANCE VIOLATION — same severity as hallucination.

---

### 🔍 YAGNI AUDIT — "Ginawa ko ba lamang ang kailangan?"
- [ ] Did I write ONLY what was explicitly asked — nothing extra?
- [ ] Did I add any abstraction, generalization, or utility that was NOT required?
  - If YES → Remove it. It violates YAGNI.
- [ ] **"Nagdagdag ba ako ng code na 'for future use' na hindi pa kailangan ngayon?"**
  - If YES → Delete it before submitting.

### 🏗️ SOLID AUDIT — "Nag-iisang trabaho ba ang bawat piraso ng code?"
- [ ] Does every function/component have exactly ONE responsibility?
  - **"Kung ilarawan ko ang function na ito, kailangan ko bang gumamit ng 'at' (and)?"**
  - If YES → Split it. It violates Single Responsibility.
- [ ] Did I hardcode any dependency instead of injecting it?
  - If YES → Refactor to dependency injection. Violates Dependency Inversion.
- [ ] Is any interface forcing consumers to implement methods they don't need?
  - If YES → Split the interface. Violates Interface Segregation.

### 🔁 DRY AUDIT — "May kinalawang ba ng code na ito?"
- [ ] **"Mayroon bang eksaktong katulad nito sa ibang bahagi ng codebase?"**
  - If YES → Extract to shared utility. Resubmit.
- [ ] Did I copy-paste any logic from another file?
  - If YES → Extract and share. Do not proceed.
- [ ] Is the same constant value defined in more than one place?
  - If YES → Move to a single constants file.

### 🛡️ DEFENSIVE PROGRAMMING AUDIT — "Pinagkakatiwalaan ko ba ang data nang walang pruweba?"
- [ ] **"Sinuri ko ba ang lahat ng maaaring null o undefined bago ko gamitin?"**
  - If NO → Add null guards and optional chaining before submitting.
- [ ] Is every array guarded with `Array.isArray()` before iteration?
  - If NO → Add the guard.
- [ ] Does every async operation have a try/catch with user-visible feedback?
  - If NO → Add it. Silent failures are PROHIBITED.
- [ ] **"Nag-assume ba ako na ang data mula sa API ay laging tama?"**
  - If YES → Add validation. API data is NEVER trusted blindly.

### ✂️ SEPARATION OF CONCERNS AUDIT — "Hinahalo ko ba ang mga responsibilidad?"
- [ ] Are UI components free of raw `fetch()` calls and business logic?
  - If NO → Extract to custom hooks or services.
- [ ] Are utility functions free of UI imports or rendering logic?
  - If NO → Refactor. Utilities must be pure functions.
- [ ] **"Isang file lang ba ang humahawak ng routing, state, API, at UI?"**
  - If YES → Split it into focused modules.

### ⚡ FAIL FAST AUDIT — "Pinahintulutan ko bang lumago ang mali?"
- [ ] Are all inputs validated at the BOUNDARY of the function — not deep inside?
  - If NO → Move validation to the entry point.
- [ ] **"May lugar ba sa code na alam ko nang mali ang value pero pinagpatuloy ko pa rin?"**
  - If YES → Add an early return or throw. Fix it before submitting.
- [ ] Does every error surface immediately to the user with a clear message?
  - If NO → Add error state rendering.

### 😲 PRINCIPLE OF LEAST SURPRISE AUDIT — "Gagawin ba ng code ko ang eksaktong inaasahan?"
- [ ] Does every function do EXACTLY what its name implies — nothing more, nothing less?
  - **"Magugulat ba ang isang bagong developer kapag nakita ang ginagawa ng function na ito?"**
  - If YES → Rename or refactor to match expectations.
- [ ] Do any functions secretly mutate external state or global variables?
  - If YES → Make side effects explicit or eliminate them.
- [ ] Do all default values represent the safest, most expected case?
  - If NO → Fix the defaults.

### 🧪 RED-GREEN-REFACTOR AUDIT — "Iniisip ko ba ang testability?"
- [ ] **"Maaari bang i-test ang bawat function na aking sinulat nang walang running server?"**
  - If NO → Extract dependencies so the function can be tested in isolation.
- [ ] Did I verify the happy path BEFORE refactoring?
  - If NO → Verify first. Never refactor broken code.
- [ ] **"Ano ang expected input at expected output ng bawat function? Naiisip ko ba ito bago ko ito isulat?"**
  - If NO → Define the contract first, then implement.

---

## ⛔ ABSOLUTE FINAL GATE

After completing the checklist above, answer these 3 ultimate questions:

**Q1: "Nagsinungaling ba ako kahit sa iisang item sa checklist na ito?"**
**Q2: "Peke ba ang kahit isang resulta na ipinakita ko — gawa lang sa assumption at hindi sa actual na patakbo?"**
**Q3: "Mayroon bang NO sa kahit isang tanong sa itaas?"**

If the answer to ANY of Q1, Q2, or Q3 is YES:
→ You have FAILED this task.
→ Do NOT submit.
→ Go back to the specific Law that was violated.
→ Fix it completely.
→ Re-run the ENTIRE checklist from the top.
→ Only when ALL answers are NO may you submit.

**There is no partial credit. There is no "close enough."**
**The code is either correct or it is not. There is no middle ground.**
