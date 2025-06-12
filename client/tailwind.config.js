/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          background: '#ffffff',
          text: '#03161e',
          accent: '#3f938a',
          primary: '#868e3d',
        },
        // Dark mode colors
        dark: {
          background: '#03161e',
          text: '#cde4e9',
          accent: '#3f938a',
          primary: '#868e3d',
          alert: '#e73423',
        },
      },
    },
  },
  plugins: [],
}

