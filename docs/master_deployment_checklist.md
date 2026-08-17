# 🚀 Master App Production Deployment Checklist
## Antigravity IDE Ecosystem — Governance & Compliance Standard
**Version**: 1.0 | **Authority**: `.agents/AGENTS.md` | **Stale After**: 2027-01-01

> [!IMPORTANT]
> This checklist is the single source of truth for deployment readiness. An app is NOT deployable unless EVERY item is checked. No exceptions. No excusses, No gimmicks, No lying. Each one in the checklist you should provide a receipt.

---

## 📋 PHASE 1 — Pre-Build & Code Quality Gate

### 1.1 Project Structure
- [ ] `/src` has clean feature-based folder structure (no mixed concerns)
- [ ] `specs.md` exists in project root (per `SPECS-MODAL-SYSTEM-STANDARD` Rule 34)
- [ ] `README.md` is up-to-date with setup, env vars, and run instructions
- [ ] No `TODO` comments or `console.log` left in production code
- [ ] No hardcoded credentials, API keys, or secrets in any source file
- [ ] `local_config.json`, `*.pem`, `agent_token.jwt` are in `.gitignore`

### 1.2 TypeScript / JavaScript Quality
- [ ] Zero `any` types — all props and state are explicitly typed
- [ ] `tsc --noEmit` exits with code 0 (zero TypeScript errors)
- [ ] No unused imports, variables, or dead code
- [ ] All `useEffect` hooks have cleanup return functions where applicable
- [ ] No magic numbers — all constants extracted to named variables or design tokens
- [ ] Nested ternaries (3+ levels) refactored to early-returns or switch statements

### 1.3 Component Architecture
- [ ] No God components (> 500 lines) — split into sub-components
- [ ] No prop drilling deeper than 3 levels — use Context or state management
- [ ] All 4 Mobbin UI states implemented: **Empty / Loading / Error / Full Ideal**
- [ ] No `undefined` or `null` rendered to the DOM (per `UNDEFINED-DATA-FALLBACK-GUARD`)
- [ ] All arrays guarded: `Array.isArray(x) ? x : []` before `.map()`, `.filter()`
- [ ] All network calls have `try/catch` error handling with user-visible feedback

---

## 🎨 PHASE 2 — UI/UX & Design Token Compliance

### 2.1 Design Token Enforcement
- [ ] All colors come from `company_master_design_tokens_spec.md` — no ad-hoc hex values
- [ ] All buttons use `DESIGN_TOKENS.buttons.*` — no inline `bg-rose-600`, `bg-emerald-600`
- [ ] Dark mode surfaces use `bg-[#050811]` or `bg-[#0B1C30]/80` — no bright card fills
- [ ] Typography uses `DESIGN_TOKENS.typography.*` — no raw `text-lg`, `font-bold` overrides
- [ ] Badges/Pills on dark surfaces use dark frosted glass — no `bg-violet-100`, `bg-white`

### 2.2 Layout & Visual Standards
- [ ] Every main page has a Page Header Card (per `PAGE-HEADER-CONTAINER-GUARD` Rule 23)
- [ ] All icons use dynamic color assignments — no static `text-[#10B981]` hardcodes
- [ ] Plural grammar enforced on all dynamic count labels (`1 item`, `2 items`)
- [ ] Mandatory 4-Tier Commercial Licensing Bar rendered at bottom of primary layout
- [ ] Responsive layout verified at: 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] No layout broken by scroll overflow, z-index conflicts, or clipped text

### 2.3 Accessibility (a11y)
- [ ] All interactive elements have unique, descriptive `id` attributes
- [ ] All images have `alt` text
- [ ] Color contrast ratio ≥ 4.5:1 for normal text (WCAG AA)
- [ ] Keyboard navigation works on all modals, dropdowns, and forms
- [ ] Focus ring visible on all interactive elements

---

## 🔒 PHASE 3 — Security Checklist

### 3.1 Secret & Credential Hygiene
- [ ] `pre-commit` hooks installed and passing (`pre-commit run --all-files`)
- [ ] `.gitignore` blocks: `.env`, `*.pem`, `private.pem`, `agent_token.jwt`, `local_config.json`
- [ ] No API keys committed in any file (scan with `scripts/ast-scan.ts` or equivalent)
- [ ] All environment variables loaded from `.env` or vault — never hardcoded

### 3.2 Frontend Security
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] No `eval()` or `new Function()` calls
- [ ] External URLs use `rel="noopener noreferrer"` on all `<a target="_blank">`
- [ ] User input validated and sanitized before display or submission
- [ ] Auth tokens stored in `httpOnly` cookies — NOT `localStorage` for sensitive sessions

### 3.3 RBAC & Agent Governance
- [ ] `policies/agent_policy.yaml` reviewed and agents have only minimum required permissions
- [ ] Deploy agent action requires explicit human clearance (`human_approvers: [security-officer]`)
- [ ] Audit logging enabled on all agent roles (`audit_logging: true`)
- [ ] No agent can `bypass_human_review`, `delete_files`, or `apply_destructive_patches` without approval

---

## 🧪 PHASE 4 — Testing Gate

### 4.1 Automated Tests
- [ ] Unit tests passing: `npm test` exits code 0
- [ ] Test coverage ≥ 85% (per KPI table in governance roadmap)
- [ ] Critical paths covered: auth, CRUD operations, error states
- [ ] Snapshot tests updated for any changed UI components

### 4.2 Integration & E2E Tests
- [ ] All API endpoints tested with both success and error responses
- [ ] Form validation tested with boundary inputs (empty, too long, special chars)
- [ ] All modals open AND close correctly
- [ ] Navigation between all routes tested

