/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#06b6d4', // cyan-500
          dark: '#0891b2', // cyan-600
          light: '#22d3ee', // cyan-400
        },
        accent: {
          DEFAULT: '#0ea5e9', // sky-500
        },
        construction: {
          dark: '#020617', // slate-950
          darker: '#010409',
          light: '#1e293b', // slate-800
        }
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      animation: {
        'blueprint-draw': 'draw 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'subtle-pulse': 'subtlePulse 4s infinite ease-in-out',
      },
      keyframes: {
        draw: {
          '0%': { width: '0%', opacity: '0' },
          '100%': { width: '100%', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
