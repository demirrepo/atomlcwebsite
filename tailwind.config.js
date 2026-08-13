/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcdcff',
          300: '#8ec6ff',
          400: '#59a6ff',
          500: '#3385fc',
          600: '#1f66f0',
          700: '#1a51dc',
          800: '#1c43b1',
          900: '#1d3b8b',
          950: '#152553',
        },
        bio: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a6f4cf',
          300: '#6ee7a9',
          400: '#34d27e',
          500: '#15b766',
          600: '#099251',
          700: '#087344',
          800: '#0a5c39',
          900: '#084c30',
          950: '#022b1a',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b0b9c8',
          400: '#8593a8',
          500: '#677591',
          600: '#525d77',
          700: '#434c61',
          800: '#3a4151',
          900: '#0b1220',
          950: '#070b14',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,.06), 0 8px 24px rgba(16,24,40,.08)',
        glow: '0 10px 40px -10px rgba(31,102,240,.45)',
        glowGreen: '0 10px 40px -10px rgba(9,146,81,.45)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(20px,-20px) scale(1.05)' },
          '66%': { transform: 'translate(-15px,15px) scale(.97)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        fadeUp: 'fadeUp .7s ease-out both',
        blob: 'blob 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
