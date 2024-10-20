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

        'main-blue-100': '#0071FF',
        'main-white-100': '#E3ECF4',
        'main-black-100': '#343434',
        'main-black-50': '#666666',
        'main-blue-50': '#85B6FC',

        //Hovers
        'main-blue-200': '#0563C1',
        'main-white-200': '#C6D9E9',

        //Accents
        'accent-blue': '#6CBAE2',
        'accent-green': '#03C591',
        'accent-purple': '#792A8F',

        //Neutrales
        'neutral-25': '#F1F1F1',
        'neutral-50': '#E3E3E3',
        'neutral-75': '#C9C9C9',
        'neutral-100': '#989898',

        //Alertas
        'alert-red-50': '#FCE9E9',
        'alert-red-100': '#D42121',
        'alert-red-200': '#B10000',
        'alert-green-50': '#E4F4E8',
        'alert-green-100': '#22963E',
        'alert-yellow-50': '#FCF9E9',
        'alert-yellow-100': '#F9CA41',
        'alert-blue-50': '#DDEDFF',
        'alert-blue-100': '#3381DB',
      },
      fontSize: {
        sm: ['12px', '20px'],
        base: ['14px', '22px'],
        lg: ['16px', '24px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['28px', '32px'],
        '4xl': ['40px', '48px'],
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      dropShadow: {
        'alert': '0 8px 8px rgba(178, 178, 178, 0.35)',
        'card': '0 8px 16px rgba(126, 127, 126, 0.15)',
      },
      backgroundImage: {
        'img-login': "url('/src/assets/img-login.png)",
      },
    },
  },
  plugins: [],
}