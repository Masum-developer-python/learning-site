/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 'media' for system preference
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        akber : ['akbar'],
        bangla : ["Siyam Rupali"],
        nastaleeq: ['nastaleeq-nafees', 'jameel-noori-nastaleeq', 'mehr-nastaleeq', 'lahori-nastaleeq', 'noto-nastaleeq'],
        arabic: ['saudi'],
        amiri : ['Amiri'],
        noto: ['Noto Naskh Arabic'],
        notoNastaleeq: ['noto-nastaleeq'],
        urdu: ['nastaleeq-nafees', 'jameel-noori-nastaleeq', 'mehr-nastaleeq', 'lahori-nastaleeq', 'noto-nastaleeq'], 
      }
    },
  },
  plugins: [require('tailwindcss-rtl')],
}

