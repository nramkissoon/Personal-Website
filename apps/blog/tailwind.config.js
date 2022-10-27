const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter"],
      'main': ['Roboto', ...defaultTheme.fontFamily.sans],
      'mono': ['Consolas',...defaultTheme.fontFamily.mono]
    },
    extend: {
      colors: {
        'github': "#4078c0",
        'typescript': "#3178c6"
      },
      keyframes: {
        "bounce-horizontal": {
          '0%, 100%': { transform: ' translateX(-25%)', 'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateX(0)', 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' },
        }
      },
      animation: {
        "bounce-horizontal": 'bounce-horizontal 1s infinite',
      }
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}
