/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px', // Custom breakpoint
        'sm-md':'540px'
      },
      colors:{
        thunderstorm: "#342664",
        shower:"#74AEDE",
        clearSky:"#DCECFB",
        
      }
    },
  },
  plugins: [],
}

