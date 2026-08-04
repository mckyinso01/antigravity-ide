# ⚔️ Demon Slayer Cyber Glass Master Design Tokens Specification

> **Canonical System Specification**: Single Source-of-Truth Human-Readable Spec  
> **Token Specification**: Demon Slayer Cyber Glass Master Design Tokens v3.5.0  
> **Canonical Source**: [master_tokens.json](file:///design/tokens/master_tokens.json)  

---

## 📖 How to Use

### For Designers
- Use **`master_tokens.json`** as the absolute ground truth for all visual specs, Figma design tokens, and UI component definitions.
- Always inherit one of the official **Demon Slayer Theme Variations** (`⚡ Zenitsu Gold`, `🌊 Tanjiro Blue`, `🌫️ Muichiro Cyan`, `🔥 Rengoku Crimson`, `🦋 Shinobu Violet`).
- Ensure all cards enforce 100% Solid Dark Navy (`#0B1C30`) interior surfaces with zero animation bleed.

### For Developers
- Import tokens directly from `@/design/designSystem` (or `design/designSystem.ts` / `design/designSystem.js`).
- Inject CSS variables into the `:root` document context using `cssVariables()` from `designSystem`.
- Consume CSS variables (e.g. `var(--action-primary)`, `var(--surface-dark)`, `var(--border-width-standard)`) across custom CSS / Tailwind styles.

---

## 📋 Table of Contents
- [1. Colors](#1-colors)
- [2. Typography](#2-typography)
- [3. Borders](#3-borders)
- [4. Shadows](#4-shadows)
- [5. Buttons](#5-buttons)
- [6. Motion](#6-motion)
- [7. Non-Negotiables](#7-non-negotiables)
- [8. Examples](#8-examples)
- [9. How to Sync](#9-how-to-sync)
- [10. Change Log](#10-change-log)
- [11. Acceptance Criteria Checklist](#11-acceptance-criteria-checklist)

---

## 🎨 1. Colors

### Surface Colors
| Token JSON Key | Token Value | CSS Variable | Usage Guidance | Example |
|---|---|---|---|---|
| `colors.surface.dark` | `#050811` | `--surface-dark` | Primary full-page void background surface | `bg-[#050811]` |
| `colors.surface.card` | `#0B1C30` | `--surface-card` | Solid container card interior surface | `bg-[#0B1C30]` |
| `colors.surface.cardFrosted` | `rgba(11, 28, 48, 0.8)` | `--surface-card-frosted` | Translucent frosted glass panel surface | `backdrop-blur-xl bg-[#0B1C30]/80` |
| `colors.surface.overlay` | `rgba(5, 8, 17, 0.85)` | `--surface-overlay` | Modal & drawer backdrop overlay | `bg-black/85 backdrop-blur-md` |

### Action Colors
| Token JSON Key | Token Value | CSS Variable | Usage Guidance | Example |
|---|---|---|---|---|
| `colors.action.primary` | `#2563EB` | `--action-primary` | Standard primary brand blue action fill | `bg-[#2563EB]` |
| `colors.action.primaryHover` | `#1D4ED8` | `--action-primary-hover` | Hover state for primary action buttons | `hover:bg-[#1D4ED8]` |
| `colors.action.cyan` | `#00E5FF` | `--action-cyan` | Muichiro mist cyan accent for DevOps & telemetry | `text-[#00E5FF]` |
| `colors.action.emerald` | `#10B981` | `--action-emerald` | Success states, qualified lead badges & price text | `text-[#10B981]` |
| `colors.action.amber` | `#F59E0B` | `--action-amber` | Solar amber warnings & active status badges | `text-[#F59E0B]` |
| `colors.action.rose` | `#E11D48` | `--action-rose` | Rengoku crimson flame alerts & destructive CTAs | `bg-[#E11D48]` |
| `colors.action.violet` | `#8B5CF6` | `--action-violet` | Shinobu wisteria violet security & escrow badges | `text-[#8B5CF6]` |

### Text Colors
| Token JSON Key | Token Value | CSS Variable | Usage Guidance | Example |
|---|---|---|---|---|
| `colors.text.crystalWhite` | `#FFFFFF` | `--text-crystal-white` | Level 1 High-contrast H1 titles & headers | `text-[#FFFFFF]` |
| `colors.text.iceWhite` | `#F8FAFC` | `--text-ice-white` | Level 2 Body text & paragraph copy | `text-[#F8FAFC]` |
| `colors.text.slateMuted` | `#94A3B8` | `--text-slate-muted` | Level 3 Subtitles, captions & muted metadata | `text-[#94A3B8]` |
| `colors.text.slateDim` | `#64748B` | `--text-slate-dim` | Disabled text, placeholders & footer labels | `text-[#64748B]` |

### Border Colors
| Token JSON Key | Token Value | CSS Variable | Usage Guidance | Example |
|---|---|---|---|---|
| `colors.border.subtle` | `#1E293B` | `--border-subtle` | Subtle card & layout divider lines | `border-[#1E293B]` |
| `colors.border.standard` | `rgba(30, 41, 59, 0.8)` | `--border-standard` | Standard card container perimeter border | `border-[#1E293B]/80` |
| `colors.border.highlight` | `rgba(37, 99, 235, 0.5)` | `--border-highlight` | Active container highlight border | `border-[#2563EB]/50` |
| `colors.border.cyanGlow` | `rgba(0, 229, 255, 0.4)` | `--border-cyan-glow` | Hover cyan particle bloom border | `border-[#00E5FF]/40` |
| `colors.border.amberGlow` | `rgba(245, 158, 11, 0.4)` | `--border-amber-glow` | Warning & highlight card border | `border-[#F59E0B]/40` |

---

## 🔤 2. Typography

| Token JSON Key | Token Value | CSS Variable | Usage Guidance | Example |
|---|---|---|---|---|
| `typography.fontHeader` | `Inter, Space Grotesk, sans-serif` | `--font-header` | Primary headline font family | `font-display` |
| `typography.fontBody` | `Inter, Plus Jakarta Sans, sans-serif` | `--font-body` | Standard body copy font family | `font-sans` |
| `typography.fontMono` | `JetBrains Mono, monospace` | `--font-mono` | Metrics, prices, code, latencies, SKUs | `font-mono` |
| `typography.sizes.xs` | `0.75rem` | `--font-size-xs` | Badges, tooltips, caption labels (12px) | `text-xs` |
| `typography.sizes.sm` | `0.875rem` | `--font-size-sm` | Secondary button labels, table text (14px) | `text-sm` |
| `typography.sizes.base` | `1rem` | `--font-size-base` | Base body text, mobile form inputs (16px) | `text-base` |
| `typography.sizes.lg` | `1.125rem` | `--font-size-lg` | Card titles, modal headers (18px) | `text-lg` |
| `typography.sizes.xl` | `1.25rem` | `--font-size-xl` | Section titles (20px) | `text-xl` |
| `typography.sizes.2xl` | `1.5rem` | `--font-size-2xl` | Sub-page headers (24px) | `text-2xl` |
| `typography.sizes.3xl` | `1.875rem` | `--font-size-3xl` | Page H1 headlines (30px) | `text-3xl` |
| `typography.sizes.4xl` | `2.25rem` | `--font-size-4xl` | Hero marketing headers (36px) | `text-4xl` |

---

## 📐 3. Borders

| Token JSON Key | Token Value | CSS Variable | Usage Guidance | Example |
|---|---|---|---|---|
| `borders.width.thin` | `1px` | `--border-width-thin` | Light subtle divider lines | `border` |
| `borders.width.standard` | `1.5px` | `--border-width-standard` | Authoritative Ukiyo-e ink-stroked container border | `border-[1.5px]` |
| `borders.width.thick` | `2px` | `--border-width-thick` | Moving border line & active focus outline | `border-2` |
| `borders.radius.md` | `0.5rem` | `--border-radius-md` | Small badges & tooltips (8px) | `rounded-md` |
| `borders.radius.lg` | `0.75rem` | `--border-radius-lg` | Input fields & secondary buttons (12px) | `rounded-xl` |
| `borders.radius.xl` | `1rem` | `--border-radius-xl` | Cards & modal dialog containers (16px) | `rounded-2xl` |
| `borders.radius.2xl` | `1.5rem` | `--border-radius-2xl` | Kinetic moving border card outer shell (24px) | `rounded-3xl` |
| `borders.radius.full` | `9999px` | `--border-radius-full` | Circular pill indicators & avatars | `rounded-full` |

---

## 🌫️ 4. Shadows

| Token JSON Key | Token Value | CSS Variable | Usage Guidance | Example |
|---|---|---|---|---|
| `shadows.glowCyan` | `0 0 20px rgba(0, 229, 255, 0.2)` | `--shadow-glow-cyan` | Cyan particle hover bloom shadow | `shadow-[0_0_20px_rgba(0,229,255,0.2)]` |
| `shadows.glowBlue` | `0 0 20px rgba(37, 99, 235, 0.3)` | `--shadow-glow-blue` | Primary blue action button elevation | `shadow-[0_0_20px_rgba(37,99,235,0.3)]` |
| `shadows.glowAmber` | `0 0 20px rgba(245, 158, 11, 0.3)` | `--shadow-glow-amber` | Zenitsu gold & solar amber button glow | `shadow-[0_0_20px_rgba(245,158,11,0.3)]` |
| `shadows.glowRose` | `0 0 20px rgba(225, 29, 72, 0.3)` | `--shadow-glow-rose` | Destructive danger action button elevation | `shadow-[0_0_20px_rgba(225,29,72,0.3)]` |
| `shadows.cardElevation` | `0 10px 25px -5px rgba(0, 0, 0, 0.5)` | `--shadow-card-elevation` | Standard floating card drop shadow | `shadow-2xl` |

---

## 🔘 5. Buttons

| Token JSON Key | Property | Token Value | Usage Guidance |
|---|---|---|---|
| `buttons.primary` | `background` | `#2563EB` | Standard primary brand action button fill |
| `buttons.primary` | `text` | `#FFFFFF` | Primary button text color |
| `buttons.primary` | `border` | `1px solid rgba(37, 99, 235, 0.5)` | Primary button border line |
| `buttons.primary` | `shadow` | `0 0 16px rgba(37, 99, 235, 0.4)` | Primary button cyan/blue glow shadow |
| `buttons.glowingAction` | `background` | `linear-gradient(135deg, #2563EB, #00E5FF)` | Flagship revenue & checkout action trigger (`BTN-GLOW`) |
| `buttons.glowingAction` | `text` | `#FFFFFF` | Glowing CTA button text color |
| `buttons.glowingAction` | `border` | `1px solid rgba(0, 229, 255, 0.6)` | Glowing CTA border line |
| `buttons.glowingAction` | `shadow` | `0 0 20px rgba(0, 229, 255, 0.4)` | Glowing CTA ambient bloom shadow |
| `buttons.secondary` | `background` | `#071322` | Dark secondary card button fill |
| `buttons.secondary` | `text` | `#F8FAFC` | Secondary button text color |
| `buttons.danger` | `background` | `rgba(159, 18, 57, 0.8)` | Destructive action button fill (`BTN-DANGER`) |
| `buttons.danger` | `text` | `#FECDD3` | Destructive button text color |
| `buttons.ghost` | `background` | `transparent` | Minimal icon & text trigger button fill |

---

## ⚡ 6. Motion

| Token JSON Key | Property | Token Value | Usage Guidance |
|---|---|---|---|
| `motion.movingBorder` | `duration` | `3s` | Full 360-degree conic gradient rotation loop speed |
| `motion.movingBorder` | `borderWidth` | `2px` | Moving border line thickness |
| `motion.movingBorder.conicGradients` | `flame` | `conic-gradient(#E11D48, #F59E0B, #F9E006, #F59E0B, #E11D48)` | Rengoku Crimson ➔ Amber ➔ Zenitsu Gold rotating gradient |
| `motion.movingBorder.conicGradients` | `tanjiro` | `conic-gradient(#2563EB, #00E5FF, #10B981, #00E5FF, #2563EB)` | Tanjiro Blue ➔ Cyan ➔ Emerald rotating gradient |
| `motion.movingBorder` | `prefersReducedMotionFallback` | `true` | Mandates animation disable for reduced motion users |

---

## 🚫 7. Non-Negotiables

1. **Zero Light Fills on Dark Mode**: Pure white (`bg-white`), light cream (`bg-slate-100`), or light yellow card backgrounds are strictly forbidden on `#050811` void surfaces.
2. **Solid Card Interior Rule (`STRICT-SOLID-INTERIOR-RULE`)**: The interior surface of any card MUST enforce 100% Solid Dark Navy (`#0B1C30` / `background-color: #0B1C30 !important;`) with zero interior background animation bleed.
3. **1.5px Uniform Border Standard**: Container card borders MUST enforce `border-width: 1.5px !important;` using explicit `.border` class selectors.
4. **16px Mobile Form Input Anti-Zoom**: All `<input>`, `<textarea>`, and `<select>` fields MUST use minimum `text-sm` / `text-base` (16px equivalent) to prevent mobile browser auto-zoom.

---

## 💻 8. Examples

### `:root` CSS Variables Snippet
```css
:root {
  --surface-dark: #050811;
  --surface-card: #0B1C30;
  --action-primary: #2563EB;
  --action-cyan: #00E5FF;
  --text-crystal-white: #FFFFFF;
  --text-ice-white: #F8FAFC;
  --border-width-standard: 1.5px;
  --shadow-glow-cyan: 0 0 20px rgba(0, 229, 255, 0.2);
  --motion-moving-border-duration: 3s;
}
```

### Example HTML Class Usage (`BTN-GLOW` & `CRD-TIER1`)

```html
<!-- BTN-GLOW: Glowing Action Button -->
<button class="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#2563EB] to-[#00E5FF] border border-[#00E5FF]/60 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.02] cursor-pointer transition-all">
  Launch Application ↗
</button>

<!-- CRD-TIER1: Kinetic Moving Border Card with 100% Solid Navy Interior -->
<div class="moving-border-card rounded-3xl overflow-hidden">
  <div style="background-color: #0B1C30 !important;" class="w-full h-full p-6 rounded-[1.38rem] text-left">
    <h3 class="text-xl font-bold text-white font-mono mb-2">Featured Showcase Card</h3>
    <p class="text-sm text-slate-400 leading-relaxed mb-4">
      Enforces solid #0B1C30 interior surface with rotating conic gradient border line.
    </p>
  </div>
</div>
```

---

## 🔄 9. How to Sync

1. **`master_tokens.json` is Authoritative**: Never mutate token values directly in code without updating `master_tokens.json` first.
2. **Build Generation**: Run `node design/designSystem.js` or import `cssVariables()` from `@/design/designSystem` to generate CSS variables automatically.
3. **Validation**: Execute `node design/scripts/validate_tokens.js` in CI to ensure zero schema drift.

---

## 📝 10. Change Log

- **v3.5.0 (2026-08-04)**: Codified single source-of-truth specification incorporating Demon Slayer Cyber Glass tokens, kinetic moving border rules, and solid navy card interior mandates.

---

## ✅ 11. Acceptance Criteria Checklist

- [x] Includes all top-level token categories from `master_tokens.json` (colors, typography, borders, shadows, buttons, motion).
- [x] Every color token maps to an explicit `--kebab-case` CSS variable.
- [x] Includes `:root` CSS variables snippet and code examples for `BTN-GLOW` and `CRD-TIER1`.
- [x] Codifies Non-Negotiables and sync protocol.
