module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E1E1E",
        secundary: "#1976d2",
        gray: "#555",
        light_gray: "#EEE",
        error: "#A00",
        success: "#0A0",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeOut: "fadeOut 0.6s ease-in-out",
        moveLeft: "moveLeft 0.3s ease-in-out forwards",
        moveRight: "moveRight 0.150s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        fadeOut: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },
        moveLeft: {
          "0%": { right: "-250px" },
          "100%": { right: 0 },
        },
        moveRight: {
          "0%": { right: 0 },
          "100%": { right: "-250px", visibility: "hidden", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
