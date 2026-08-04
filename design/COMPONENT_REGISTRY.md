# 🧩 COMPONENT REGISTRY INDEX

> **Canonical Component Index**: Component → Token Mappings Specification  
> **Source of Truth**: [master_tokens.json](file:///design/tokens/master_tokens.json) & [company_master_design_tokens_spec.md](file:///design/company_master_design_tokens_spec.md)  

---

## 📊 Component Mappings Registry

| Component ID | Description / Purpose | Token Mappings | Example CSS Class / Snippet | Implementation Status & File Location | Priority Tier |
|---|---|---|---|---|---|
| **`BTN-GLOW`** | Glowing Action Button Trigger | `buttons.glowingAction`<br>`colors.action.primary`<br>`colors.action.cyan` | `bg-gradient-to-r from-[#2563EB] to-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)]` | Implemented:<br>[omnistock/src/components/CheckoutModal.jsx](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/components/CheckoutModal.jsx)<br>[GHL-PULSE/src/pages/Login.jsx](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/pages/Login.jsx) | **Tier 5 (Critical)** |
| **`CRD-TIER1`** | Kinetic Moving Border Card | `motion.movingBorder`<br>`colors.surface.card`<br>`borders.radius.2xl` | `moving-border-card rounded-3xl bg-[#0B1C30]` | Implemented:<br>[omnistock/src/index.css](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/index.css)<br>[GHL-PULSE/src/components/AuthLayout.jsx](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/components/AuthLayout.jsx)<br>[EMS/src/index.css](file:///c:/Users/Admin/.antigravity-ide/EMS/src/index.css) | **Tier 5 (Critical)** |
| **`BTN-PRIMARY`** | Primary Solid Action Button | `buttons.primary`<br>`colors.action.primary` | `bg-[#2563EB] text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]` | Implemented:<br>[omnistock/src/pages/POS.jsx](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/pages/POS.jsx)<br>[GHL-PULSE/src/pages/Login.jsx](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/pages/Login.jsx) | **Tier 5 (Critical)** |
| **`BTN-DANGER`** | Destructive Action Button | `buttons.danger`<br>`colors.action.rose` | `bg-rose-950/80 text-rose-300 border border-rose-500/50` | Implemented:<br>[omnistock/src/components/CartSidebar.jsx](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/components/CartSidebar.jsx)<br>[EMS/src/components/EmployeeTable.jsx](file:///c:/Users/Admin/.antigravity-ide/EMS/src/components/EmployeeTable.jsx) | **Tier 4 (High)** |
| **`PAG-LGN`** | Standalone Application Login Page | `colors.surface.dark`<br>`motion.movingBorder`<br>`colors.surface.card` | `min-h-screen bg-[#050811] flex items-center justify-center` | Implemented:<br>[GHL-PULSE/src/pages/Login.jsx](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/pages/Login.jsx)<br>[omnistock/src/pages/Login.jsx](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/pages/Login.jsx) | **Tier 5 (Critical)** |
| **`BDG-STATUS`** | Active/Warning Status Pill Badge | `colors.action.emerald`<br>`colors.action.amber`<br>`borders.radius.full` | `px-2.5 py-1 rounded-full text-xs bg-emerald-950/80 text-emerald-300` | Implemented:<br>[GHL-PULSE/src/components/Dashboard.jsx](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/components/Dashboard.jsx)<br>[omnistock/src/components/ProductCard.jsx](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/components/ProductCard.jsx) | **Tier 4 (High)** |
| **`MOD-DIAL`** | Translucent Frosted Glass Modal | `colors.surface.overlay`<br>`colors.surface.cardFrosted`<br>`borders.width.standard` | `fixed inset-0 bg-black/85 backdrop-blur-md flex items-center` | Implemented:<br>[GHL-PULSE/src/components/PayMongoModal.jsx](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/components/PayMongoModal.jsx)<br>[omnistock/src/components/CheckoutModal.jsx](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/components/CheckoutModal.jsx) | **Tier 4 (High)** |
| **`INP-DARK`** | Dark Anti-Zoom Input Field | `colors.surface.dark`<br>`colors.text.crystalWhite`<br>`borders.width.standard` | `bg-[#050811] text-white border-slate-700 focus:border-[#F9E006] text-base` | Implemented:<br>[GHL-PULSE/src/pages/Login.jsx](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/pages/Login.jsx)<br>[omnistock/src/pages/POS.jsx](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/pages/POS.jsx) | **Tier 4 (High)** |
| **`BAR-LIC`** | 4-Tier Commercial Licensing Footer Bar | `colors.surface.card`<br>`colors.text.slateMuted`<br>`colors.action.amber` | `fixed bottom-0 inset-x-0 bg-[#0B1C30]/90 backdrop-blur-xl border-t border-slate-800` | Implemented:<br>[GHL-PULSE/src/components/LicensingDeploymentTierBar.jsx](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/components/LicensingDeploymentTierBar.jsx)<br>[omnistock/src/components/LicensingDeploymentTierBar.jsx](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/components/LicensingDeploymentTierBar.jsx) | **Tier 5 (Critical)** |
| **`SCR-GLASS`** | Frosted Glass Custom Scrollbar | `colors.action.cyan`<br>`colors.action.amber`<br>`colors.surface.dark` | `SCROLL-CYBER-GLASS ::-webkit-scrollbar-thumb` | Implemented:<br>[omnistock/src/index.css](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/index.css)<br>[EMS/src/index.css](file:///c:/Users/Admin/.antigravity-ide/EMS/src/index.css)<br>[GHL-PULSE/src/index.css](file:///c:/Users/Admin/.antigravity-ide/GHL-PULSE/src/index.css) | **Tier 4 (High)** |

---

## 💡 Suggested Token Additions for Unmapped Checklist Components

- **`BTN-GLOW`**: Mapped to `buttons.glowingAction`.
- **`CRD-TIER1`**: Mapped to `motion.movingBorder` + `colors.surface.card`.
- **`PAG-LGN`**: Mapped to `colors.surface.dark` + `colors.surface.card`.
