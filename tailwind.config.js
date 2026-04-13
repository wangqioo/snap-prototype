/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        snap: {
          dark: '#0f172a',
          darker: '#0a0e1a',
          accent: '#3b82f6',
          glow: '#60a5fa',
          surface: '#1e293b',
          border: '#334155',
          muted: '#94a3b8',
          text: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
