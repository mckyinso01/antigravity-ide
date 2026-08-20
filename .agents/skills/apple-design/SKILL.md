---
name: apple-design
description: Design principles and spring motion models based on Apple Human Interface Guidelines and iOS Dynamic Island mechanics.
---

# Apple Design & Motion Standards

## Spring Configurations
```javascript
// Dynamic Island Expansion
const dynamicIslandSpring = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.8
};

// Standard iOS Sheet Drawer
const iosSheetSpring = {
  type: "spring",
  duration: 0.45,
  bounce: 0.15
};
```

## Core Directives
1. **Fluid Momentum**: Gestures must preserve user finger velocity upon release.
2. **Subtle Bounce**: Keep bounce factor strictly between `0.10` and `0.25`. Avoid cartoonish overshooting.
3. **Continuous Corner Radius**: Use `squircle` / Apple continuous curves where possible.
4. **Haptic Visual Pairing**: Micro-scale shifts (`scale(0.96)`) synchronized with active touch events.
