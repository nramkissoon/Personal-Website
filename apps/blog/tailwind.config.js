const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Spline Sans',  ...defaultTheme.fontFamily.sans],
      'serif': [...defaultTheme.fontFamily.serif],
      'mono': [...defaultTheme.fontFamily.mono]
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),],
}
