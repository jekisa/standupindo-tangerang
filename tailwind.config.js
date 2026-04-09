/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#26CCC2',
          amber: '#6AECE1',
          orange: '#FFB76C',
          red: '#FFF57E',
          dark: '#080808',
          card: '#141414',
          card2: '#1C1C1C',
          border: '#2A2A2A',
          muted: '#6B7280',
        },
      },
      fontFamily: {
        display: ['Impact', 'Arial Black', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'spotlight': 'radial-gradient(ellipse at top, rgba(38,204,194,0.15), transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #080808 0%, #001a19 50%, #080808 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'slide-in-left': 'slideInLeft 0.7s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #26CCC2, 0 0 10px #26CCC2' },
          '100%': { boxShadow: '0 0 20px #26CCC2, 0 0 40px #26CCC260' },
        },
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      boxShadow: {
        'yellow': '0 0 30px rgba(38,204,194,0.3)',
        'yellow-sm': '0 0 15px rgba(38,204,194,0.2)',
        'orange': '0 0 30px rgba(255,183,108,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
