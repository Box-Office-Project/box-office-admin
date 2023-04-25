/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        sidebar: "12rem",
      },
      minWidth: {
        sidebar: "12rem",
      },
      gridAutoColumns: {
        poster: "12rem",
      },
      aspectRatio: {
        "3/4": "3 / 4",
        "3/1": "3 / 1",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
