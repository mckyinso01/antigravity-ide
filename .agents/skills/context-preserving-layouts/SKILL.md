---
name: context-preserving-layouts
description: Design and engineering of non-modal slide drawers, split-pane inspectors, and context-preserving layouts that eliminate blinding centered modals and background blurs.
---

# Context-Preserving Layout Architecture

## The Anti-Pattern: Centered Blinding Modals

```
❌ THE WRONG WAY (Centered Modal + Heavy Blur):
┌────────────────────────────────────────────────────────┐
│ ////////////////// BLURRED BACKGROUND ////////////////│
│ /////////// [User loses spatial context] /////////////│
│                 ┌──────────────────────┐               │
│                 │   CENTERED POPUP     │               │
│                 │   (Blocks canvas)    │               │
│                 └──────────────────────┘               │
│ //////////////////////////////////////////////////////│
└────────────────────────────────────────────────────────┘

✅ THE MODERN WAY (Non-Modal Slide Drawer / Split-Pane):
┌───────────────────────────────────┬────────────────────┐
│                                   │  SLIDE-IN DRAWER   │
│  LIVE WORKSPACE / MAIN CANVAS     │  • Detail view     │
│  • 100% visible & legible         │  • Zero blur       │
│  • Full spatial context preserved │  • Snappy physics  │
│  • Background remains reference   │  • Esc / swipe out │
└───────────────────────────────────┴────────────────────┘
```

---

## Core Layout Rules

### 1. The "No-Blur" / Non-Obstructive Rule
- **Never apply heavy backdrop blurs (`backdrop-filter: blur(20px)`)** to primary working interfaces. It signals to the user that they made an error or entered a dead end.
- If an overlay is necessary, use a subtle `rgba(0, 0, 0, 0.3)` tint with `backdrop-filter: blur(2px)` maximum, or **no overlay at all** when the drawer docks into the layout.

### 2. Slide Drawer & Side-Sheet Hierarchy
- **Desktop Viewport (>= 1024px)**:
  - Slide in from the **Right Edge** with width between `400px` and `560px`.
  - Use `transform: translateX(100%)` -> `transform: translateX(0)` with `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`.
  - Duration: **220–280ms**.
- **Mobile Viewport (< 1024px)**:
  - Slide up as a **Bottom Sheet Drawer** (`transform: translateY(100%)` -> `transform: translateY(0)`).
  - Include a swipeable handle bar at the top (`width: 36px, height: 4px, border-radius: 2px`).

### 3. Split-Pane Push Canvas (Linear-Style)
- When opening an item inspector or checkout panel in a desktop web app, consider **pushing the main canvas** rather than covering it:
```css
.main-container {
  transition: padding-right 240ms cubic-bezier(0.32, 0.72, 0, 1);
}
.main-container.drawer-open {
  padding-right: 480px;
}
```
This ensures that 0% of the underlying data table or dashboard is obstructed.

### 4. Non-Destructive Escape & Click-Away Physics
- Pressing `Escape` or clicking outside the drawer smoothly reverses the slide transition.
- Unsaved form drafts must persist locally so accidental drawer dismissals never lose user data.
