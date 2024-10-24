/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(12deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-12deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "rotate-animation": "rotate 0.3s ease-in-out 2",
      },
      colors: {
        primary: {
          50: "#fff9eb",
          100: "#feeec7",
          200: "#fddc8a",
          300: "#fbc44e",
          400: "#faa81a",
          500: "#f48a0c",
          600: "#d86507",
          700: "#b3440a",
          800: "#92350e",
          900: "#782c0f",
          950: "#451403",
        },
        foam: "#ECDFCC",
        white: "#FCFAEE",
        orange: "#DA8359",
        dark: "#1d232a",
        darkCharcoal: "#2D2D2D",
        coralRed: "#FF5733",
        RedTxt: "#da3510",
        brightBlue: "#0073E6",
        goldenYellow: "#FFD700",
      },
    },
  },
  plugins: [require("daisyui")],
};
