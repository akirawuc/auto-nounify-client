module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
      extend: {
        fontFamily: {
                'londrina': ['"Londrina Solid"', 'sans-serif'],
              },
      },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
