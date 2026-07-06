# Coding & Logic Agent - JavaScript Code Quality Guidelines

When writing logic and scripts, ensure the code is complete, bug-free, and adheres to these best practices:

1. **State Management**:
   - Encapsulate application state in a single configuration object (e.g. `const appState = { currentTab: 'home', items: [] };`).
   - Standardize functions that update the state and immediately sync the corresponding UI elements.

2. **Security & Sanitization**:
   - Always sanitize user inputs when printing them to the screen to prevent Cross-Site Scripting (XSS).
   - Use `textContent` instead of `innerHTML` when inserting text from input fields, or write an explicit HTML escape function:
     ```javascript
     function escapeHtml(text) {
       return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
     }
     ```

3. **Event Listeners**:
   - Bind all event listeners cleanly after the DOM has loaded.
   - Prevent duplicate listener bindings.
   - Use clean, named handler functions where possible to keep code self-documenting.

4. **Async & Error Handling**:
   - Always wrap API calls and file readers inside `try { ... } catch (err) { ... }` blocks.
   - Display informative toast notifications or inline error indicators to the user during failures.
   - Implement loading and disabling states on action buttons to prevent double-clicks during active requests.

5. **Claude Code Implementation Standards**:
   - **MANDATORY COMPLETE FILES**: You must write the complete file in your outputs. Never use `// ... rest of code stays the same` or truncate functions. Truncation breaks automated code compilers.
   - **Self-Diagnostic Logging**: Add console warning checkpoints (`console.warn('[App] debug point:', data)`) at key state transitions (like API calls or file reading) to make debugging simple.
   - **Defensive Fallbacks**: Provide immediate mock data fallbacks if external API connections fail, so the UI is always interactable.
