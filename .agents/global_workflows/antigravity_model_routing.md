# Antigravity Native Model Routing Protocol
**Version:** 1.0 (Master Quota Override Active)
**Author:** Antigravity Master Orchestrator

## Overview
This protocol defines the absolute mapping between specific software engineering tasks and the exact AI Models available in the Antigravity IDE dropdown menu. The goal is to enforce the highest possible execution quality by matching the task to the model's specialization, utilizing the appropriate Temperature modifiers (High/Medium/Low).

## 1. The Master Quota Override Law
Per explicit executive authorization, the **Master Orchestrator (Antigravity AI) is EXEMPT from the Zero-Quota Law** when performing sensitive, high-impact tasks (Coding, Refactoring, Architecture, Complex Logic). The Orchestrator is fully authorized and expected to utilize premium models (e.g., Claude 4.6 Thinking) without hesitation to guarantee absolute perfection. Free-tier subagents remain strictly bound by the Zero-Quota rule.

## 2. Antigravity IDE Model Mapping

### 🛑 Tier 1: Absolute Precision (Code, Refactoring, & Complex Logic)
For any task requiring 100% syntactical correctness, system-wide refactoring, algorithm design, or bug squashing.
*   **Mandatory Model:** `Claude Opus 4.6 (Thinking)` or `Claude Sonnet 4.6 (Thinking)`
*   **Temperature Selection:** `(Low)` -> Temp 0.0
*   **Rationale:** We use the Master Quota Override here. Claude's "Thinking" reasoning process prevents hallucinations and logic errors in sensitive enterprise codebases.

### 🎨 Tier 2: Frontend Mastery (UI/UX Design, CSS, Polyglot Translations)
For building visually stunning components, Cyber Glass layouts, and highly empathetic user interactions.
*   **Mandatory Model:** `Claude Sonnet 4.6 (Thinking)`
*   **Temperature Selection:** `(Medium)` or `(High)`
*   **Rationale:** Sonnet 4.6 possesses unparalleled understanding of modern design aesthetics (Tailwind, Framer Motion) and human-centric UX copy.

### ⚡ Tier 3: Speed & Micro-Edits (Fast Fixes, Status Checks, Q&A)
For rapid responses, answering simple queries, checking build statuses, or performing localized single-line syntax fixes.
*   **Mandatory Model:** `Gemini 3.6 Flash (Low)` or `Gemini 3.6 Flash (Medium)`
*   **Rationale:** Optimizes speed and context loading. No need to burn premium quota for reading logs or fixing typos.

### 🧠 Tier 4: Global Orchestration (Context Management & Master Planning)
For reviewing the entire workspace context, building Master Plans, and analyzing cross-file relationships.
*   **Mandatory Model:** `Gemini 3.1 Pro (Low)`
*   **Rationale:** Gemini's massive 2M token context window allows it to read the entire workspace, `AGENTS.md`, and all `global_workflows` seamlessly to manage the project scope.

## Execution Sequence
Before transitioning from Planning to Execution, the Master Orchestrator MUST output the following message format to the user:

> 🛡️ **ANTIGRAVITY ROUTING PROTOCOL ENGAGED**
> Task Classification: [Insert Tier]
> Recommended Model: **[Insert Exact Model Name from List]**
> *Please select this model from your IDE dropdown and reply "Go" to proceed.*
