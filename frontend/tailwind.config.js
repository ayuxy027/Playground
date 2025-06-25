/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jakarta': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.03em', // -3% letter spacing
      },
      colors: {
        // Vintage black and white palette
        'vintage': {
          'black': '#1a1a1a',
          'charcoal': '#2d2d2d',
          'graphite': '#404040',
          'slate': '#666666',
          'silver': '#999999',
          'platinum': '#cccccc',
          'pearl': '#e6e6e6',
          'snow': '#f5f5f5',
          'white': '#ffffff',
        }
      },
      boxShadow: {
        'vintage': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'vintage-lg': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
} 