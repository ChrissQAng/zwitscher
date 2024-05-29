/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        courier: ['Courier New'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        slideIn: 'slideIn .5s ease-in-out ',
        slideOut: 'slideIn .5s ease-in-out ',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [],
}
