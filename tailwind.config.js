/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      colors: {
        background: {
          DEFAULT: "#0a0a0a", // Mørkere varm sort
          lighter: "#1a1a1a", // Lysere varm sort
          card: "#262626", // Bibeholder denne da den fungerer godt med dine cards
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A3A3A3",
          tertiary: "#737373",
        },
        accent: {
          primary: "#E50914",
          secondary: "#FFA500",
          success: "#22C55E",
        },
        overlay: {
          DEFAULT: "rgba(0, 0, 0, 0.75)",
          light: "rgba(0, 0, 0, 0.5)",
        },
      },
      transitionDuration: {
        400: "400ms",
      },
      boxShadow: {
        poster: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
        hover: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
