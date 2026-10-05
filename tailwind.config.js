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
        sans: ["Garamond", "Times New Roman", "Times", "serif"],
        serif: ["Garamond", "Times New Roman", "Times", "serif"],
        arabic: ["Arial", "Arial Hebrew", "Tahoma", "sans-serif"],
      },
      fontSize: {
        "cv-display": ["32px", { lineHeight: "1" }],
        "cv-title": ["27px", { lineHeight: "1.2" }],
        "cv-heading": ["21px", { lineHeight: "1.2" }],
        "cv-contact": ["19px", { lineHeight: "1.2" }],
        "cv-section": ["16px", { lineHeight: "1.2" }],
        "cv-body": ["15px", { lineHeight: "1.2" }],
        "cv-caption": ["11px", { lineHeight: "1.2" }],
        "cv-small": ["13px", { lineHeight: "1.2" }],
        "cv-micro": ["12px", { lineHeight: "1.1" }],
        "cv-value": ["18px", { lineHeight: "1.1" }],
        "cv-arabic-display": ["29px", { lineHeight: "1.15" }],
        "cv-arabic": ["15px", { lineHeight: "1.25" }],
        "cv-arabic-small": ["14px", { lineHeight: "1.2" }],
      },
    },
  },
  plugins: [],
};