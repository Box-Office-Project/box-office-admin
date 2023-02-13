/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        sidebar: "16rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
