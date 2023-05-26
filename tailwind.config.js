/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': {'max': '690px'},
      // => @media (max-width: 576px) { ... }

      'md': {'max': '1024px'},
      // => @media (max-width: 1024px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {},
  },
  plugins: [],
}
