module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#DB1F48', // Indigo 500
        secondary: '#01949A',
        tertiary:"#004369" ,// Pink 500
        accent: '#E5DDC8', // Yellow 400
        background: '#f3f4f6', // Gray 100
        darkbg: '#18181b', // Gray 900
        text: '#1e293b', // Slate 800
        lighttext: '#f3f4f6', // Gray 100
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}; 