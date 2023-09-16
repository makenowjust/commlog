/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Raleway', 'ui-sans-serif', 'sans-serif'],
      'sand-bold': ['Oswald', 'ui-sans-serif', 'sans-serif'],
    }
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
}
