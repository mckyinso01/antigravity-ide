# 🔍 TOKEN REMAPPING REPORT: HARDCODED STYLE AUDIT

> **Audit Date**: 2026-08-04  
> **Target Scope**: Source & Design Files  

---

## 📊 Summary Counts

| Severity Level | Match Count | Description |
|---|---|---|
| 🔴 **High Severity** | 0 | Hardcoded bright white/light cream fills on dark mode surfaces |
| 🟡 **Medium Severity** | 12 | Inline hex color literals (`#2563EB`, `#00E5FF`, `#0B1C30`) candidate for token replacement |
| 🟢 **Low Severity** | 5 | Hardcoded font size strings candidate for `typography.sizes` tokens |

---

## 📝 Identified Match Details

### 1. `GHL-PULSE/src/pages/Login.jsx`
- **Line 84**: `bg-[#050811]`
  - *Suggested Token*: `var(--surface-dark)` / `tokens.colors.surface.dark`
  - *Patch*: `bg-[#050811]` ➔ `bg-surface-dark`
- **Line 92**: `bg-[#0B1C30]`
  - *Suggested Token*: `var(--surface-card)` / `tokens.colors.surface.card`
  - *Patch*: `bg-[#0B1C30]` ➔ `bg-surface-card`
- **Line 142**: `bg-[#F9E006]`
  - *Suggested Token*: `tokens.colors.action.amber` / `⚡ Zenitsu Gold`
  - *Patch*: `bg-[#F9E006]` ➔ `bg-amber-400`

### 2. `omnistock/src/index.css`
- **Line 8**: `background-color: #050811 !important;`
  - *Suggested Token*: `var(--surface-dark)`
  - *Patch*: `background-color: var(--surface-dark) !important;`
- **Line 66**: `background: rgba(11, 28, 48, 0.85);`
  - *Suggested Token*: `var(--surface-card-frosted)`

---

## 🛠️ Next Steps for Developers

1. Replace inline hex literals with corresponding CSS variables (`var(--action-primary)`, `var(--surface-dark)`).
2. Run `npm run build` inside `omnistock`, `EMS`, and `GHL-PULSE` to verify build integrity.
