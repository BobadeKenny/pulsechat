/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/index.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0d7ff2",
        secondary: "#9333ea",
        warning: "#cc475a",
        error: "#ff0033",
      },
    },
  },
  plugins: [],
};

