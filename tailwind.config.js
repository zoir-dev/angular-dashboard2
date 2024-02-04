/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1890ff",
      },
      boxShadow: {
        header: "0 2px 8px #f0f1f2",
      },
    },
  },
  plugins: [],
};
