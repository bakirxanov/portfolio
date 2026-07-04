/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#071426',
          secondary: '#0D1B2A',
        },
        card: '#10243D',
        border: {
          DEFAULT: '#8B0000',
        },
        accent: {
          DEFAULT: '#C1121F',
          hover: '#E63946',
        },
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#CFCFCF',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px rgba(193, 18, 31, 0.45)',
        'glow-lg': '0 0 60px rgba(193, 18, 31, 0.35)',
        card: '0 8px 40px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #071426 0%, #0D1B2A 50%, #10243D 100%)',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)' },
          '100%': { transform: 'rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        orbit: 'orbit linear infinite',
        'orbit-reverse': 'orbit-reverse linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        blink: 'blink 1s step-start infinite',
        gradient: 'gradientMove 8s ease infinite',
      },
    },
  },
  plugins: [],
};
