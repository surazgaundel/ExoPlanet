/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        white:'#fff9f4',
        navyblue:'#182c44',
        red:'#d4000b',
        blue:'#205095'
      }
    },
  },
  plugins: [],
}