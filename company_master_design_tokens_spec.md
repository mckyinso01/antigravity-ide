# ⚔️ Demon Slayer (Kimetsu no Yaiba) Company Master UI/UX Design System Specification

> **Official Governance Standard**: Master Design Tokens for All Enterprise Applications & Standalone Codebases
> **StitchMCP Master Asset ID**: `assets/1640102745724511064` (`Demon Slayer Ukiyo-e Cyber Glass Design System`)
> **Theme Naming Architecture**: Hango 100% sa **Kimetsu no Yaiba (Demon Slayer)** Characters & Elements

---

## 🚫 1. Absolute Purge & Zero-Bypass Directives

1. **Zero Legacy Styling**: All ad-hoc, unstyled, or default browser color palettes are **PERMANENTLY PURGED**.
2. **Zero Plain White Containers**: Pure white backgrounds (`bg-white`) on primary cards/containers are strictly prohibited in dark mode applications.
3. **Mandatory 100% Demon Slayer Theme Inheritance**: Every project MUST inherit one of the official **Demon Slayer Character Theme Variations** listed below.
4. **Ukiyo-e Woodblock Calligraphy & Cyber Glass Blend**: All primary interfaces MUST combine thick ink-stroked boundaries (`border-slate-800 focus:border-[#00E5FF]`), kinetic particle bloom on hover (`hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]`), and ultra-smooth frosted glass surfaces (`backdrop-blur-xl bg-[#0B1C30]/80`).
5. **Red-to-Yellow Flame Rotating Conic Gradient Rule (`moving-border-card`)**: The 2px rotating conic gradient border is strictly restricted to **ONLY TWO UI SPOTS**: (1) The Admin Login Portal Card (`PAG-LGN`), and (2) The Featured Showcase Product Hero Cards on the landing website (`PAG-LND`). The rotating colors MUST strictly animate between **Rengoku Flame Crimson (`#E11D48`) ➔ Solar Amber (`#F59E0B`) ➔ Zenitsu Gold (`#F9E006`)**, while the interior surface remains 100% Solid Dark Navy (`#0B1C30`).

---

## 🚀 3. 5-Phase Blueprint for New Project Provisioning & Design Token Execution

Kapag may pumasok na **bagong proyekto** (halimbawa: panibagong SaaS app o client request), sundin nang eksakto ang 5-Phase Execution Blueprint na ito mula Day 1:

### Phase 1: Domain Role & Character Theme Selection

1. Tukuyin ang Domain Role ng bagong app (Legal, Finance, POS, CRM, Video, DevOps).
2. Piliin ang opisyal na **Demon Slayer Character Theme Variation**:
   - `⚡ Zenitsu Thunder Gold` ➔ Legal Tech / Statutory Audit
   - `🌊 Tanjiro Midnight Blue` ➔ Retail POS & Core SaaS Showcase
   - `🌫️ Muichiro Mist Cyan` ➔ DevOps & SRE Telemetry
   - `🔥 Rengoku Flame Crimson` ➔ Video Automation & Media Render
   - `🦋 Shinobu Wisteria Violet` ➔ Security Vaults & Financial Escrow

### Phase 2: Standalone Directory & Stitch MCP Registration

1. Bumuo ng isolated standalone directory (hal. `npx create-vite@latest <app-name>`).
2. Kopyahin ang `designSystem.js` module at `src/index.css` global styles.
3. Tawagin si **Stitch MCP** (`create_design_system`) upang mag-register ng bagong asset ID at i-lock ang CSS tokens.

### Phase 3: 5-Tier Percentage Importance Component Checklist Mapping

Bumuo ng `<app_name>_master_component_checklist.md` at i-mapa ang lahat ng bubuuing UI components:
- **Tier 5 (81%–100%)**: Revenue core (`BTN-GLOW`), Login Card (`CRD-TIER1` - Red-Yellow Flame Rotating Border + 100% Solid Dark Navy `#0B1C30` interior).
- **Tier 4 (61%–80%)**: Primary actions (`BTN-PRI`), Sticky Topbar (`LAY-HDR`), Left Sidebar (`LAY-SIDE`), Status Badges (`BDG-STAT`).
- **Tier 3 (41%–60%)**: Secondary actions (`BTN-SEC`), Glass Panels (`CRD-GLASS`), Table Grids (`TBL-GRID`).
- **Tier 2 (21%–40%)**: Destructive actions (`BTN-DANGER`), Floating Modals (`MOD-CTR`), Detail View Inspector (`MOD-VIEW`), Drawers (`DRW-SIDE`).
- **Tier 1 (0%–20%)**: Ghost buttons (`BTN-GHOST`), Floating FAB (`BTN-FLOAT`), Tooltips (`TIP-HELP`), Licensing Footer (`LAY-FOOT`).

### Phase 4: Automated Code Audit & Contrast Scanning

Patakbuhin ang automated CLI code scanner:
`python .agents/scripts/audit_contrast_and_colors.py <app_name>/src`
Siguraduhing nakakakuha ng `✅ 100% PASS: All components comply with Demon Slayer Master Design Tokens!`.

### Phase 5: E2E Visual Verification & User Clearance

1. Kumuha ng DevTools screenshot gamit ang `browser_subagent`.
2. Iprisinta ang visual receipt at telemetry badge (`📍 WORKFLOW TELEMETRY: [NEW PROJECT PROVISIONED — 100% PASS]`).
3. Magpakita ng malinaw na Taglish report sa user bago magsimulang mag-code ng mga karagdagang features.

---

## 🏛️ 4. Domain-Role Adaptation & High-Readability Rules

Hindi lahat ng software natin ay pareho ang role. Upang maging **100% readable at tugma sa kailangang role ng bawat software**, iniaangkop ang ating Master Design Tokens batay sa **Domain Role ng App**:

### 1. ⚖️ Legal Tech & Statutory Text Audit Domain (`LexAI Enterprise`)

- **Domain Role**: Pagsusuri at pag-audit ng mahahabang kontrata, batas, at statutory paragraphs.
- **Readability Rule**: Maximum contrast & zero eye strain sa mahahabang babasahin.
- **Typography Token**:
  - **Document Paragraph Body**: `Inter` / `Merriweather` (15px-16px, line-height: 1.75, color: `#F8FAFC` High-Contrast Off-White).
  - **Statutory Clauses & Line Nos**: `JetBrains Mono` (`#00E5FF` Cyan IDs, `#F9E006` Zenitsu Yellow Clause Highlights).
- **Card & Surface Adaptation**:
  - `CRD-DOC` (Legal Reader Card): `#071322` Dark Navy surface with 24px comfortable padding, `#0B1C30` background, and left accent border (`border-l-4 border-[#F9E006]`).

### 2. 🛒 Retail POS & Inventory Domain (`OmniStock`)

- **Domain Role**: Mabilisang pag-scan ng barcode, pagproseso ng bayad sa cashier, at pagtutuos ng puhunan at benta.
- **Readability Rule**: High-density numerical data scanability at monospace price formatting.
- **Typography Token**:
  - **Currency & Quantities**: `JetBrains Mono` (`#00E5FF` Cyan, `#10B981` Emerald).
  - **Table Headers**: `Inter` bold uppercase (`text-[11px] text-slate-400`).

### 3. 📊 CRM, Marketing & Workforce Synergy Domain (`GHL-PULSE` / `EMS`)

