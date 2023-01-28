/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        PoppinsBold: ["PoppinsBold", "sans-serif"],
        PoppinsLight: ["PoppinsLight", "sans-serif"],
        PoppinsMedium: ["PoppinsMedium", "sans-serif"],
        PoppinsSemiBold: ["PoppinsSemiBold", "sans-serif"],
        PoppinsThin: ["PoppinsThin", "sans-serif"],
        PoppinsExtraLight: ["PoppinsExtraLight", "sans-serif"],
        PoppinsBlack: ["PoppinsBlack", "sans-serif"],
        PoppinsExtraBold: ["PoppinsExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
