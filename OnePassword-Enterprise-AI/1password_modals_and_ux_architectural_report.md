# Stage 5: Modals & UX Architectural Report — 1Password® Enterprise

> 📍 **WORKFLOW TELEMETRY**: `[STAGE 5: MODALS & UX ARCHITECTURAL REPORT — 🟡 ACTIVE / CLEARANCE REQUIRED]`  
> **Isolated Project Directory**: `c:\Users\Admin\.antigravity-ide\OnePassword-Enterprise-AI\`  
> **StitchMCP Design System Asset**: `assets/1060452157345996019`  
> **Council & MCP Invocation**: 18 Domain Council Subagents + StitchMCP UI/UX Engine + Chrome DevTools Audit  

---

## 🖼️ 1. Modals, Drawers & Layering Architecture

To maintain a clutter-free, high-performance workspace, secondary tools (AI assistants, debuggers, evidence certificates, search overlays) MUST NOT permanently occupy primary screen real estate. They are rendered via **Floating Portals, Modals, and Slide-Over Right Drawers**:

| Component Name | Type / UX Pattern | Mount Location | Trigger Event & Z-Index | Behavior & Dismissal |
|---|---|---|---|---|
| `<TransactionEvidenceModal />` | Centered Modal | React Portal (`body`) | Click "Decrypt & View Proof" (`z-50`) | Esc key / Backdrop click dismiss; RSA signature display |
| `<PayloadDebuggerDrawer />` | Slide-Over Right Drawer | React Portal (`body`) | Click "Inspect Block JSON" (`z-40`) | Slide-in from right (300ms transition); raw JSON tree |
| `<ExportReportWizardModal />` | Multi-Step Wizard Modal | React Portal (`body`) | Click "Export Report" (`z-50`) | Step 1: Format -> Step 2: Date -> Step 3: Download |
| `<GlobalCommandPalette />` | Centered Search Overlay | React Portal (`body`) | `Ctrl + K` / Search bar click (`z-50`) | Autofocus input; `Esc` / `Ctrl+K` toggle |
| `<TelemetryErrorLogger />` | Sticky Top Banner | Root App Shell (`App.jsx`) | Runtime error event (`z-30`) | Auto-dispatches error alerts to `mckinsyo01@gmail.com` |

---

## 🎨 2. High-Contrast Ergonomics & Accessibility Rules

1. **Z-Index Layering Order**:
   - `z-10`: Navigation Rail & Header Sticky Bar
   - `z-20`: Dynamic Active View Component
   - `z-30`: Telemetry Error Sentinel Banner
   - `z-40`: Slide-Over Drawers (`<PayloadDebuggerDrawer />`)
   - `z-50`: Floating Modals & Command Palette (`<TransactionEvidenceModal />`, `<GlobalCommandPalette />`)

2. **Keyboard Accessibility (WCAG 2.2 AAA)**:
   - All modals MUST trap focus internally upon opening.
   - Pressing `Esc` MUST close active modals without mutating underlying vault state.
   - Text inputs MUST support `onKeyDown` Enter key submission and Backspace clearability.

3. **100% Fluid Viewport & Collapsible Navigation Rail**:
   - Main container MUST be `w-screen min-h-screen flex flex-col` edge-to-edge fluid viewport.
   - Left Navigation Rail MUST include a 1-click collapse button (`isRailCollapsed`), shrinking sidebar to 20px icon view and expanding document canvas to 100% full width.

---

## 📋 3. Stage 5 Execution Checkpoint
- [x] Modals, Drawers & Layering Architecture finalized
- [x] Z-Index layering & WCAG AAA keyboard accessibility rules defined
- [x] Stage 5 artifact persisted (`1password_modals_and_ux_architectural_report.md`)
- [ ] **Awaiting User Clearance Gate to proceed to Stage 6 (StitchMCP Design System Invocation)**
