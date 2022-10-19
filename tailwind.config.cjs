/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#852FF2'
      },
      boxShadow: {
        primaryShadow: '0px 4px 60px rgba(179, 126, 242, 0.24)'
      },
      backgroundImage: {
        primary: 'linear-gradient(180deg, #3734E5 0%, #862FF2 107.07%)'
      },
      gridTemplateColumns: {
        dashboard: '2in 1fr'
      }
    },
  },
  plugins: [],
}
