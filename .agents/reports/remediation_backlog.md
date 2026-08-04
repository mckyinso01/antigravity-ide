# 📋 EMS & Ecosystem Prioritized Remediation Backlog

This document details the prioritized remediation backlog (P0, P1, P2) for EMS and the workspace ecosystem based on Copilot's automated audit recommendations.

---

## 🔴 P0 — Critical & Urgent (Completed & Verified)

| Item ID | Component | File Reference | Action Required | Status | Verification Command |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P0-1** | Design Tokens | `omnistock/design/tokens/master_tokens.json` | Centralize semantic tokens into single JSON & validate schema | ✅ RESOLVED | `node tools/validate_tokens.js` |
| **P0-2** | Motion Controls | `EMS/src/index.css:4-15` | Add `@media (prefers-reduced-motion: reduce)` block | ✅ RESOLVED | `pytest tests/test_ems_governance.py` |
| **P0-3** | Touch Ergonomics | `EMS/src/components/LoginPage.tsx:88-115` | Enforce min 44x44px touch targets on primary buttons | ✅ RESOLVED | `pytest tests/test_ems_governance.py` |
| **P0-4** | WCAG Contrast | `scripts/audit_contrast_and_colors.py` | Audit token color contrast against WCAG 2.1 AA (4.5:1 ratio) | ✅ RESOLVED | `python scripts/audit_contrast_and_colors.py` |
| **P0-5** | Danger Confirmation | `EMS/src/components/SelfHostProvisioningModal.tsx:125-140` | Enforce 2-step typed `"PURGE"` confirmation before data sanitization | ✅ RESOLVED | `pytest tests/test_ems_governance.py` |

---

## 🟡 P1 — Short-Term (Completed & Verified)

| Item ID | Component | File Reference | Action Required | Status | Verification Command |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1-1** | Hex Codemod | `tools/replace_hex_with_tokens.js` | Scan and output hardcoded hex replacement report to `reports/hex_replacements.json` | ✅ RESOLVED | `node tools/replace_hex_with_tokens.js --dry` |
| **P1-2** | Visual Stories | `stories/btn_glow.stories.html`, `stories/crd_tier1.stories.html` | Create Storybook component stories for `BTN-GLOW` & `CRD-TIER1` | ✅ RESOLVED | `npm run storybook` |
| **P1-3** | Playwright A11y | `tests/playwright/visual.spec.js` | Add Playwright + `@axe-core/playwright` visual & accessibility test suite | ✅ RESOLVED | `npm run test:playwright` |
| **P1-4** | CI Token Lint | `.github/workflows/token-lint.yml` | GitHub Actions workflow for token linting & hex scanning | ✅ RESOLVED | CI execution |
| **P1-5** | CI Visual Regression | `.github/workflows/visual-regression.yml` | GitHub Actions workflow for Storybook + Playwright a11y checks | ✅ RESOLVED | CI execution |

---

## 🟢 P2 — Medium-Term (Continuous Maintenance)

| Item ID | Component | File Reference | Action Required | Status | Verification Command |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P2-1** | UI Component Package | `packages/ui/` | Abstract `<Button />`, `<Card />`, and `<Input />` into shared ergonomic components | ⏳ PLANNED | `npm run test` |
| **P2-2** | Lighthouse Perf Audit | `EMS/src/components/Dashboard.tsx` | Enforce p95 sub-100ms render performance on tablet hardware | ⏳ PLANNED | Lighthouse CLI |
| **P2-3** | Audit Telemetry | `.agents/audit/audit.log` | Persist high-risk administrative action logs with cryptographic hashes | ✅ ENFORCED | `python -m pytest tests/test_agent_auth.py` |
