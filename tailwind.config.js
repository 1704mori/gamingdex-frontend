const { colors } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#69c0ff",
          200: "#40a9ff",
          300: "#1890ff",
        },
        green: {
          100: "#00e69d",
          200: "#00d08c",
          300: "#00ba7c",
        },
        red: {
          100: "#e53935",
          200: "#d32f2f",
          300: "#ef5350",
        },
        gray: {
          50: "#f9fafb",
          100: "#f7fafc",
          150: "#edf2f7",
          200: "#e2e8f0",
          300: "#cbd5e0",
          400: "#4f4f4f",
          450: "#4d4d4d",
          500: "#2c2c2c",
          600: "#191a1c",
        },
        ...colors,
      },
      boxShadow: {
        ichi: `2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07)`,
        ni: `2px 1.7px 2.2px rgba(0, 0, 0, 0.014),
        4.7px 4.1px 5.3px rgba(0, 0, 0, 0.02),
        8.9px 7.6px 10px rgba(0, 0, 0, 0.025),
        15.9px 13.6px 17.9px rgba(0, 0, 0, 0.03),
        29.7px 25.5px 33.4px rgba(0, 0, 0, 0.036),
        71px 61px 80px rgba(0, 0, 0, 0.05)`,
        san: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 10px 5px rgba(0, 0, 0, 0.12)`,
      },
    },
  },
  plugins: [],
};
