const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{jsx,tsx,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        gray: colors.zinc,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
