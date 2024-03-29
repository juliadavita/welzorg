/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["*.{html,js}"],
  theme: {
    colors: {
      violet: '#51277F',
      whisper: '#F3F0F6',
      'lightning-yellow': '#FDC513',
      white: '#FFF',
      charcoal: '#333333',
      grey: '#EEEEEE',
      current: 'currentColor'
    },
    fontFamily: {
      'sans': ['Source Sans Pro', 'sans-serif']
    },
    fonSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],            // [fontSize, { lineHeight?, letterSpacing?, fontWeight? }].
      xl: ['24px', '32px'],
      '1xl': ['28px', '32px'],
      '2xl': ['32px', '36px'],
      
      '3xl': ['36px', {
        lineHeight: '40px',
        fontWeight: '700'
      }],
    },
    container: {
      center: true,
    }, 
    extend: {
      height: {
        'mobile-full-height': 'calc(100vh - 4.5rem)',
        '140': '40rem',
      }
    },
  },
  plugins: [
    plugin(function peerAriaExpanded({ addVariant }) {
      addVariant('peer-expanded', `:merge(.peer)[aria-expanded="true"] ~ &`);
    }),
    plugin(function openVariant({ addVariant, e }) {
      addVariant('menu-open', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.menu-is-open .${e(`menu-open${separator}${className}`)}`;
        });
      });
    })
  ],
  variants: {
    extend: {
      visibility: ['peer-expanded', 'menu-open']
    }
  }
}
