/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{components,context,hooks,services,App}.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'screen-enter': 'screenEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'aurora': 'aurora 20s linear infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        screenEnter: {
          '0%': { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        aurora: {
          '0%': { transform: 'translate(0%, 0%) rotate(0deg)' },
          '25%': { transform: 'translate(5%, 10%) rotate(20deg)' },
          '50%': { transform: 'translate(-10%, 5%) rotate(0deg)' },
          '75%': { transform: 'translate(5%, -10%) rotate(-20deg)' },
          '100%': { transform: 'translate(0%, 0%) rotate(0deg)' },
        },
        glow: {
           'from': { 'box-shadow': '0 0 10px -5px #38bdf8' },
           'to': { 'box-shadow': '0 0 20px 5px #38bdf8' }
        }
      }
    }
  },
  plugins: [],
}
