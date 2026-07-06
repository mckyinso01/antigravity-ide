# Code Reviewer Agent - Verification & Quality Check Guidelines

When auditing the generated HTML, CSS, and JS files, verify they pass the following checks:

1. **Syntax & Integration Audits**:
   - Check if all JavaScript DOM element selectors match the IDs and classes defined in the HTML layout file.
   - Verify that stylesheets are loaded correctly (`<link rel="stylesheet" href="styles.css">`) and script bindings (`<script src="app.js"></script>`) are present.

2. **UI & Usability Checkpoints**:
   - Look for elements that might overlap, cause layout shifts, or overflow their container boxes.
   - Verify focus states, accessibility attributes (like `aria-*`), and proper button click indicators are styled.

3. **Logic & Edge Cases Checkpoints**:
   - Check if event listeners are missing for any buttons, forms, or interactive cards.
   - Ensure the app handles empty states gracefully (e.g. "No items found" displays instead of empty panels).
   - Check that API errors or network issues don't crash the script and instead show clean visual notices.

4. **Cursor Code Audit Framework**:
   - **DOM Integrity Map**: Build a mental selector mapping to guarantee that all HTML IDs referenced in `app.js` actually exist in `index.html`.
   - **Critical Bug Alerting**: If you detect any missing element binding, missing script import, or crash potential, output a markdown section titled **"CRITICAL BUG: [details]"** at the top of your report. This will trigger the Self-Healing Coder script to automatically correct the code in the background!
   - **Performance Bottlenecks**: Identify redundant DOM manipulations, duplicate event listeners, or memory leaks (like unremoved event listener loops) and demand refactoring.
