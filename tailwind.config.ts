import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        orange: {
          DEFAULT: "#FF5A1F",
          light: "#FF7A47",
          dark: "#E04A15",
          // Small orange text on the off-white background only. #FF5A1F is
          // 2.98:1 there, which fails WCAG AA; this is 5.52:1. Orange on
          // charcoal keeps using DEFAULT.
          "dark-text": "#B33F16",
          // Large display text on off-white. #FF5A1F is 2.984:1, a hair under
          // the 3:1 large-text threshold; this clears it at 3.12:1 while
          // staying visually identical to the brand orange.
          display: "#FA571E",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2A2A2A",
        },
      },
      fontFamily: {
        heading: ["var(--font-bricolage)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
