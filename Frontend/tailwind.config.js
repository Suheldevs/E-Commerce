/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Include Flowbite's content
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Use Flowbite's plugin
  ],
};
