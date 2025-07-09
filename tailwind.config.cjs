module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // Indigo 500
        secondary: '#ec4899', // Pink 500
        accent: '#fbbf24', // Yellow 400
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