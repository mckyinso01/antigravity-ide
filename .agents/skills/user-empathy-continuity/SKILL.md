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
