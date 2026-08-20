---
name: animate
description: Build animation from scratch with strict motion physics, easing curve selection, duration calibration, and interruptibility.
---

# Building Animations

## Operating Rules
1. **Run the sequence in order**: Frequency Gate -> Purpose Check -> Tool Selection -> Properties -> Easing Curve.
2. **No approximated values**: Always use calibrated curves from the tokens table.
3. **Cheapest tool that works**: CSS transition -> CSS `@starting-style` -> WAAPI -> Motion (`motion.dev`).
4. **Transform & Opacity only**: Skip layout and paint cycles. Never animate `width`/`height`/`top`/`left` directly.

## Easing Tokens
```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

## Tool Matrix
| Requirement | Recommended Tool |
| --- | --- |
| Hover, active press, color transition | **CSS transition** |
| Component mount entry | **CSS `@starting-style`** |
| Infinite background motion | **CSS `@keyframes`** (off-main-thread) |
| Gestures, spring drag, layout shifts | **Framer Motion / Motion** |
