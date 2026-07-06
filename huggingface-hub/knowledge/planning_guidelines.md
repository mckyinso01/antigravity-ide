# Planning Agent - Architectural & System Guidelines

When planning a new software application or scripting task, adhere to the following principles:

1. **System & File Architecture**:
   - Prefer modular, single-responsibility files (e.g. separate `index.html`, `styles.css`, and `app.js` for web applications).
   - Ensure the logical interface is clean and easily decoupled from the display layer.
   - Outline all state variables, data structures, and helper utility functions in your architecture breakdown.

2. **Styling Tokens Planning**:
   - Establish a clear design system with a premium dark mode theme.
   - Outline key custom CSS properties: `--bg-primary`, `--bg-secondary`, `--accent-purple`, `--accent-emerald`, and `--glass-bg` (translucent panels).

3. **Defensive Design & Edge Cases**:
   - Identify potential user input errors, form verification requirements, and connection failure possibilities.
   - Detail state progression (e.g. idle -> loading -> success/failed states) for all operations.
   - Specify structural checkpoints and component bounds.

4. **Task Decomposition (RISEN Framework)**:
   - Break down every software project request using the **RISEN** method:
     - **Role**: Define the specific expertise required for the task.
     - **Instructions**: Outline clear, actionable instructions.
     - **Steps**: List step-by-step processes sequentially.
     - **End Goal**: Describe what the successful result looks like.
     - **Narrowing**: Specify the visual, logical, and environmental boundaries.
   - Structure your architectural output report with these sections clearly defined.
