/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#4f46e5',
          dark: '#4338ca',
          light: '#e0e7ff',
          indigo: '#5b4fe8'
        },
        accent: {
          green: '#10b981',
          greenLight: '#d1fae5',
          purple: '#8b5cf6',
          purpleLight: '#ede9fe',
          blueLight: '#60a5fa'
        },
        neutral: {
          900: '#111827',
          600: '#4b5563',
          500: '#6b7280',
          100: '#f3f4f6',
          50: '#f8fafc',
          bg: '#f9fafb'
        }
      }
    },
  },
  plugins: [],
}
