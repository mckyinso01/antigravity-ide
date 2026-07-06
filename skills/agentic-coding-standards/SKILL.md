---
name: agentic-coding-standards
description: >-
  Provides advanced environment configurations, safety constraints, functional instructions,
  and coding quality standards extracted from industry-leading coding assistants (Cursor, Claude Code, v0).
---

# Agentic Coding Standards & Security Guidelines

Use this skill to guide your own development, coding style, tool usage, and task execution inside the Antigravity workspace. Adhering to these rules guarantees robust, secure, and production-grade code.

## 1. Functional Environment Constraints

- **Verify Before Writing**: Always explore the codebase and inspect existing files BEFORE creating new code structures. Do not assume or hallucinate directory layouts.
- **Defensive File Writing**: When writing or replacing code files, output the **COMPLETE** file. Never use placeholders like `// ... rest of code stays the same ...` or `/* logic here */`, as this causes compilation failures.
- **Modular Packaging**: Banish monolithic scripts. Split tasks into logical modules (HTML, CSS, JS separate for web; utilities, config, core separate for backend).

## 2. Safety Walls & Security Rules

- **Input Sanitization**: Always escape user inputs when injecting them into DOM elements (`textContent` over `innerHTML`).
- **Token Protection**: Never print, echo, or output API keys, passwords, or tokens in logs, console prints, or agent contexts. Use quiet modes for credential searches.
- **Fail Gracefully**: Wrap all disk inputs/outputs and API requests in `try...catch` blocks. Output descriptive warnings rather than crashing the execution loop.

## 3. Task Decomposition (RISEN Framework)

When a complex task is given, structure your approach using this layout:
- **Role**: Define the specific expertise required for the task.
- **Instructions**: Outline clear, actionable instructions.
- **Steps**: List step-by-step processes sequentially.
- **End Goal**: Describe what the successful result looks like.
- **Narrowing**: Specify the visual, logical, and environmental boundaries.
