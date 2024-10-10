/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#2c0e37',
        'purple-light': '#4a1259',
        'yellow-accent': '#fbbf24',
        'red-accent': '#ef4444',
      },
    },
  },
  plugins: [],
}