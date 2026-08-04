## 🛡️ Pull Request Quality & Compliance Gate Checklist

### 📋 Prerequisite Verification
- [ ] **Deterministic AST Sweep**: `npx tsx scripts/ast-scan.ts` emitted `PASS` verdict.
- [ ] **Master Project Audit**: `python .agents/scripts/master_project_audit.py` passed 100% (47/47 checks).
- [ ] **Pytest Unit Suite**: `python -m pytest tests/` passed 100% (18/18 tests).
- [ ] **Strict Type-Safety**: `npx tsc --noEmit` clean with zero errors.

---

### 🎨 Design Tokens & UI Uniformity
- [ ] Theme tokens aligned with `company_master_design_tokens_spec.md` (Demon Slayer Cyber Glass).
- [ ] Base theme locked to **`⚡ Zenitsu Thunder Gold`** (`#F9E006` Cyber Gold / `#0B1C30` solid card interior).
- [ ] Prohibited color class check passed (zero `bg-orange-100`, `bg-yellow-100` card fills on dark surfaces).
- [ ] Mobile 16px minimum font size verified on form inputs.

---

### 🔒 Security & Code Quality
- [ ] Zero raw secrets or API keys logged in backend (`server.ts` Zod AI schema validation verified).
- [ ] Defensive array fallbacks (`Array.isArray(...)` or `(x ?? []).length`) present.
- [ ] Zero red console errors emitted in DevTools runtime.

---

*Sign-off by Antigravity Master Orchestrator & Maintainer Team.*
