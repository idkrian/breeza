/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: "#0b131e",
      darkGray: "#202b3b",
      blue: "#0095ff",
      lightBackground: "#d1cfcf",
      lightWhite: "#efefef",
      white: "#ffffff",
    },
    extend: {
      boxShadow: {
        "3xl": "0px 3px 8px rgba(0, 0, 0, 0.24)",
      },
    },
  },
  plugins: [],
};