- **Domain Role**: Pipeline drag-and-drop cards, lead status badges, customer chat timelines, at employee roster management.
- **Readability Rule**: Visual status distinction at user avatar clarity.
- **Typography Token**:
  - **Customer/Employee Names**: `Inter` / `Outfit` (`#F8FAFC` Off-White).
  - **Lead Status Badges**: `BDG-STAT` (`#10B981` Qualified, `#F59E0B` Contacted, `#E11D48` Unresponsive).

### 4. 🎬 Creative Media & Short-Form Automation Domain (`Shorts-Automation-Agent`)

- **Domain Role**: Timeline scrubbing, video render viewports, at audio wave visualization.
- **Readability Rule**: Media contrast at timecode precision.
- **Typography Token**:
  - **Timecodes & Frame Counts**: `JetBrains Mono` (`#F59E0B` Amber).
  - **Media Titles**: `Outfit` (`#F8FAFC`).

### 5. ⚙️ DevOps & Cloud Telemetry Domain (`Fleet-core`)

- **Domain Role**: Terminal output streams, node health graphs, at live SLA monitoring.
- **Readability Rule**: High-density monospace terminal stream with zero text overflow.
- **Typography Token**: `JetBrains Mono` (13px, `#00E5FF` Log streams, `#10B981` Healthy nodes, `#E11D48` Crashed pods).

---

## ⚔️ 2. Demon Slayer (Kimetsu no Yaiba) Character Theme Variations Matrix

| Theme Variation Name | Character & Elemental Breathing | Ideal App Domain / Use-Case | Primary Color Tokens (Hex) | Typography Tokens | Signature Visual Feature |
| --- | --- | --- | --- | --- | --- |
| **⚡ Zenitsu Thunder Gold** *(Formerly Var A)* | **Zenitsu Agatsuma**<br>*(Thunder Breathing)* | High-Precision AI Discovery, Legal Tech (`LexAI Enterprise`), Real-Time Audit, HUD Control Rooms | • Thunder Yellow: `#F9E006`<br>• Lightning Gold: `#F59E0B`<br>• Deep Void: `#050811`<br>• Electric Accent: `#2563EB` | `Space Grotesk` (UI)<br>`JetBrains Mono` (Data) | Neon Cyber-Yellow outline borders, high-density HUD data grids, glowing micro-chips |
| **🌊 Tanjiro Midnight Blue** *(Formerly Var B)* | **Tanjiro Kamado**<br>*(Sun & Water Breathing)* | Enterprise POS (`OmniStock`), Showcase Hub (`GatzDevPortfolio`), Core Enterprise SaaS | • Water Navy Deep: `#050811`<br>• Solid Surface Card: `#0B1C30`<br>• Electric Blue: `#2563EB`<br>• Sun Cyan: `#00E5FF` | `Inter` (UI/Headers)<br>`JetBrains Mono` (Numbers) | Multi-layered glassmorphism (`.glass-card`), glowing color borders on hover |
| **🌫️ Muichiro Mist Cyan** *(Formerly Var C)* | **Muichiro Tokito & Inosuke**<br>*(Mist & Beast Breathing)* | SRE Monitoring, DevOps Pipelines, Kubernetes Managers (`Fleet-core`), Cloud Telemetry | • Mist Cyan: `#00E5FF`<br>• Beast Emerald: `#10B981`<br>• Deep Space Canvas: `#080C14` | `JetBrains Mono` (Primary)<br>`Inter` (Secondary) | Terminal log streams, real-time node topology graphs, live SLA telemetry |
| **🔥 Rengoku Flame Crimson** *(Formerly Var D)* | **Kyojuro Rengoku & Nezuko**<br>*(Flame Breathing & Demon Blood)* | Short-Form Automation (`Shorts-Automation-Agent`), Media Renders, Creative AI Studios | • Flame Crimson: `#E11D48`<br>• Solar Amber: `#F59E0B`<br>• Obsidian Canvas: `#0A0A0C` | `Outfit` (Headers)<br>`JetBrains Mono` (Data) | Timeline rails, dynamic media viewports, video carousels |
| **🦋 Shinobu Wisteria Violet** *(Extended Theme)* | **Shinobu Kocho**<br>*(Insect Breathing / Wisteria)* | Financial Escrow (`WeeklyPulse`), Security Vaults (`1Password Vault`), Encrypted Credentials | • Wisteria Violet: `#C084FC`<br>• Deep Purple: `#8B5CF6`<br>• Night Velvet: `#090514` | `Inter` (UI)<br>`JetBrains Mono` (Data) | Encrypted status badges, violet shimmer borders, cryptographic proof modals |

---

## 💎 3. Master Component Design Tokens & Criteria Hierarchy

### 3.1. Surface & Background Tokens

```css
--surface-deep: #050811;          /* Deep Void Background */
--surface-card: #0B1C30;          /* 100% Solid Dark Navy Interior Surface */
--surface-card-hover: #0F243F;    /* Card Hover Background */
--surface-glass: rgba(11, 28, 48, 0.8); /* Ultra-Smooth Frosted Glass Panel */
--surface-modal: #071322;         /* Floating Modal / Drawer Body */
--surface-table-row: #071322;     /* Data Table Base Row */
--surface-table-hover: #0E1E36;   /* Data Table Row Hover */
--surface-input: #071322;         /* Form Input Field Surface */
--surface-tooltip: #071322;       /* Recharts / UI Tooltip Surface */
```

### 3.2. Brand & Accent Tokens

```css
--zenitsu-yellow: #F9E006;        /* Zenitsu Lightning Yellow */
--tanjiro-blue: #2563EB;          /* Tanjiro Electric Blue */
--muichiro-cyan: #00E5FF;         /* Muichiro Mist Cyan */
--beast-emerald: #10B981;         /* Inosuke Beast Emerald */
--rengoku-crimson: #E11D48;       /* Rengoku Flame Crimson */
--rengoku-amber: #F59E0B;         /* Rengoku Solar Amber */
--shinobu-violet: #C084FC;        /* Shinobu Wisteria Violet */
```

### 3.3. Criteria-Based Button Component Tokens

```javascript
export const BUTTON_TOKENS = {
  // BTN-GLOW: Highest Priority / Core Value & Establishment Actions (Conic Rotating Glow)
  glowingAction: "moving-border-btn bg-[#2563EB] text-white font-bold tracking-wide rounded-lg px-5 py-2.5 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)]",
  // BTN-PRI: Standard Primary Action / Form Submissions (Tanjiro Electric Blue)
  primary: "bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 rounded-lg px-4 py-2.5",
  // BTN-SEC: Secondary Action / Cancel, Filters, Exports (Muichiro Dark Navy + Cyan Hover)
  secondary: "bg-[#071322] border border-slate-700/80 hover:border-[#00E5FF]/60 text-slate-200 hover:text-white hover:bg-[#0E1E36] transition-all duration-300 rounded-lg px-4 py-2.5",
  // BTN-DANGER: Destructive Action / Void, Delete, Purge (Rengoku Flame Crimson)
  danger: "bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold shadow-[0_0_15px_rgba(225,29,72,0.4)] rounded-lg px-4 py-2.5",
  // BTN-GHOST: Micro Inline Actions / Close, Pagination, Menus
  ghost: "text-slate-300 hover:text-cyan-300 hover:bg-[#071322] rounded-lg px-3 py-2 transition-colors",
};
```

### 3.4. Input & Form Component Tokens

