const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      "main-green": "#159847",
      "main-brown": "#ad5a10",
      white: "#ffffff",
      black: "#0A0A0A",
      "main-green-hover": "#15803e",
      "bg-body": "#E5E7EB",
      "stroke-gray": "#9CA3AF",
      "brown-light": "#FEFCEC",
      dashboard: "#D9D9D9",
      disable: "#F3F4F6",
    },

    extend: {
      spacing: {
        konten: "90%",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
