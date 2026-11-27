/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gothic: {
          crimson: "#7c1d2e",
          blood: "#4a0e1a",
          mist: "#9b8ea9",
          slate: "#232533",
          glass: "rgba(18, 17, 26, 0.78)",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Courier New"', "monospace"],
        serif: ['"Cinzel"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
