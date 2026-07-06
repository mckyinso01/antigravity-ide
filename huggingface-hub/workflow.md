# Workflow Manual - Aetheris Multi-Agent Platform

This manual details the operating procedures for the Aetheris Multi-Agent software generation pipeline running locally in your workspace.

---

## 1. The Collaborative Multi-Agent Pipeline

When a task is submitted, Aetheris orchestrates five specialized agents sequentially to plan, build, design, audit, and commercialize your product:

```
  [User App Idea]
         │
         ▼
 1. Planner Agent ────────► Outputs: plan.md (Technical Specs & Schema)
         │
         ▼
 2. UI/UX Agent ──────────► Outputs: index.html & styles.css (Glassmorphism layout)
         │
         ▼
 3. Coding Agent ─────────► Outputs: app.js (Interactive state logic)
         │
         ▼
 4. Reviewer Agent ───────► Outputs: review.md (Refinements & Bug audit)
         │
         ▼
 5. Marketing Agent ──────► Outputs: marketing_strategy.md (Monetization & SEO plan)
```

---

## 2. Background File Watcher Workflow

The background watcher service runs persistently as an Antigravity task. It provides a completely hands-off creation loop.

### Submission Step-by-Step:
1. **Navigate to the tasks directory**: `C:\Users\Admin\agent-tasks\`.
2. **Create a task file**: Create a plain text file named after your app (e.g. `pomodoro-timer.txt`).
3. **Write the description**: Inside the file, type your app requirements and save.
4. **Processing State**:
   - The watcher detects the file and renames it to `pomodoro-timer.processing` to lock it.
   - It triggers `multi_agent.py` using your configured `HF_TOKEN`.
5. **Output Generation**:
   - The pipeline creates a folder `C:\Users\Admin\agent-tasks\pomodoro-timer\`.
   - All five files (`plan.md`, `index.html`, `styles.css`, `app.js`, `review.md`, and `marketing_strategy.md`) are written there.
6. **Completion State**:
   - On success: File is renamed to `pomodoro-timer.processed`.
   - On failure: File is renamed to `pomodoro-timer.failed` and detailed tracebacks are logged to `pomodoro-timer_error.txt`.

---

## 3. Interactive Web Control Hub

You can also run, customize, and visualize this process in your browser:
1. Ensure the local server is running.
2. Open **`http://localhost:8000`** in your browser.
3. Configure your API token in the **Settings** tab.
4. Select custom models for each role, input your requirements, and watch the agents run on the timeline in real-time.
5. Preview outputs or copy/download the compiled files instantly.

---

## 4. Customizing Agent Behaviors

You can update the rules of each agent at any time. The custom guidelines are stored as standard markdown files under `C:\Users\Admin\huggingface-hub\knowledge\`:
- [planning_guidelines.md](file:///c:/Users/Admin/huggingface-hub/knowledge/planning_guidelines.md)
- [uiux_guidelines.md](file:///c:/Users/Admin/huggingface-hub/knowledge/uiux_guidelines.md)
- [coding_guidelines.md](file:///c:/Users/Admin/huggingface-hub/knowledge/coding_guidelines.md)
- [reviewer_guidelines.md](file:///c:/Users/Admin/huggingface-hub/knowledge/reviewer_guidelines.md)
- [marketing_guidelines.md](file:///c:/Users/Admin/huggingface-hub/knowledge/marketing_guidelines.md)

Simply open, edit, and save any of these files. The agents will immediately adopt the updated rules on their next run!
