## 🤖 Remediation Agent Pull Request

### 📋 Overview
- **Audit ID**: `${AUDIT_ID}`
- **Agent ID**: `remediation-agent`
- **Severity**: `${SEVERITY}` (`critical` | `high` | `medium` | `low`)
- **Requires Human Review**: `${REQUIRES_HUMAN_REVIEW}` (`true` | `false`)

---

### 🔍 Evidence & Provenance
- **Target File**: `${TARGET_FILE}`
- **Lines Affected**: `${START_LINE}` to `${END_LINE}`
- **Verbatim Evidence Snippet**:
```text
${VERBATIM_EVIDENCE_SNIPPET}
```

---

### 🛠️ Proposed Changes Summary
${EXPLANATION}

---

### ✅ Pre-Merge Verification Checklist
- [ ] Model Output Schema Validated (`tools/validate_model_output.ts`)
- [ ] Git Apply Check Passed (`scripts/audit_model_output.ts`)
- [ ] Zero Committed Secrets Verified (`config.json` redacted)
- [ ] Unit & Integration Tests Passing (`npm test`)
- [ ] Design Token Linter Clean (`tools/token_linter.js`)
- [ ] Security Officer Approval (Mandatory if Severity >= High or touches Auth/Infra/Secrets)
