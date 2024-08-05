/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "	#DFCCA6",
        beige2: "	#faf0e6",
      },
      transitionProperty: ["width"],
    },
  },
  plugins: [require("daisyui")],
};
