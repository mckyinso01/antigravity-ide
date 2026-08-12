/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pristine: {
          bg: '#050811',         // Deep Void
          card: '#0B1C30',       // Solid Card surface
          cardBorder: '#1e293b', // Slate 800
          accent: '#2563EB',     // Electric Blue
          accentHover: '#1d4ed8',
          text: '#F8FAFC',       // Ice White
          textMuted: '#94a3b8',  // Slate 400
          danger: '#E11D48',
          success: '#10B981',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 10px rgba(37, 99, 235, 0.2)' },
          '50%': { opacity: .7, boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
