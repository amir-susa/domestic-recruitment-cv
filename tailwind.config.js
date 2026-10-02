/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#000080",
        label: "#E8EDF3",
        frame: "#111111",
        brand: {
          DEFAULT: "#B63A42",
          light: "#D15A61",
        },
      },
      fontFamily: {
        sans: ["Arial", "Tahoma", "sans-serif"],
        serif: ["Arial", "Tahoma", "sans-serif"],
        arabic: ["Tahoma", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};