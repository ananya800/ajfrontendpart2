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
    primary: '#DB1F48',
    secondary: '#01949A',
    tertiary: "#004369",
    accent: '#E5DDC8',
    background: '#f3f4f6',
    darkbg: '#0e0e10', // Slightly darker for contrast
    glassred: 'rgba(219, 31, 72, 0.1)', // soft glassy red
    glassblack: 'rgba(24, 24, 27, 0.4)', // glass black
    text: '#1e293b',
    lighttext: '#f3f4f6',
  },
  backdropBlur: {
    xs: '2px',
  },
},
  
  },
  darkMode: 'class',
  plugins: [],
}; 