### 4.3 Cross-Browser & Performance
- [ ] Tested in Chrome, Firefox, Edge (latest stable)
- [ ] No JavaScript errors in browser console
- [ ] Largest Contentful Paint (LCP) < 2.5 seconds
- [ ] Total Blocking Time (TBT) < 200ms
- [ ] Bundle size checked — no unexpectedly large chunks

---

## 📦 PHASE 5 — Build & Bundle Verification

- [ ] `npm run build` exits code 0 (zero errors, zero skipped warnings)
- [ ] Build output inspected — no missing chunks or 404-prone asset paths
- [ ] JSON Parse Success Rate ≥ 99% (per governance KPI)
- [ ] Patch Apply-Check success: `git apply --check` passes on all staged patches
- [ ] Source maps generated for production debugging (but NOT exposed publicly)
- [ ] Tree-shaking verified — unused libraries not in final bundle

---

## 🚢 PHASE 6 — Pre-Deployment Compliance

### 6.1 Governance Compliance
- [ ] `AGENTS.md` rules reviewed and no violations present in codebase
- [ ] `master_component_checklist.md` issue count is 0 (all issues resolved)
- [ ] `python .agents/scripts/master_project_audit.py` shows **100.0% PASS**
- [ ] All audit log entries exist in `.agents/audit/audit.log`
- [ ] Verification Receipt produced for every major change (per `maestro-zero-defect.md`)

### 6.2 Data & API Readiness
- [ ] Zero static/mock data in production views (per `STRICT-ZERO-STATIC-DATA-POLICY`)
- [ ] Empty State Onboarding Wizards implemented for all empty-data views
- [ ] All environment variables set in deployment target (staging/production)
- [ ] Database migrations run and verified on staging before production
- [ ] API rate limits and timeout handling confirmed working

### 6.3 SEO & Meta
- [ ] Unique `<title>` tag per page
- [ ] `<meta name="description">` present on every page
- [ ] Single `<h1>` per page with correct heading hierarchy
- [ ] Semantic HTML5 elements used (`<main>`, `<nav>`, `<section>`, `<article>`)
- [ ] `robots.txt` and `sitemap.xml` present for public apps

---

## 🎬 PHASE 7 — Deployment Execution

- [ ] Staging deployment executed first — NEVER deploy directly to production
- [ ] **Canary deployment** active — route 10% of traffic to new version first
- [ ] Health checks passing on canary before full rollout
- [ ] Rollback plan documented and tested
- [ ] DevTools E2E visual screenshot taken on staging — zero visual anomalies
- [ ] Zero console errors on staging (`browser_subagent` screenshot verification)
- [ ] Human approval recorded before full production push

---

## 📊 PHASE 8 — Post-Deployment Verification

- [ ] Production URL accessible and loads correctly
- [ ] Auth flow works end-to-end on production
- [ ] Critical user journeys tested manually on production (not just staging)
- [ ] Error monitoring active (Sentry, LogRocket, or equivalent)
- [ ] Analytics tracking firing correctly
- [ ] `System Specs` modal renders correctly (per `SPECS-MODAL-SYSTEM-STANDARD`)
- [ ] Final E2E screenshot captured and stored in `.agents/reports/`
- [ ] Deployment entry logged: date, version, deployer, changes, verification status

---

## 💳 PHASE 9 — Commercial Readiness & Payment Gateway Compliance

### 9.1 Legal & Merchant Verification Gate
- [ ] DTI Certificate of Registration (Sole Proprietorship) or SEC Registration (Corporation) verified on file
- [ ] BIR Certificate of Registration (Form 2303 / COR) on file and verified
- [ ] Merchant Account activated & KYC approved (PayMongo / Stripe / Merchant Acquirer)
- [ ] Verified Bank Account linked for automated merchant payouts and disbursements

### 9.2 Payment & Transaction Infrastructure
- [ ] Live Payment Link / Checkout Webhook tested with real test transaction (GCash, Maya, QR Ph, Credit Card)
- [ ] Automated payment receipt dispatch configured (SMS & Email alerts to customer and admin)
- [ ] Fallback Payment Mechanism active: Direct QR Ph / Bank Transfer invoice option for non-KYC interim stages
- [ ] Terms of Service & Refund/Cancellation Policy clearly linked on all checkout surfaces

---

## 🧠 Agent Behavior Compliance During Development

> These apply to ALL AI agents (Gemini, Claude, etc.) working on this codebase.

| ❌ Prohibited (Negative) | ✅ Required (Positive) |
|---|---|
| "This should work" without proof | Show verbatim CLI output / Verification Receipt |
| Claiming 100% done without tests | Run `npm test` + `npm run build` first |
| "Looks good!" without visual check | Take DevTools screenshot — show it |
| Partial audit presented as complete | State `⚠️ PARTIAL — unchecked files: [list]` |
| Jumping to code without reading file first | `view_file` target lines first, always |
| Using `any` TypeScript type | Explicitly type everything |
| Leaving TODO comments in code | Resolve or create tracked GitHub Issue |
| Over-confident language ("probably", "I believe") | State uncertainty explicitly: "Hindi ko pa na-verify" |
| Editing 5+ files in one turn | Max 3 verified changes per turn |
| Declaring done without `master_project_audit.py` pass | Run audit, paste 100% PASS scorecard |
| Hallucinating API parameters | `view_file` docs/source to confirm parameter exists |
| Guessing import paths | Read the actual file to get exact import |

---

*This checklist is governed by `.agents/AGENTS.md` (Supreme Authority). Any conflict between this document and `AGENTS.md` resolves in favor of `AGENTS.md`.*
