/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grayt: "#2a2d32",
        darkgray: "#1b1c1f",
        bluet: "#3762e4",
        middleblue: "#4e6fd8",
        lightblue: "#c3dafa",
        middlegreen: "#96fb9f",
        lightpurple: "#c896fb",
        lightpink: "#fb96d3",
        lightgreen: "#aeddb4",
        lightyellow: "#fbf096",
      },
    },
  },
  plugins: [],
  safelist: [
    // "lightblue",
    "middlegreen",
    "lightpurple",
    "lightpink",
    "lightgreen",
    "lightyellow",
  ],
};
