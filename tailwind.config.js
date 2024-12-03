/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base theater-inspired dark theme
        background: {
          DEFAULT: "#121212", // Næsten sort baggrund som i biografen
          lighter: "#1E1E1E", // Lidt lysere variant til komponenter
          card: "#262626", // Til kort og sektioner
        },
        // Text colors
        text: {
          primary: "#FFFFFF",
          secondary: "#A3A3A3",
          tertiary: "#737373",
        },
        // Accent colors
        accent: {
          primary: "#E50914", // Netflix-inspireret rød
          secondary: "#FFA500", // Varm orange til ratings/highlights
          success: "#22C55E", // Grøn til positive handlinger
        },
        // Overlay colors
        overlay: {
          DEFAULT: "rgba(0, 0, 0, 0.75)",
          light: "rgba(0, 0, 0, 0.5)",
        },
      },
      // Transitions
      transitionDuration: {
        400: "400ms",
      },
      // Box shadows
      boxShadow: {
        poster: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
        hover: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
