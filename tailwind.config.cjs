const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    fontFamily: {
      sans: [
        "PT Sans",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Ubuntu",
        "Helvetica Neue",
        "sans-serif",
      ],
      mono: ["PT Mono", "ui-monospace", "SFMono-Regular", "monospace"],
    },
  },

  plugins: [typography, daisyui],
};

module.exports = config;
