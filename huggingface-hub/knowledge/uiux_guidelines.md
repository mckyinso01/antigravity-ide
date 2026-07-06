# UI/UX Designer Agent - Styling & Layout Guidelines

When generating layouts and CSS files, you MUST adhere to the following styling specifications to maintain a state-of-the-art premium look:

1. **Colors & Themes (Obsidian Glassmorphism)**:
   - Base backgrounds: Slate / obsidian dark slate (e.g. HSL values: `hsl(220, 25%, 8%)`).
   - Cards/Containers: Translucent glass look with `background: rgba(18, 22, 32, 0.6)` and `backdrop-filter: blur(12px)`.
   - Borders: Subtle thin borders (`1px solid rgba(255, 255, 255, 0.08)`) that slightly glow on focus or hover.
   - Accents: Vibrant neon colors (e.g. violet `#8a4bf1`, emerald `#10b981`, gold `#f59e0b`, rose `#f43f5e`).

2. **Typography**:
   - Do NOT use browser default fonts.
   - Import and use modern sans-serif typefaces like **Outfit** and **Plus Jakarta Sans** (via Google Fonts links in HTML).
   - Maintain clear heading scales and hierarchies.

3. **Layout & Grids**:
   - Use CSS Grid and Flexbox for all layout structural panels.
   - Ensure layouts are fully responsive (working on mobile and desktop).
   - Use modern margins and paddings (`gap: 20px` or `padding: 24px`).

4. **Micro-Animations & Transitions**:
   - Avoid instant snaps. Add transition easing to buttons, form fields, and sidebar tabs:
     `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
   - Use hover transformations like scaling (`transform: translateY(-2px)`) and shadows (`box-shadow: 0 4px 20px var(--accent-glow)`).

5. **Accessibility & v0 Visual Standards**:
   - Incorporate semantic HTML5 layout structures (`<main>`, `<header>`, `<nav>`, `<aside>`, `<section>`).
   - Implement strict screen-reader accessibility rules: ensure all images have descriptive `alt` tags, forms have correct `<label>` elements, and buttons feature appropriate `aria-label` tags if visual text is missing.
   - Design interactive elements with clear keyboard focus rings (`outline: 2px solid var(--accent-purple)` with a offset) so users can tab-navigate the site.
   - Maintain a minimum contrast ratio of 4.5:1 for all text fields to ensure comfortable legibility under all screen brightness settings.
