/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Muli', 'system-ui', 'sans-serif'],
        serif: ['"Ivy Mode"', 'Georgia', 'serif'],
        display: ['"Ivy Mode"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          bg: '#F7FAFF',
          section: '#EEF5FF',
          card: '#FFFFFF',
          primary: '#3A7BFF',
          cta: '#1E4ED8',
          accent: '#DCEBFF',
          dark: '#1F2A44',
          soft: '#6B7A90',
          border: '#E4EDF7',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-in-left': 'slideInLeft 0.7s ease forwards',
        'slide-in-right': 'slideInRight 0.7s ease forwards',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 1.5s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'count-up': 'countUp 1s ease forwards',
        'scale-in': 'scaleIn 0.5s ease forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'card': '0 2px 20px rgba(58, 123, 255, 0.08)',
        'card-hover': '0 8px 40px rgba(58, 123, 255, 0.16)',
        'float': '0 20px 60px rgba(58, 123, 255, 0.15)',
        'button': '0 4px 20px rgba(30, 78, 216, 0.35)',
        'button-hover': '0 8px 30px rgba(30, 78, 216, 0.5)',
      },
    },
  },
  plugins: [],
};
