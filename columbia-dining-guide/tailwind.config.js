const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {},
    listStyleType: {
      none: 'none',
      disc: 'disc',
      square: 'square',
      roman: 'upper-roman',
    }
  },
  plugins: [flowbite.plugin()],
};
