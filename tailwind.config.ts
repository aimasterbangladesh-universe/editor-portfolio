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
