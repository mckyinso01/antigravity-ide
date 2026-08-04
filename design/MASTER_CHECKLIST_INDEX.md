# 📋 CONSOLIDATED MASTER CHECKLIST INDEX

> **Single Source-of-Truth Checklist Index**: Consolidated & Deduplicated Master Checklist  
> **Canonical Spec Reference**: [company_master_design_tokens_spec.md](file:///design/company_master_design_tokens_spec.md)  
> **Component Mappings Index**: [COMPONENT_REGISTRY.md](file:///design/COMPONENT_REGISTRY.md)  

---

## ⚡ Tier 5: Critical Non-Negotiable Governance Criteria (Must Pass 100%)

- [x] **RULE-01 (Zero Light Fills on Dark Mode)**: Dark mode surfaces (`#050811`) MUST NEVER render bright light-cream, light-yellow, or stark white card fills.
- [x] **RULE-02 (Solid Card Interior Standard)**: Card interiors MUST enforce 100% Solid Dark Navy (`#0B1C30`) with zero interior background color animation bleed.
- [x] **RULE-03 (1.5px Uniform Border Width Standard)**: All container cards MUST enforce `border-width: 1.5px !important;` using explicit `.border` class selectors.
- [x] **RULE-04 (16px Mobile Form Input Anti-Zoom)**: Input fields MUST enforce minimum 16px equivalent font size (`text-sm` / `text-base`).
- [x] **RULE-05 (4-Tier Commercial Licensing Bar)**: Render interactive 4-tier commercial licensing bar on all standalone application viewports.

---

## 🌊 Tier 4: High-Priority UI/UX Component & Token Wiring

- [x] **RULE-06 (Glowing Action Button Token Alignment)**: Primary revenue CTAs MUST consume `buttons.glowingAction` token specs.
- [x] **RULE-07 (Kinetic Moving Border Engine)**: Featured cards MUST consume `.moving-border-card` conic gradient animation.
- [x] **RULE-08 (Frosted Glass Custom Scrollbars)**: Use `SCROLL-CYBER-GLASS` custom scrollbar styling across all overflow scroll containers.
- [x] **RULE-09 (Defensive Data Fallbacks)**: Enforce property fallbacks to eliminate raw `undefined` or `null` text strings.
- [x] **RULE-10 (Numeric Input Spin Button Purge)**: Hide native browser white spin arrows on numeric inputs.

---

## 🛠️ Quick Remediation Guide for Token Drift

| Identified Drift | Remediation Fix | Recommended Replacement |
|---|---|---|
| Hardcoded `#2563EB` | Replace with `var(--action-primary)` | `bg-[#2563EB]` or `var(--action-primary)` |
| Global `*` wildcard border | Remove global `* { border-width: 1.5px; }` | Use `.border { border-width: 1.5px !important; }` |
| Light cream card background | Replace `bg-slate-100` with solid navy | `bg-[#0B1C30]` |
| Missing 16px font on inputs | Add `text-base` or `text-sm` class | `text-base` |

---
*Consolidated & Certified by Antigravity Master Orchestrator.*
