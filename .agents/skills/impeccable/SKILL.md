---
name: impeccable
description: High-craft design engineering guidance based on Paul Bakaus' Impeccable framework. Covers visual hierarchy, bespoke color palettes, layout rhythm, anti-carditis rules, and pixel-perfect polish across all frontend surfaces.
---

# Impeccable Design Engineering Framework

## Core Philosophy: Out-of-Distribution Craft
Skip generic SaaS templates (Inter for everything, purple-to-blue gradients, cards nested in cards, gray text on colored backgrounds, rounded-square icon tiles above every heading). Approach every UI with award-winning design direction.

---

## The 23 Design Commands Vocabulary

| Command | Objective |
| :--- | :--- |
| **`craft`** | Full shape-then-build flow with high-fidelity visual iteration. |
| **`critique`** | UX review: visual hierarchy, clarity, emotional resonance, and information scent. |
| **`polish`** | Final pass: design system alignment, sub-pixel optical alignment, and shipping readiness. |
| **`bolder`** | Amplify timid or boring designs with high-contrast focal points and bold typography. |
| **`quieter`** | Tone down overly loud/cluttered layouts; restore breathing room and whitespace. |
| **`distill`** | Strip away unnecessary decorations, borders, and fluff to reveal core data. |
| **`harden`** | Error handling, text overflow protection, loading states, and edge cases. |
| **`onboard`** | Zero-friction first-run flows, empty states, and progressive feature discovery. |
| **`layout`** | Establish visual rhythm, 4px/8px mathematical spacing, and non-blocking side drawers. |
| **`typeset`** | Fix font pairings (Display + Body + Monospace), line-heights, and fluid type scaling. |
| **`colorize`** | Introduce strategic 60-30-10 color balance with tinted dark surfaces. |

---

## 🚫 The 5 Strict Anti-Patterns (Banned Tells of Generic AI)

1. **❌ Carditis (Cards Nested in Cards)**: Do not wrap every tiny element in a bordered card. Use whitespace, subtle divider rules, and typography size contrast instead.
2. **❌ Pure Black / Pure Gray Surfaces**: Never use `#000000` or `#888888`. Always tint dark backgrounds with deep brand undertones (e.g. `#030712` midnight blue or `#090d16` deep navy).
3. **❌ Gray Text on Colored Backgrounds**: On dark or colored surfaces, use tinted semi-transparent whites (`rgba(255, 255, 255, 0.9)` and `rgba(255, 255, 255, 0.6)`) to ensure WCAG AAA contrast.
4. **❌ Overused Default Typography**: Avoid generic Arial or unstyled system fonts. Pair distinctive display type (e.g. `Syne`, `Outfit`, `Cabinet Grotesk`) with ultra-readable body text (`Inter`, `Plus Jakarta Sans`, `Geist`).
5. **❌ Elastic & Slow Bounces**: Never use cartoonish high-bounce easings. Use calibrated spring physics (`duration: 0.5, bounce: 0.15–0.2`).
