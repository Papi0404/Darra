import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          blush: '#f9a8c9',
          deep: '#e75480',
          pale: '#fde8ef',
          light: '#fce7f3',
        },
        cream: {
          DEFAULT: '#fdf6ee',
          dark: '#f5e6d3',
          paper: '#fffbf5',
        },
        ink: {
          DEFAULT: '#4a3728',
          light: '#7a6155',
        },
        washi: {
          pink: '#f8b4cc',
          peach: '#f9c89a',
          lavender: '#c5a9d4',
          mint: '#a8d8c8',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        dancing: ['Dancing Script', 'cursive'],
        caveat: ['Caveat', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out infinite 2s',
        'pulse-heart': 'pulseHeart 1.5s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        pulseHeart: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'paper-lines': 'repeating-linear-gradient(transparent, transparent 27px, #f0d9e8 28px)',
      },
      boxShadow: {
        'polaroid': '0 4px 6px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
        'polaroid-hover': '0 12px 30px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.1)',
        'card': '0 2px 15px rgba(74,55,40,0.1)',
        'card-hover': '0 8px 30px rgba(74,55,40,0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
