/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ee008d', // pink
        secondary: '#b1b1b5', // gray
        bone: '#ecebeb',
        blackPrimary: '#21232f',
        blackSecondary: '#232530',
      },
    },
  },
  plugins: [],
};
