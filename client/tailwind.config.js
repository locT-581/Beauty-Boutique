/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx}", "./public/index.html"];
export const theme = {
  extend: {
    fontFamily: {
      fontCabin: ['"Cabin"', "sans-serif"],
      fontItalianno: ['"Italianno"', "cursive"],
    },
    animation: {
      "spin-slow": "spin 1.75s ease-in-out infinite",
    },
    colors: {
      pink: "#EE9EA4",
      "soft-pink": "#FFCFD2",
      yellow: "#F2CB05",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
};
export const plugins = [];
