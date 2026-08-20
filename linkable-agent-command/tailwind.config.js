/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-void': '#030712',
        'surface-layer-1': '#0B0F19',
        'surface-card': 'rgba(17, 24, 39, 0.75)',
        'accent-cyan': '#00F5FF',
        'accent-electric': '#6366F1',
        'accent-emerald': '#10B981',
        'accent-amber': '#F59E0B',
        'accent-rose': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
