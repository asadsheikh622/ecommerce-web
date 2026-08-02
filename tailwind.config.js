/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B88E2F',
        'primary-light': '#F9F1E7',
        'primary-bg': '#FDF8F5',
        'dark': '#3A3A3A',
        'muted': '#9F9F9F',
        'cream': '#F9F1E7',
        'cream-dark': '#E8D9C0',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      keyframes: {
        /* WhatsApp button */
        'whatsapp-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        'whatsapp-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        /* Hero floating card */
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-18px)' },
        },
        /* Fade + slide up — for section entrances */
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        /* Fade in */
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        /* Ken-Burns slow zoom on hero bg */
        'zoom-slow': {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        /* Marquee scroll for logos */
        'marquee': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'whatsapp-pulse': 'whatsapp-pulse 2s ease-in-out infinite',
        'whatsapp-ring':  'whatsapp-ring 2s ease-out infinite',
        'float':          'float 4s ease-in-out infinite',
        'fade-up':        'fade-up 0.8s ease-out both',
        'fade-up-slow':   'fade-up 1.1s ease-out both',
        'fade-in':        'fade-in 1s ease-out both',
        'zoom-slow':      'zoom-slow 12s ease-out forwards',
        'marquee':        'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
