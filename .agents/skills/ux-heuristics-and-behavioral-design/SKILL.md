---
name: ux-heuristics-and-behavioral-design
description: Advanced User Experience (UX) engineering framework combining Nielsen Norman usability heuristics, cognitive load reduction, UX writing ergonomics, and power-user keyboard velocity.
---

# User Experience (UX) & Behavioral Engineering Framework

## The 6 Laws of Elite User Experience

```
┌────────────────────────────────────────────────────────────────────────┐
│               THE 6 LAWS OF HUMAN-CENTERED UX ARCHITECTURE             │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. Jakob's Law    │ 2. Fitts's Law    │ 3. Hick's Law                  │
│ (Familiarity)     │ (Target Velocity) │ (Decision Simplicity)          │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 4. Miller's Law   │ 5. Error Shield   │ 6. Peak-End Rule               │
│ (Chunking 7±2)    │ (Zero-Punish)     │ (Celebratory Delight)          │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

---

### Law 1: Jakob's Law (Mental Model Alignment)
- Users spend 99% of their time on other apps (macOS, Linear, Stripe, Google).
- **Rule**: Never reinvent standard mental models. Search bars belong at top or via `Cmd+K`. Sliders indicate ranges. Checkboxes indicate multiple selections. Radio buttons indicate single choice.

---

### Law 2: Fitts's Law & Touch Target Ergonomics
- The time to acquire a target is a function of the distance to and size of the target.
- **Rule**:
  - Primary CTA buttons must have a minimum clickable area of **44x44px** on mobile and **36px height** on desktop.
  - Pin high-frequency actions to corners or bottom sheets where fingers naturally rest.

---

### Law 3: Hick's Law & Decision Minimization
- The time it takes to make a decision increases logarithmically with the number and complexity of choices.
- **Rule**:
  - Limit top-level navigation items to **4–6 items**.
  - On complex forms, group fields into **stepped wizard phases** rather than presenting 30 fields in one scrolling wall of inputs.

---

### Law 4: Miller's Law & Visual Chunking
- Working memory can only hold **7 ± 2 chunks** of information simultaneously.
- **Rule**:
  - Format long numerical data with logical chunking (e.g. Phone numbers: `+1 (555) 019-2834`, Bank accounts: `0057 9024 6533`).
  - Break complex dashboards into categorized Bento sections rather than continuous data tables.

---

### Law 5: Zero-Dead-End Empty States
- **Never display an empty screen with just "No items found."**
- **Rule**: Every empty state must have:
  1. An illustrative icon or diagram.
  2. A friendly explanation of what will appear here.
  3. A direct one-click action button (e.g. `[🚀 Run Discovery Scraper]`, `[+ Create New Project]`).

---

### Law 6: UX Writing & Action-Oriented Microcopy
- **No Vague Buttons**: Replace "Submit", "OK", "Next" with explicit outcome labels:
  - ❌ `Submit` -> ✅ `Deploy to Production`
  - ❌ `Continue` -> ✅ `Review Escrow Agreement & Pay 30%`
  - ❌ `Error 500` -> ✅ `Unable to reach Spacemail server. [Retry Now]`
- **Empathetic Error Guardrails**: Always state: (1) What happened, (2) Why it happened, and (3) Provide a 1-click button to fix it.
