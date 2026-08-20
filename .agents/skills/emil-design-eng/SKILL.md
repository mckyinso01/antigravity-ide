---
name: emil-design-eng
description: Encodes Emil Kowalski's philosophy on UI craft, component polish, animation physics, and the unseen details that elevate software into Apple/Linear/Vercel tier.
---

# Design Engineering

## Core Philosophy

### 1. Taste is Trained, Not Innate
Good taste is a trained instinct: recognizing what elevates software beyond functional to breathtaking. Study why the best interfaces feel the way they do. Reverse engineer animations. Inspect interactions.

### 2. Unseen Details Compound
When a feature functions exactly as someone assumes it should, they proceed without giving it a second thought. That is the goal:
> "All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune." — Paul Graham

### 3. Beauty is Leverage
People select software based on the overall experience. Good defaults, snappy physics, and purposeful motion are real commercial differentiators.

---

## The Animation Decision Framework

Before writing any animation code, answer these questions in order:

### 1. Should this animate at all?
| Frequency | Decision |
| --- | --- |
| 100+ times/day (keyboard shortcuts, command palette toggle) | **No animation. Ever.** (Instant 0ms) |
| Tens of times/day (hover effects, list navigation) | Near-imperceptible (100–150ms) or none |
| Occasional (modals, drawers, toasts) | Standard animation (180–260ms) |
| Rare / first-time (onboarding, success celebration) | Delight budget lives here |

**Never animate keyboard-initiated actions.** Raycast has no open/close animation. That is the optimal experience for tools used hundreds of times a day.

### 2. What is the purpose?
Must be one of:
- **Feedback** (confirming interaction was registered)
- **Spatial consistency** (showing where an element entered/exited)
- **State indication** (making a state change clear)
- **Preventing jarring changes** (bridging content transitions)
- **Explanation / Delight** (marketing & rare onboarding)

### 3. What easing should it use?
- **Entering / Exiting elements**: Always use `ease-out` (starts fast, feels responsive).
- **Moving / Morphing on screen**: Use `ease-in-out`.
- **Hover / Color change**: Standard `ease` (150ms).
- **Constant motion (progress bar, ticker)**: `linear`.

**Never use `ease-in` for UI animations.** It starts slow and makes the app feel laggy.

```css
/* Custom Emil Kowalski Easing Curves */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

### 4. Duration Scale
- Button press feedback: **100–160ms**
- Tooltips, small popovers: **125–200ms**
- Dropdowns, selects: **150–250ms**
- Modals, drawers: **200–300ms**
- Rule: Keep UI animations **under 300ms**.

---

## Component Building Principles

### 1. Buttons Must Feel Responsive
Add `transform: scale(0.97)` on `:active`.
```css
.button {
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}
.button:active {
  transform: scale(0.97);
}
```

### 2. Never Animate From `scale(0)`
Nothing in nature appears from absolute nothing. Start from `scale(0.95)` with `opacity: 0`.
```css
/* Good */
.entering {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 200ms var(--ease-out), opacity 200ms var(--ease-out);
}
```

### 3. Origin-Aware Popovers
Popovers must scale from their trigger button (`transform-origin`), not from the viewport center.

### 4. Spring Animations for Gestures
Use spring physics for drag interactions, swipe-to-dismiss, and interruptible state shifts:
```javascript
// Apple style spring config
{ type: "spring", duration: 0.5, bounce: 0.2 }
```
