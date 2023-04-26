const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
      sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: '#C71D65',
          50: '#F2A9C8',
          100: '#F097BD',
          200: '#EB74A6',
          300: '#E6508F',
          400: '#E02C79',
          500: '#C71D65',
          600: '#96164C',
          700: '#650F33',
          800: '#34081A',
          900: '#030002',
          950: '#000000'
        },
        base: {
          DEFAULT: "#0E141B",
          50: "#4D6E94",
          100: "#466486",
          200: "#38506C",
          300: "#2A3C51",
          400: "#1C2836",
          500: "#0E141B",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
      },
    },
  },

  plugins: [],
};

module.exports = config;
