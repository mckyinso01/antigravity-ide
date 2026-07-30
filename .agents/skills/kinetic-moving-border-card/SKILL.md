---
name: kinetic-moving-border-card
description: Gold-Standard Kinetic Moving Border Line & Wide Outer Shadow Glow Card Template with 100% Solid Dark Navy (#0B1C30) Interior. Use for featured product cards, login cards, and interactive highlight elements across all standalone codebases.
---

# 🎨 Gold-Standard Kinetic Moving Border Line & Wide Outer Shadow Glow Card Specification

This skill documents the exact, verified, zero-defect CSS/HTML template for creating cards with a **2px rotating conic outer border line**, a **wide vibrant ambient outer shadow glow spread**, and a **100% solid dark navy (`#0B1C30`) interior surface** with zero interior background animation bleed.

---

## 🛠️ Complete Copy-Paste CSS Engine

```css
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotateBorder {
  0% { --border-angle: 0deg; }
  100% { --border-angle: 360deg; }
}

/* 2PX MOVING CONIC BORDER LINE ONLY */
.moving-border-card {
  position: relative;
  border-radius: 1.5rem;
  padding: 2px;
  background: conic-gradient(from var(--border-angle, 0deg), #2563EB, #00E5FF, #10B981, #F59E0B, #E11D48, #2563EB);
  animation: rotateBorder 4s linear infinite;
  isolation: isolate;
  box-shadow: 0 10px 35px -5px rgba(0, 229, 255, 0.35);
}

/* WIDE MOVING OUTER SHADOW GLOW SPREAD AURA */
.moving-border-card::after {
  content: "";
  position: absolute;
  inset: -12px;
  border-radius: 2rem;
  background: conic-gradient(from var(--border-angle, 0deg), #2563EB, #00E5FF, #10B981, #F59E0B, #E11D48, #2563EB);
  animation: rotateBorder 4s linear infinite;
  z-index: -1;
  filter: blur(28px);
  opacity: 1;
  pointer-events: none;
}
```

---

## 📐 HTML Markup Pattern (Strict Solid Dark Navy Surface)

```html
<div class="product-card-item moving-border-card rounded-3xl overflow-hidden">
  <div style="background-color: #0B1C30 !important;" class="w-full h-full p-7 rounded-[1.38rem] flex flex-col justify-between">

    <!-- CARD HEADER & BADGE -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <span class="text-[11px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded">Category Badge</span>
        <h3 class="text-2xl font-bold text-white mt-1 font-display">Product Title</h3>
      </div>
      <div class="text-xs font-mono text-on-surface-variant">[MODULE COUNT]</div>
    </div>

    <!-- DESCRIPTION -->
    <p class="text-on-surface-variant text-sm mb-6 leading-relaxed">
      Product description paragraph goes here.
    </p>

    <!-- ACTION BUTTON -->
    <a href="#" class="w-full py-3.5 bg-[#0B1C30] border border-blue-500/30 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl font-mono text-center block transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.45)] hover:-translate-y-0.5">
      Launch Application ↗
    </a>

  </div>
</div>
```

---

## 🔒 3 Core Implementation Rules

1. **Outer Borderline Only**: The conic gradient rotation (`rotateBorder 4s linear infinite`) MUST apply strictly to the 2px padding border and the `::after` shadow layer.
2. **Solid Interior Surface**: The inner container MUST explicitly enforce `background-color: #0B1C30 !important;` to block any interior color fill or gradient animation bleed.
3. **Outer Glow Spread**: The `::after` layer MUST use `inset: -12px; filter: blur(28px); opacity: 1;` to project the vibrant ambient moving shadow aura into the surrounding workspace background.
