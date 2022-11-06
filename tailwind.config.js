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
        background: "var(--background)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "accent-light2": "var(--accent-light2)",
        "accent-dark": "var(--accent-dark)",
        "accent-dark2": "var(--accent-dark2)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        "primary-light2": "var(--primary-light2)",
        "primary-dark": "var(--primary-dark)",
        "primary-dark2": "var(--primary-dark2)",
        text: "var(--text)",
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
      screens: {
        xsm: "320px",
      },
    },
  },
  plugins: [],
};
