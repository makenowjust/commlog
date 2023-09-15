/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Raleway', 'ui-sans-serif', 'sans-serif'],
      'sand-bold': ['Oswald', 'ui-sans-serif', 'sans-serif'],
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

