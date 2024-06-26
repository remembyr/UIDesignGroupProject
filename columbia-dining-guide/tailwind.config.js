const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "deep-orange": "#ff4500",
        "dark-green": "#008901",
        "green-200": "#A5D6A7",
      },
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      square: "square",
      roman: "upper-roman",
    },
  },
  plugins: [flowbite.plugin()],
};
