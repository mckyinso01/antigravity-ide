---
name: improve-animations
description: Audit existing CSS/JS animation code, identify sluggish transitions and layout thrashing, and output surgical Before/After improvement tables.
---

# Improving Existing Animations

## Audit Checklist
- [ ] Is any transition using `all`? -> Replace with explicit `transform, opacity`.
- [ ] Is any transition using `ease-in`? -> Replace with `cubic-bezier(0.23, 1, 0.32, 1)`.
- [ ] Are any durations over `300ms` for micro-interactions? -> Cut down to `150–220ms`.
- [ ] Are elements appearing from `scale(0)`? -> Change to `scale(0.95)` with `opacity: 0`.
- [ ] Do buttons have `:active` scaling? -> Add `scale(0.97)` on active state.
- [ ] Are layout properties (`height`, `width`, `top`, `left`) being transitioned? -> Refactor to `transform` or CSS Grid subgrid.

## Standard Review Output Format
Always present reviews in a structured comparison table:
| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms ease-in` | `transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1)` | Removes layout recalculation and eliminates sluggish initial acceleration |
