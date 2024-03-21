/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      green: "#50C878",
      accent: "#F4E664",
      background: "#0E0F0F",
      foreground: "#F9F7F6",
    },
  },
  plugins: [],
};
