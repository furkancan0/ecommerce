/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f3f4f6', // Light gray
        secondary: '#e5e7eb', // Gray
        accent: '#1f2937', // Dark gray for text
      },
    },
  },
  plugins: [],
}

