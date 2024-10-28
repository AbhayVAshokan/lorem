import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Raleway",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(---foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary-background))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary-background))",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
