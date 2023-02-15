/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        sidebar: "16rem",
      },
      minWidth: {
        sidebar: "16rem",
      },
      gridAutoColumns: {
        poster: "12rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