```javascript
export const FORM_TOKENS = {
  input: "bg-[#071322] border border-slate-800 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] text-slate-100 placeholder:text-slate-500 rounded-lg px-3.5 py-2.5 text-sm transition-all outline-none",
  inputNumeric: "bg-[#071322] border border-slate-800 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] text-[#00E5FF] placeholder:text-slate-500 rounded-lg px-3.5 py-2.5 font-mono text-sm font-bold text-right outline-none",
  select: "bg-[#071322] border border-slate-800 focus:border-[#00E5FF] text-slate-100 rounded-lg px-3.5 py-2.5 font-mono text-sm outline-none cursor-pointer",
  label: "text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 block",
  checkbox: "rounded border-slate-800 bg-[#071322] text-[#00E5FF] focus:ring-[#00E5FF]",
};
```

### 3.5. Card & Container Component Tokens

```javascript
export const CARD_TOKENS = {
  // Tier 1: Moving Border Card (Solid Interior + Conic Rotating Outline)
  movingBorderCard: "moving-border-card bg-[#0B1C30] rounded-2xl p-6 relative overflow-hidden shadow-2xl",
  // Tier 2: Spotlight KPI Stat Card (Color Border Activation on Hover)
  kpiCard: "bg-[#0B1C30] border border-slate-800/80 rounded-2xl p-5 transition-all duration-300 transform hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]",
  // Tier 3: Ultra-Smooth Glass Card
  glassCard: "bg-[#0B1C30]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl",
};
```

### 3.7. Icon Container & Glassmorphic Icon Button Tokens (`ICON_TOKENS`)

```javascript
export const ICON_TOKENS = {
  // 🌊 Tanjiro Cyber Glass Icon Container
  cyberGlass: "w-10 h-10 rounded-xl flex items-center justify-center bg-[#0B1C30]/80 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.2)] transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]",
  // ⚡ Zenitsu Thunder Gold Icon Container
  amberGlass: "w-10 h-10 rounded-xl flex items-center justify-center bg-[#0B1C30]/80 backdrop-blur-xl border border-amber-500/30 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)] transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
  // 🔥 Rengoku Flame Crimson Icon Container
  flameGlass: "w-10 h-10 rounded-xl flex items-center justify-center bg-[#0B1C30]/80 backdrop-blur-xl border border-rose-500/30 text-rose-400 shadow-[0_0_12px_rgba(225,29,72,0.2)] transition-all duration-300 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]",
  // 🌫️ Inosuke Beast Emerald Icon Container
  emeraldGlass: "w-10 h-10 rounded-xl flex items-center justify-center bg-[#0B1C30]/80 backdrop-blur-xl border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
  // 🔘 Interactive Glassmorphic Icon Button
  iconButton: "w-9 h-9 rounded-xl flex items-center justify-center bg-[#071322]/80 backdrop-blur-lg border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-[#0E1E36] transition-all duration-300 active:scale-95 shadow-md",
};
```

---

## 📊 4. Universal Chart System Tokens (Recharts Palette Engine)

| Data Stream | Demon Slayer Character Theme | Gradient IDs & Hex Stops | Stroke & Hover Effect |
| --- | --- | --- | --- |
| **Revenue Stream** | **Muichiro Mist Cyan** | `cyanEmeraldGradient` (`#00E5FF` ➔ `#10B981`) | Stroke `#00E5FF`, Glow on Hover |
| **Profit & Growth** | **Inosuke Beast Emerald** | `emeraldTealGradient` (`#10B981` ➔ `#14B8A6`) | Stroke `#10B981`, Glow on Hover |
| **COGS / Expenses** | **Rengoku Flame Crimson** | `amberRoseGradient` (`#F59E0B` ➔ `#E11D48`) | Stroke `#E11D48`, Glow on Hover |
| **AI Predictions** | **Shinobu Wisteria Violet** | `purpleMagentaGradient` (`#C084FC` ➔ `#E11D48`) | Stroke `#C084FC`, Dash Flow Animation |

---

## 🔢 5. Currency & Data Formatting Standard

