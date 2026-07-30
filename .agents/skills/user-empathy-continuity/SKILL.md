---
name: user-empathy-continuity
description: Special agent skill for pre-task deep research, user empathy mental model checking, zero-quota execution, and 3-tier component continuity enforcement.
---

# User Empathy & Component Continuity Special Agent Skill

This skill governs pre-task research, user mental model simulation, zero-quota execution, and component continuity across all software development tasks globally.

---

## Core Directives

### 1. Mandatory Pre-Task Deep Research

- Before offering any code recommendations, architectural changes, or feature drafts, the agent MUST perform deep research using workspace rules (`AGENTS.md`), local codebase searches, cached knowledge, or free Hugging Face Serverless Inference endpoints (`multi_agent.py`).
- Research findings MUST be synthesized into an actionable design or implementation plan BEFORE generating final code.

### 2. Strict Zero-Quota Execution Standard

- All subagent operations, research sessions, and code generation routines MUST operate in **100% Zero-Quota Mode**.
- Bypasses all paid external API endpoints by default in favor of local heuristics, free serverless models, and deterministic AST verification scripts.

### 3. Data Entity Intent Mapping & 3-Tier Hierarchy

Every rendered data entity (Department, Employee, Invoice, Lead, Product, Ticket, Campaign, Integration, Order) MUST obey the **3-Tier Hierarchy**:

```text
[Level 1: Summary Card / Row] ➔ [Level 2: Parent Slide Drawer] ➔ [Level 3: Leaf Entity Record Drawer]
```

- **Level 1 (Surface Card / Row)**: Must contain hover feedback (`hover:scale-[1.02]`) and an active `onClick` trigger.
- **Level 2 (Parent Cluster Drawer)**: Non-blocking right-side slide drawer (`SlideOverDrawer`) displaying group metrics, roster, and cluster actions.
- **Level 3 (Leaf Record Drawer)**: Nested slide-over drawer (`EmployeeDetailDrawer`) displaying full bio, hire date/history, metrics, milestones, and direct action triggers.

### 4. Empathy & User Mental Model Self-Check

Before marking any task complete, the agent MUST execute the following mental verification:

> *"If a user works with this interface alone, what will they naturally expect when clicking this entity? If frustrating when static, I MUST wire the follow-up Slide Drawer immediately."*

### 5. Semantic Microcopy & Action Verb Intent Extraction

- **Button Microcopy Parsing**: Whenever a button contains action verbs (*"Click to Preview"*, *"Inspect Profile"*, *"Configure Brand"*), the agent MUST wire the exact promised modal/drawer flow.
- **Promise Fulfillment**: Never render action-oriented microcopy on static buttons without interactive handlers.

### 6. Contextual Guidance & Visual Affordance Engine

- **Helper Microcopy Recognition**: Read instructional helper text (*"Select options below..."*, *"Drag files here"*) and automatically inject reactive floating selection toolbars or file dropzones.
- **Visual Signifier Contract**: Wire drag handlers to `::` grip icons, accordions to `v` chevrons, and dropzone handlers to `border-dashed` wrappers.

### 7. Universal Dual-State Cognitive Re-Reflection Matrix

Every subagent MUST execute the **5 Sukdulang-Antas Journey Questions** in State 2 Proactive Mode:

1. *Enhancement*: *"What additional feature, micro-animation, or polish will make this 10x better?"*
2. *Negative Edge-Case*: *"If user input fails or is denied, what error state, shake animation, or toast alert is displayed?"*
3. *Positive Journey*: *"If user input succeeds, what success animation, redirect, or follow-up logic triggers?"*
4. *Fallback & Onboarding*: *"What if the user has no account or data is empty? Where does the fallback onboarding journey lead?"*
5. *Exhaustive Quality Lock*: *"Is the component capability exhausted to its ultimate level? Are tooltips, hover glows, and contrast AAA verified?"*

### 8. Copilot365 15-Point Enterprise UI/UX Engineering Standard

All workflows, code synthesis engines, and subagents MUST audit and enforce the **Copilot365 15-Point UI/UX Architecture**:

1. **Design Systems & Tokens**: SCSS/JSON tokens for color, spacing, typography + isolated component packages.
2. **Atomic / Component-First Design**: Atoms ➔ Molecules ➔ Organisms + pure UI separated from behavioral hooks.
3. **Design Tokens & Dynamic Themes**: CSS custom properties for instant Light/Dark mode runtime switching.
4. **Responsive & Constraint Layouts**: CSS Grid + Flexbox + Container Queries for component-level responsiveness.
5. **Microinteractions & Motion Design**: Tactile spring physics nudges (`cubic-bezier(0.34, 1.56, 0.64, 1)`), kinetic glowing neon borders, and reduced-motion support.
6. **Progressive Disclosure & Context UI**: On-demand controls, inline validation, and secondary actions hidden until contextual trigger.
7. **Conversational UI & Microcopy**: Smart defaults, autofill suggestions, clear error messages, and assistive microcopy verbs.
8. **Data-Driven Personalization & Adaptive UI**: Role-based UI morphing, feature flags, and customizable power-user shortcuts.
9. **Micro-Frontends & Modular Architecture**: Decoupled micro-apps with shared design tokens and zero duplicate dependencies.
10. **Accessibility-First Design (a11y)**: Built-in WCAG 2.2 AAA contrast (minimum 4.5:1 ratio), 48px touch targets, ARIA roles, and keyboard navigation.
11. **Performance-Aware UI (Perceived Performance)**: Skeleton loading screens, optimistic UI updates, lazy loading, and WebWorker offline caching.
12. **Multimodal Interfaces**: Voice commands, Web Audio API FFT visualizer, and gesture controls.
13. **Dashboard & Data-Heavy Layout Patterns**: Bento Grid asymmetric card grids, responsive tables, microcharts, and sparklines.
14. **Mobile-First & Gesture-Optimized Patterns**: 44–48px touch targets, thumb-reachable bottom drawers, and native ergonomic flows.
15. **Observability in UX / Telemetry**: Component-level telemetry capturing user flows, render times, click events, and drop-off rates.