1. **Mandatory Font Family**: All monetary numbers, totals, quantities, and telemetry stats MUST use `JetBrains Mono` (`font-mono`).
2. **Defensive Null Guard**: `const safeValue = Number(rawVal) || 0;`
3. **Philippine Peso Standard**:
   ```javascript
   `₱${safeValue.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`
   ```

---

## 🌟 7. Additional Enterprise Design System Pillars

Upang maging **100% FAANG-grade at kumpleto sa lahat ng anggulo**, itinatakda rin ang 6 na karagdagang haligi ng ating Design System:

### 🎬 7.1. Motion, Micro-Interactions & Animation Tokens (`MOTION-*`)

- **Button Kinetic Press**: `active:scale-95 transition-transform duration-150 ease-out`
- **Card Elevation Hover**: `hover:-translate-y-0.5 transition-all duration-300 ease-in-out`
- **Modal Backdrop Blur Fade**: `backdrop-blur-xl animate-in fade-in duration-200`
- **Drawer Slide-Over**: `animate-in slide-in-from-right duration-300 ease-in-out`
- **Conic Border Rotation**: `animation: rotate-border 4s linear infinite`

### 📱 7.2. Responsive Breakpoints & Device Fluidity (`RESP-*`)

- **Mobile (< 640px)**: Bottom drawers (`DRW-BOT`), single-column card layouts, collapsed topbar search.
- **Tablet (640px - 1024px)**: 2-column KPI grids, auto-collapsed left rail (`isLeftRailCollapsed = true`).
- **Desktop (> 1024px)**: Full 4-column grids, 70/30 split view container (`LAY-SPLIT`).
- **Ultra-Wide (> 1536px)**: Edge-to-edge container boundaries (`max-w-7xl mx-auto`).

### ♿ 7.3. Accessibility (WCAG AAA) & Focus Rings (`A11Y-*`)

- **High-Contrast Focus Ring**: `focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050811] outline-none`
- **Screen Reader Labels**: Mandatory `aria-label` sa lahat ng icon-only buttons (`BTN-GHOST`).
- **Minimum Touch Target**: Minimum `44px x 44px` touch boundary sa lahat ng mobile controls.

### 🔊 7.4. Audio & Haptic Feedback Standard (`AUD-*`)

- **Barcode Scan Beep**: Low-latency chime on valid SKU barcode match.
- **Payment Success Audio**: High-frequency success chime on payment completion.
- **Hazard Warning Audio**: Low-frequency warning tone on out-of-stock / error state.

### 🌐 7.5. Multi-Language & Currency Localization (`I18N-*`)

- **Dual Currency Support**: `₱ PHP` (Philippine Peso) & `$ USD` (US Dollar) toggle switcher.
- **Taglish / English Labels**: Intuitive retail & business terms tailored for Sari-Sari, Grocery, and Enterprise setups.

### 💾 7.6. Offline Data Vault & Sync Persistence (`PERSIST-*`)

- **Offline Disconnect Banner**: `bg-amber-950/80 border-amber-700/50 text-amber-300` badge when internet drops.
- **IndexedDB Vault**: Dexie.js local ledger persistence with automatic queue sync on network restoration.

---

## 🏛️ 9. Official Google Play Policy & Apple HIG Store Readiness Standards (5 Pillars)

### 📌 Pillar 1: UI/UX Layout, Touch Targets & Contrast (`HIG-UI-*`)

1. **Touch Target Boundary Standard (`HIG-TOUCH-44`)**: Minimum `44px x 44px` (Apple HIG) / `48dp x 48dp` (Google Material) clickable touch area on all buttons, micro icons (`BTN-GHOST`), and form selectors.
2. **Contrast & Text Legibility (`HIG-CONTRAST-4.5`)**: Minimum `4.5:1` WCAG AAA contrast ratio on all text. Zero dark-on-dark text allowed (`text-slate-800` on `#0B1C30` is strictly auto-corrected to `text-slate-200`).
3. **Notch & Safe Area Protection (`HIG-SAFE-AREA`)**: Respect `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for Dynamic Island and gesture navigation bars.

### 📌 Pillar 2: Performance, Stability & Zero-Crash Guards (`HIG-PERF-*`)

4. **Zero-White-Screen Defensive Guard (`HIG-CRASH-GUARD`)**: Auth and state initialization MUST be wrapped in defensive try-catch guards to eliminate unhandled promise white-screen crashes.
5. **Cold Boot & Smooth Scrolling (<2.0s / 60fps)**: Initial app mount within 2.0s. Virtualized list rendering for tables exceeding 100 items.
6. **Graceful Offline Data Sync (`HIG-OFFLINE-SYNC`)**: Visual disconnect alert (`TST-OFFLINE`) + local Dexie IndexedDB autosave vault.

### 📌 Pillar 3: User Privacy, Security & Data Safety (`HIG-PRIVACY-*`)

7. **Self-Service Account & Data Deletion Wizard (`HIG-DATA-PURGE`)**: Mandatory data purge wizard in Settings (`purgeClientState`) for Apple 5.1.1(v) & Google Play compliance.
8. **Transparent Permission Disclosure (`HIG-PERM-PROMPT`)**: Clear pre-permission modal before invoking camera for barcode scanning.
9. **Encrypted Storage Vault (`HIG-ENCRYPT-VAULT`)**: Sensitive local PIN codes and passkeys MUST be stored in encrypted format.

### 📌 Pillar 4: Commercial Monetization & Billing Transparency (`HIG-BILLING-*`)

10. **4-Tier Transparent Pricing Display (`HIG-4TIER-PRICING`)**: Transparent rendering of all 4 commercial tiers ($4,999 Self-Host ➔ $299/mo Cloud) with zero hidden fees.
11. **License Verification & Restoration (`HIG-RESTORE-LICENSE`)**: Functional "Restore Purchases / License Verification" button (`BTN-RESTORE`) and verifier modal (`MOD-LICENSE`).

### 📌 Pillar 5: App Content, Metadata & Store Readiness (`HIG-STORE-READY-*`)

12. **Zero-Placeholder Policy (`HIG-ZERO-PLACEHOLDER`)**: Zero `Lorem Ipsum`, missing fallback images, or non-functional placeholder buttons in production code.
13. **Complete Store Metadata Suite (`HIG-STORE-METADATA`)**: App title, privacy policy URL, support email, and high-definition screenshots.

---

## 🛡️ 10. Rule of Layout Non-Destruction (`ABS-RULE-01`) & Exhaustive Defect Resolution Matrix

### Core Law: ABS-RULE-01 (Rule of Layout Non-Destruction)

> No Apple HIG guideline, Google Play Store policy, or token modification is permitted to distort, break, overlap, or clip text/elements on any existing Demon Slayer Design Token layout. All store guidelines MUST be implemented using non-destructive CSS/JS patterns!

### Exhaustive Component Defect Resolution Matrix

1. **`BTN-GHOST` Touch Hit Area**: Keep visual icon size at `20x20px`, but expand touch target via invisible pseudo-element (`.touch-hit-44::before { inset: -8px; min-width: 44px; min-height: 44px; }`). Bounding box remains unaltered.
2. **`BTN-GLOW` Box-Shadow Clipping**: Add `p-2` outer wrapper padding OR switch to inset particle bloom (`shadow-[inset_0_0_15px_rgba(0,229,255,0.4)]`) when inside overflow-hidden parent containers.
3. **`BTN-PRI` Text Contraction**: Apply `whitespace-nowrap flex-shrink-0 shrink-0 text-ellipsis overflow-hidden px-4 py-2.5` to prevent Taglish text from pushing neighbor buttons off-screen.
4. **`CRD-TIER1` Conic GPU Acceleration**: Enforce `will-change: transform; transform: translateZ(0); contain: paint layout;` to eliminate mobile frame drops.
5. **`CRD-KPI` Monospace Number Truncation**: Apply `text-lg sm:text-xl lg:text-2xl font-mono truncate max-w-full` to prevent large figures (`₱12,459,890.00`) from overflowing card borders.
6. **`INP-TEXT` / `INP-NUM` iOS Safari Zoom Prevention**: Mandatory base font-size `16px` (`text-base sm:text-sm`) to stop iOS Safari forced viewport zoom.
7. **`TXT-AREA` Container Lock**: Enforce `resize-y min-h-[100px] max-h-[300px] w-full` to prevent horizontal resize grid breakage.
8. **`TBL-GRID` Mobile Card Stack Transformation**: Auto-transform table rows into mobile card stacks (`block sm:table-row bg-[#071322] border-b border-slate-800 p-4 mb-3 rounded-xl`) on screens `<640px`.
9. **`MOD-CTR` Flex Scroll Architecture**: Enforce `max-h-[90vh] flex flex-col` with `overflow-y-auto` body so modal footers and Save/Cancel action buttons are NEVER pushed off-screen.
10. **`DRW-SIDE` Body Scroll Lock**: Add `document.body.style.overflow = 'hidden'` on drawer mount and restore on unmount.
11. **`TOKEN-LOCK-EXPLICIT-PERMIT` Token Modification Lock**: Before updating, modifying, or creating any new token, class, or rule inside `company_master_design_tokens_spec.md` or `designSystem.js`, the agent MUST explain the proposed token change, rationale, affected components, and visual/functional impact in simple Tagalog/Taglish, and wait 100% for explicit user clearance ("Sige", "Go", "OK", "Proceed") before making the edit!
12. **`MANDATORY-TOKENS-FLEX` Mandatory Token Specification & App-Role Flexibility Directive**: ALL design tokens, card classes (`water-breathing-card`, `flame-breathing-card`, `moving-border-card`, `moving-dotted-border-amber`), liquid frosted glass scrollbars (`SCROLL-CYBER-GLASS`), and uniform 1.5px border standards (`UNIFORM-BORDER-1.5`) inside `company_master_design_tokens_spec.md` are **100% MANDATORY STANDARDS** across all standalone products. However, the specific visual execution (e.g. choice of Breathing Style theme variation, accent colors, kinetic hazard tiers) is **FLEXIBLE based on the specific domain and role of the application**:
    - **Enterprise POS & Inventory (`OmniStock`)**: Tanjiro Midnight Blue (`#050811` + `#00E5FF`) + Ambient Amber Hazard Banners (`BANNER-CORNER-FLAME-VIGNETTE`)
    - **Legal & Statutory AI (`LexAI-Enterprise`)**: Zenitsu Thunder Gold (`#F9E006`) + Midnight Void Surface
    - **DevOps & Infrastructure (`EMS`)**: Muichiro Emerald Mist (`#00E5FF` + `#10B981`)
    - **Marketing & Lead Pipeline (`GHL-PULSE`)**: Rengoku Solar Flame Crimson (`#E11D48` + `#F59E0B`)
    - **Security & Vaults**: Shinobu Wisteria Violet (`#C084FC`)
13. **`DYNAMIC-ISSUE-LEDGER` Dynamic Active Issue Ledger & Audit Script Clearance Protocol**: Every single newly identified issue or visual defect MUST be listed immediately in the Master Issue Audit & Remediation Ledger (`omnistock_master_component_checklist.md`). An issue can ONLY be removed or marked resolved after: (a) Code remediation executed and visually verified in browser, (b) Automated CLI audit script (`audit_contrast_and_colors.py`) run with 100% PASS receipt, and (c) Master Tokens Spec (`company_master_design_tokens_spec.md`) updated.

---

## 🎨 11. Sub-Tinted Light Surfaces, Component Boundaries & Animator Art Border Line Standards

### 🎨 11.1. Character-Tinted Warm Light Surfaces (`TINT-SURFACE-*`)

- **Zero Plain White Rule**: Light mode canvases and card surfaces MUST NEVER use plain stark white (`#FFFFFF`) or cold neutral grey.
- **🔥 Rengoku Flame Solar Tint**: `#FFFBF7` Warm Solar Tinted Canvas, `#FFF7ED` Flame Warm Card Surface, `#FFEDD5` Subtle Flame Inner Glow.
- **🌊 Tanjiro Midnight Mist Tint**: `#F0F9FF` Ice Blue Mist Canvas, `#E0F2FE` Water Ripple Card Surface.
- **⚡ Zenitsu Thunder Gold Tint**: `#FEFCE8` Electric Gold Tinted Canvas, `#FEF08A` Thunder Glow Surface.
- **🦋 Shinobu Wisteria Violet Tint**: `#FAF5FF` Wisteria Violet Tinted Canvas, `#F3E8FF` Petal Surface.

### 📐 11.2. Sub-Tint Component Boundary Highlighting (`LAY-TAB-BOUND`)

- **Visual Separation Directive**: Adjacent tabs, split views, or side-by-side sub-components MUST use a distinct sub-tint shift to clearly emphasize component boundaries (`oh, hindi ito parte ng component na yan!`).
- **Active Tab Accent**: Active tabs use `bg-[#FFF3E0] border-b-2 border-[#EA580C] text-[#C2410C] font-bold shadow-sm`.
- **Inactive Adjacent Tab**: Inactive tabs use `bg-[#FFFBF7] text-slate-500 hover:bg-[#FFEAD5] hover:text-[#EA580C]`.

### 🖌️ 11.3. Ukiyo-e Anime Animator Arts Inspired Border Line Designs (`ANIM-BORDER-*`)

- **Animator Art Border Standard**: Hairline 1px / 2px borders inspired by traditional Ukiyo-e anime production drawings.
- **🔥 Flame Ember Hairline Border**: `border-1px border-[#FDBA74]/60 hover:border-[#EA580C] transition-colors duration-200` with subtle 4px corner notch styling.
- **⚡ Thunder Lightning Hairline Border**: `border-1px border-[#FDE047]/60 hover:border-[#F9E006] shadow-[0_0_8px_rgba(249,224,6,0.25)]`.
- **🌊 Water Dragon Ripple Border**: `border-1px border-[#38BDF8]/60 hover:border-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.25)]`.

### 🔮 11.4. Dynamic Inner Vignette Ambient Gradient Matrix (`VIGNETTE-FLEX-*`)

- **Flexible Theme Adaptation Directive**: The Inner Vignette Ambient Gradient MUST automatically shift its inner radial gradient color variables to match the selected base character theme token:
  1. **🌊 Tanjiro Cyber / Midnight Blue**: `radial-gradient(120% 120% at 50% 0%, rgba(0, 229, 255, 0.12) 0%, rgba(37, 99, 235, 0.05) 50%, rgba(11, 28, 48, 0.85) 100%)`
  2. **🔥 Rengoku Solar Flame Orange**: `radial-gradient(120% 120% at 50% 0%, rgba(245, 158, 11, 0.16) 0%, rgba(225, 29, 72, 0.08) 50%, rgba(20, 10, 15, 0.88) 100%)`
  3. **⚡ Zenitsu Thunder Gold**: `radial-gradient(120% 120% at 50% 0%, rgba(249, 224, 6, 0.16) 0%, rgba(245, 158, 11, 0.08) 50%, rgba(12, 16, 24, 0.88) 100%)`
  4. **🦋 Shinobu Wisteria Violet**: `radial-gradient(120% 120% at 50% 0%, rgba(192, 132, 252, 0.15) 0%, rgba(139, 92, 246, 0.06) 50%, rgba(15, 10, 30, 0.88) 100%)`
  5. **🌫️ Muichiro Emerald Mist**: `radial-gradient(120% 120% at 50% 0%, rgba(0, 229, 255, 0.08) 0%, rgba(16, 185, 129, 0.04) 50%, rgba(7, 19, 34, 0.85) 100%)`

### 🎨 11.5. Universal Default Border Color Inheritance Directive (`BORDER-BASE-INHERIT`)

- **Zero Cold Neutral Border Directive**: Uncolored, plain cold grey borders (`border-gray-200`, `border-slate-800`) are STRICTLY FORBIDDEN. All container, card, input, and modal borders MUST inherit the active base design accent color tint (`rgba(37, 99, 235, 0.40)` for Tanjiro Electric Blue, `rgba(245, 158, 11, 0.45)` for Rengoku Solar Amber, `rgba(249, 224, 6, 0.45)` for Zenitsu Gold).
- **CSS Implementation Rule**:
  ```css
  .border-slate-800, .border-slate-800\/80, .border-slate-700 {
    border-color: rgba(37, 99, 235, 0.40) !important; /* Automatic Design Base Accent Tint Inheritance */
  }
  ```

### 📐 11.6. Strict 1.5px Uniform Border Line Standard (`UNIFORM-BORDER-1.5`)

- **Mathematical Box Alignment Rule**: ALL card classes (`water-breathing-card`, `flame-breathing-card`, `thunder-breathing-card`, `glass-fantasy-cyber`, `glass-fantasy-mystic`) MUST use a STRICT UNIFORM 1.5px BORDER WIDTH (`border: 1.5px solid ... !important`) around all 4 sides in default idle state.
- **Prohibition of Asymmetric Border Widths**: Asymmetric border widths (e.g. 2.5px top border vs 1px side border) are STRICTLY FORBIDDEN in default state to guarantee 100% mathematical visual alignment across side-by-side card grids.

### 📜 11.7. True Frosted Glassmorphic Custom Scrollbar Standard (`SCROLL-CYBER-GLASS`)

- **Zero OS Default Scrollbar Directive**: Default browser white/grey scrollbars are STRICTLY FORBIDDEN. All scrollbars across window, modal dialogs, data tables, and sidebars MUST use the 100% True Frosted Glassmorphic Custom Scrollbar Suite.
- **Frosted Glass Scrollbar Spec**:
  - **Width / Height**: 8px width / 8px height.
  - **Translucent Glass Track**: `background: rgba(11, 28, 48, 0.45); backdrop-filter: blur(12px); border-left: 1px solid rgba(37, 99, 235, 0.35);`
  - **Liquid Cyber Glass Thumb**: `linear-gradient(180deg, rgba(0, 229, 255, 0.65) 0%, rgba(37, 99, 235, 0.65) 60%, rgba(29, 78, 216, 0.75) 100%); backdrop-filter: blur(16px); border: 2px solid rgba(11, 28, 48, 0.60);`
  - **Top Glass Crystal Highlight**: `inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)` top edge crystal highlight + inner cyan neon ambient glow (`inset 0 0 8px 0 rgba(0, 229, 255, 0.3)`).
  - **Hover Glow**: `box-shadow: 0 0 16px rgba(0, 229, 255, 0.85)` Cyan neon glow on hover.

### ⚡ 11.8. Ambient Corner Flame Vignette & Liquid Amber Melt Standard (`BANNER-CORNER-FLAME-VIGNETTE`)

- **Alert Banner Design Spec**:
  - **Surface & Vignette**: Translucent Cyber Cyan Glass (`rgba(11, 28, 48, 0.88)`) with **Ambient Amber Flame Corner Vignettes** (`radial-gradient(ellipse 70% 70% at 0% 0%, rgba(245, 158, 11, 0.14) 0%, transparent 65%)` and `at 100% 100%`) seamlessly fusing the inner glass with outer laser borders.
  - **Single-Point HSL Spectrum Interpolation**: Single degree points at `hsl(348, 85%, 55%) 32deg` (Red) ➔ `hsl(24, 95%, 53%) 52deg` (Orange) ➔ `hsl(48, 96%, 53%) 72deg` (Yellow) omitting explicit degree ranges to eliminate hard color boundaries.
  - **Liquid Blur Melt + 4-Tone 3D Drop-Shadow Trail**: `filter: blur(1.5px) drop-shadow(0 0 4px hsl(348, 85%, 55%)) drop-shadow(0 0 10px hsl(24, 95%, 53%)) drop-shadow(0 0 18px hsl(48, 96%, 53%)) drop-shadow(0 0 28px rgba(253, 224, 71, 0.90))` attached directly to the `::before` pseudo-element for a liquid 3D fiery laser trail!
  - **Ergonomic Slow Speed**: 20-second slow rotation loop (`animation: rotate-border 20s linear infinite`) for zero eye strain.
  - **Header & Badging**: Cyber Cyan Header Text (`text-cyan-300`) + Amber Item Count Badge (`bg-amber-900/80 text-amber-200`) + Pulsing Amber Warning Icon.

### 🔔 11.9. 4-Color 3D Volumetric Icon-Only Glow KPI Card Standard (`ICON-GLOW-3D-4COLOR`)

- **Uniform Container Base Border Directive**: All KPI stat cards in grid view MUST use identical default container borders (`water-breathing-card` base border) to maintain 100% mathematical grid alignment. Outer container boxes MUST NOT glow or change border colors in default state.
- **4-Color 3D Volumetric Icon Glow Pulse**: Highlighting hazard alerts (e.g. Stock Alerts) MUST be achieved strictly by applying a 4-color volumetric glowing pulse (`animate-icon-glow-amber`) ONLY onto the icon container badge (`w-10 h-10`):
  1. **Crimson Red Core**: `rgba(244, 63, 94, 0.75 ➔ 0.95)` inner core
  2. **Flame Orange Mid Body**: `rgba(249, 115, 22, 0.65 ➔ 0.85)` body
  3. **Vivid Yellow Outer Halo**: `rgba(253, 224, 71, 0.50 ➔ 0.75)` halo
  4. **Cyber Cyan Ambient Rim**: `rgba(0, 229, 255, 0.35 ➔ 0.55)` ambient rim

### 📊 11.10. Low Stock Alert Progress Widget Standard (`WIDGET-LOW-STOCK-STD`)

- **Container Alignment**: Must use `water-breathing-card` default container border. Ad-hoc legacy border classes (`border-red-500/30`, `border-l-4`) are strictly forbidden.
- **Deep Frosted Dark Track**: Progress bar track background MUST use deep frosted dark track (`bg-[#071322]/90 border border-slate-800/80`). Plain white/light-grey tracks (`bg-slate-100`, `bg-white`) are strictly forbidden in dark mode.
- **Frosted Glass Action Buttons**: Restock action buttons MUST use `DESIGN_TOKENS.buttons.secondary` (`bg-[#071322] border-slate-700/80 hover:border-[#00E5FF]/60 hover:text-white hover:bg-[#0E1E36]`).

### 🌑 11.11. Strict Uniform Subtle Ambient Shadow Standard (`UNIFORM-SUBTLE-SHADOWS`)

- **Idle State Elevation**: All container cards (`water-breathing-card`, `glass-fantasy-cyber`, `glass-fantasy-flame`, `glass-fantasy-mystic`) MUST use a uniform, clean, subtle ambient shadow in idle state:
  `box-shadow: 0 4px 20px 0 rgba(5, 8, 17, 0.45), 0 0 10px 0 rgba(0, 229, 255, 0.12), inset 0 0 20px 0 rgba(0, 229, 255, 0.06) !important;`
  Heavy dark drop shadows (`shadow-2xl`, `0 10px 36px rgba(0,0,0,0.8)`) are strictly forbidden in idle state to prevent visual depth clutter.

### 📖 11.12. Monochromatic Luminance Typography System (`MONO-LUMINANCE-TYPOGRAPHY`)

- **Level 1 (Highest Emphasis - Main Headers)**: `100% Plain Crystal White (#FFFFFF / text-white)` with `font-extrabold tracking-tight`. Plain white is strictly reserved for main page headers and hero titles.
- **Level 2 (High Emphasis - Card Headers & Subtitles)**: `Bright Ice White (#F8FAFC / text-slate-100)` with `font-bold tracking-wide`.
- **Level 3 (Body & Input Labels)**: `Soft Readable Slate (#CBD5E1 / text-slate-300)` with `font-semibold`.
- **Level 4 (Muted Metadata & Captions)**: `Subtle High-Contrast Slate (#94A3B8 / text-slate-400)` with `font-medium font-mono`. Never drop below 11px or contrast below 4.5:1 against dark navy background surface `#0B1C30`.
- **Special Semantic Accents (Strict Information Context Only)**:
  - **Amber / Rengoku Ember (`#F59E0B`)**: Strictly reserved for Warnings & Low Stock Alerts.
  - **Crimson Red (`#E11D48`)**: Strictly reserved for Out of Stock & Destructive Action Badges.
  - **Beast Emerald (`#10B981`)**: Strictly reserved for Success & Completed Transaction Indicators.

### 📐 11.13. Font Size Scale & Usage Decision Tree (`FONT-SCALE-DECISION-TREE`)

- **Absolute Minimum Limit**: `11px (0.6875rem / text-[11px] font-mono)` — No text element is permitted to fall below 11px. Reserved exclusively for timestamps, version metadata, and commit hashes.
- **Input Base Font Guard**: `16px (1.0rem / text-base sm:text-sm)` — Mandatory on all `<input>`, `<textarea>`, and `<select>` fields to prevent mobile browser forced viewport zooming.
- **H1 Page Title Scale**: `28px–32px (1.75–2.0rem / text-2xl sm:text-3xl font-extrabold)`.
- **H2 Card Header Scale**: `18px–20px (1.125rem / text-base sm:text-lg font-bold)`.
- **H3 Subheader Scale**: `14px–16px (0.875–1.0rem / text-xs sm:text-sm font-semibold)`.
- **Monospace Currency & Metrics**: `16px–24px (1.0–1.5rem / text-sm sm:text-xl font-mono font-bold)`.

### 🔐 11.14. Admin Login Portal Remediation Standard (`LOGIN-PORTAL-REM-01`)

- **CyberGlass Brand Header Icon**: Brand icon badge MUST use `DESIGN_TOKENS.icons.cyberGlass` (`bg-[#0B1C30]/80 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.25)]`).
- **Input Focus Ring & 16px Guard**: Input fields MUST use `focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]` with `text-base sm:text-sm` font size guard.
- **Password Visibility Toggle**: Password fields MUST feature an interactive `Eye` / `EyeOff` lucide icon button that toggles input masking dynamically.
- **Glowing Action Button**: Primary Sign In button MUST feature cyan ambient glow shadow (`shadow-[0_0_20px_rgba(0,229,255,0.3)]`) and rotating `Loader2` spinner feedback icon in loading state.

### 📊 11.15. Executive Dashboard Remediation Standard (`DASHBOARD-REM-02`)

- **KPI Card Typography**: KPI titles MUST use `DESIGN_TOKENS.typography.h3` (`text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-wider font-mono`), and values MUST use `DESIGN_TOKENS.typography.currency` (`JetBrains Mono` for monetary numbers).
- **Recharts Tooltip & Grid Sync**: Tooltips MUST inherit `DESIGN_TOKENS.charts.tooltipStyle` (`#071322` dark navy surface + `#00E5FF` cyan border + `JetBrains Mono` values), and axes ticks MUST use Muted Slate (`#94A3B8`).
- **Recent Sales Table List**: Section header MUST use `DESIGN_TOKENS.typography.h2` (`Bright Ice White #F8FAFC`), and monetary amounts MUST be formatted via `DESIGN_TOKENS.formatCurrency()`.
- **Container Interactivity Compliance**: Layout cards containing child links ("View all") MUST use Read-Only Tier 2 Container styling (`DESIGN_TOKENS.containerInteractivity.readOnlyTier2 / water-breathing-card`) to enforce Criterion 4 of `CONTAINER-INTERACTIVITY-STD`.

### 🛒 11.16. Point-of-Sale Cashier Console Remediation Standard (`POS-CASHIER-REM-03`)

- **Product Grid Tiles (Tier 1 Interactive)**: Product grid tiles MUST use `DESIGN_TOKENS.containerInteractivity.interactiveTier1` (`moving-border-card app-card-hover cursor-pointer active:scale-[0.98]`). Titles MUST use `Bright Ice White (#F8FAFC)`, and prices MUST be formatted via `DESIGN_TOKENS.formatCurrency()`.
- **Barcode Search Input Guard**: Barcode and product search input MUST use `DESIGN_TOKENS.forms.input` (`focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]`) with base font size `16px` (`text-base sm:text-sm`) to prevent forced mobile browser viewport zoom.
- **Category Filter Pills**: Active category pill MUST use `bg-[#2563EB] text-white border border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)]`.
- **Active Cart Panel**: Cart title MUST use `DESIGN_TOKENS.typography.h2` (`Bright Ice White #F8FAFC`), and item unit prices, subtotals, and totals MUST be formatted via `DESIGN_TOKENS.formatCurrency()` (`JetBrains Mono`).

### 📦 11.17. Inventory & Products Registry Remediation Standard (`INVENTORY-REGISTRY-REM-04`)

- **Page Header Typography**: Page title MUST use `DESIGN_TOKENS.typography.h1` (`text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans`), and subtitle metadata MUST use `DESIGN_TOKENS.typography.muted`.
- **Search Bar 16px Font Guard**: Product search input MUST use `DESIGN_TOKENS.forms.input` (`focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]`) with base font size `16px` (`text-base sm:text-sm`) to prevent forced mobile browser viewport zoom.
- **Filter Select Dropdowns**: Category and Status Select triggers MUST use `border-slate-700/80 focus:border-[#00E5FF]` with `text-base sm:text-sm`.
- **Action Buttons Upgrade**: Primary *Add Product* button MUST feature cyan ambient glow shadow (`shadow-[0_0_20px_rgba(0,229,255,0.3)]`), and secondary buttons (*Export*, *Import*, *Scan*, *AI Catalogue*) MUST use `DESIGN_TOKENS.buttons.secondary`.

### 👥 11.18. Customer CRM, Sales Reports & Settings Remediation Standard (`CRM-REPORTS-SETTINGS-REM-05`)

- **Customer CRM Form Input Guard**: Search inputs, text fields, and textareas in `Customers.jsx` MUST use `DESIGN_TOKENS.forms.input` (`focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]`) with base font size `16px` (`text-base sm:text-sm`) to eliminate forced mobile browser viewport zoom.
- **Glowing Action Buttons**: Primary action buttons (*Add Customer*) MUST feature cyan ambient glow shadow (`shadow-[0_0_20px_rgba(0,229,255,0.3)]`) and `Loader2` spinning feedback icons during async save triggers.
- **Defensive Database Data Load Guards**: `loadData()` queries in `Customers.jsx`, `SalesReport.jsx`, and `Settings.jsx` MUST be wrapped in robust `try-catch` blocks with `.catch(() => [])` fallbacks so IndexedDB or network exception errors never lock application modules in a loading state.
- **Monochromatic Page Header Typography**: Page headers across CRM, Sales Reports, and Settings MUST inherit `DESIGN_TOKENS.typography.h1` (`text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans`) and `DESIGN_TOKENS.typography.muted`.

### ⚔️ 11.19. Universal Deep Exhaustive Project Audit & Evaluation Master Suite (`master_project_audit.py`)

- **Executable CLI Audit Script Path**: `.agents/scripts/master_project_audit.py`
- **Command Signature**: `python .agents/scripts/master_project_audit.py [target_directory]`
- **10 Mandatory Audit Checkpoints**:
  1. `MONO-LUMINANCE-TYPOGRAPHY`: Plain Crystal White H1 (`#FFFFFF`), Bright Ice White H2 (`#F8FAFC`), Soft Slate Body (`#CBD5E1`), Muted Slate (`#94A3B8`). Flags forbidden ad-hoc font colors outside semantic state badges.
  2. `INPUT-FONT-GUARD`: Enforces `16px` base font size guard (`text-base` / `DESIGN_TOKENS.forms.input`) on all `<input>`, `<textarea>`, and `<select>` tags to eliminate mobile browser viewport auto-zoom shifts.
  3. `CONTAINER-INTERACTIVITY-STD`: Verifies interactive cards implement Tier 1 (`moving-border-card`/`interactiveTier1`) or Tier 2 (`water-breathing-card`/`readOnlyTier2`) container tokens.
  4. `TRY-CATCH-DEFENSE-GUARD`: Verifies async data fetch and database calls are enclosed within `try-catch` blocks and `.catch(() => [])` fallbacks.
  5. `UNIFORM-BORDER-SCROLLBAR`: Validates 1.5px uniform border width standard and `SCROLL-CYBER-GLASS` custom scrollbar specification.
  6. `UNIFORM-SUBTLE-SHADOWS`: Validates uniform subtle ambient shadows (`box-shadow: 0 4px 20px rgba(5,8,17,0.45)`).
  7. `FORM-EYE-VALIDATION`: Verifies password input forms feature interactive `Eye` / `EyeOff` visibility toggle buttons.
  8. `GLOWING-ACTION-BUTTONS`: Verifies primary submit buttons incorporate ambient cyan glow (`shadow-[0_0_20px_rgba(0,229,255,0.3)]`) and `Loader2` spinners.
  9. `4-TIER-LICENSING-BAR`: Verifies layout renders 4-Tier Commercial Licensing Footer Bar (`SOFTWARE FACTORY`, `Self-Host`, `White-Label`, `Source Code IP`, `Hosted Cloud SaaS`).
  10. `ZERO-BYPASS-AUTH-GUARD`: Verifies defensive auth initialization guards preventing white-screen crashes when unconfigured offline.

---

## 📐 13. Card & Widget Container Dimension & Sizing Specification (Compact Ergonomic Standard)

Upang maiwasan ang malalim na scrolling at oversized elements, ang lahat ng card at widget containers ay DAPAT sumunod sa **Compact Ergonomic Dimension Guidelines**:

### 13.1. Standard Container Padding & Spacing Scale
- **Primary Page Wrapper**: `space-y-4 md:space-y-5` (Maximum `space-y-6`). Huwag gumamit ng `space-y-8` o `space-y-12` na lumilikha ng sobrang layong agwat.
- **Master Engine & Section Containers**: `p-4 md:p-5` rounded-2xl (`rounded-2xl bg-[#1B1E23] border border-slate-800 shadow-lg`).
- **Inner Stat & Metric Cards**: `p-3 md:p-3.5` rounded-xl (`rounded-xl bg-[#12161D] border border-slate-800 shadow-md`).
- **Bento Analytics Tiles**: `p-3.5 md:p-4` rounded-xl (`rounded-xl bg-[#1B1E23] border border-slate-800`).

### 13.2. Container Height Clamping Standards
- **Subagent Engine Cards Grid**: Mapipinto sa uniform `h-full flex flex-col justify-between` na may target container height na `~280px` hanggang `320px`.
- **Department Cluster Cards**: Target height na `h-[125px]` hanggang `h-[140px]`.
- **SVG & Canvas Analytics Viewports**: Max height `130px` - `140px` (min-h `120px`). Huwag lumampas sa `220px`.
- **Global Map & Schematic Containers**: Aspect ratio na `aspect-[28/9]` o `aspect-[21/9]`.

### 13.3. Text Truncation & Badge Overflow Guards
- **Card Badges**: Lahat ng status badges sa narrow 4-column cards ay DAPAT may `shrink-0` at font size na `text-[9px]` hanggang `text-[10px]` para hindi umapaw lampas sa border line ng card.
- **Metric Labels**: Ang mga text label tulad ng *Parity Ratio*, *Net Pay*, at *Sample Records* ay DAPAT may `truncate` at `min-w-0` sa flex layout parent (`flex items-baseline justify-between min-w-0 gap-1`).

### 13.4. Dashboard Breakthrough Suite Modules Inventory (100% Token Compliant)
Lahat ng 12 Breakthrough Subagent Modules sa `Dashboard.tsx` na ipinapakita sa mga screenshots ay ganap na nakasama at sumusunod sa ating Master Specification:
1. **EcosystemIntegrationsHub**: 8 Connectors Bento grid (`p-4 md:p-5 rounded-2xl bg-[#1B1E23] border border-slate-800`), inner connector tiles (`bg-[#12161D] border border-slate-800 p-3`).
2. **DesktopAppInstallShowcase**: Native Desktop installer showcase card (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
3. **EnterprisePriceComparisonMatrix**: Interactive 3-Option Pricing Matrix (`Option A`, `Option B`, `Option C - EMS Turnkey`) na may interactive slider (`bg-[#12161D] border border-slate-800`).
4. **AgenticHrSwarmOrchestrator**: 4 Swarm Module Tiles (`Audit & Escrow`, `Mobility & Burnout`, `Autonomous Sourcing`, `Regulatory Governance`) sa `bg-[#12161D] border border-slate-800` surfaces.
5. **SkillsMobilityGraphEngine**: Graph neural inference card (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
6. **WasmWorkforceAnalyticsEngine**: WebAssembly SIMD 128-bit worker engine (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
7. **AutonomousPayrollEscrowEngine**: ZKP salary privacy & tax vault (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
8. **SpatialWorkforceCommandCenter**: 3D spatial presence matrix card (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
9. **AirGappedDisasterRecoveryVault**: Air-gapped DR vault card (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
10. **HumanInTheLoopGovernanceShield**: Governance shield card (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
11. **VoiceBiometricAssistCopilot**: Voice copilot card (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
12. **QuantumMonteCarloBudgetSimulator**: Monte Carlo risk simulator card (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
13. **FairnessAlgorithmicBiasAuditor**: EEOC 4/5ths parity auditor (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
14. **RealTimePayrollEngine**: Zero-Lag WebWorker tax withholding engine (`bg-[#1B1E23] border border-slate-800 p-4 md:p-5`).
16. **GamifiedMicroLearningEngine**, **ErgonomicWorkplaceSynthesizer**, & **SelfHealingDatabaseEngine**: Triple bento analytics grid.

### 13.5. Component Category Classification Table (`CRD-SUBAGENT` / `CRD-HUB` / `CRD-MATRIX`)
Lahat ng Dashboard Breakthrough components ay nakagrupo sa mga sumusunod na official component token categories:

| Component Identifier | Component Category Name | Subagent / Module Name | Container Sizing Token Rules |
| :--- | :--- | :--- | :--- |
| `CRD-HUB` | Ecosystem Integration Hub | `EcosystemIntegrationsHub` | `p-4 md:p-5 rounded-2xl bg-[#1B1E23] border border-slate-800` |
| `CRD-SHOWCASE` | Desktop Installer Showcase | `DesktopAppInstallShowcase` | `p-4 md:p-5 rounded-2xl bg-[#1B1E23] border border-slate-800` |
| `CRD-MATRIX` | Enterprise ROI Pricing Matrix | `EnterprisePriceComparisonMatrix` | `p-4 md:p-5 rounded-2xl bg-[#1B1E23] border border-slate-800` |
| `CRD-SWARM` | Agentic Swarm Network | `AgenticHrSwarmOrchestrator` | `p-4 md:p-5 rounded-2xl bg-[#1B1E23] border border-slate-800`, 4 tiles `p-3` |
| `CRD-SUBAGENT` | Autonomous AI Engine Cards | `SkillsMobilityGraphEngine`, `WasmWorkforceAnalyticsEngine`, `AutonomousPayrollEscrowEngine`, `SpatialWorkforceCommandCenter`, `AirGappedDisasterRecoveryVault`, `HumanInTheLoopGovernanceShield`, `VoiceBiometricAssistCopilot`, `QuantumMonteCarloBudgetSimulator`, `FairnessAlgorithmicBiasAuditor`, `RealTimePayrollEngine` | `p-4 md:p-5 rounded-2xl bg-[#1B1E23] border border-slate-800 h-full flex flex-col justify-between` (`max-h-[320px]`) |

---

## 📁 14. File References & Deployment

- **Master Specification Path**: [company_master_design_tokens_spec.md](file:///c:/Users/Admin/.antigravity-ide/company_master_design_tokens_spec.md)
- **JavaScript Export Module**: [designSystem.js](file:///c:/Users/Admin/.antigravity-ide/omnistock/src/lib/designSystem.js)
- **Universal Audit Script**: [master_project_audit.py](file:///c:/Users/Admin/.antigravity-ide/.agents/scripts/master_project_audit.py)
