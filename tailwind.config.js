module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '400px',
        '3xl': '2138px',
      },
      fontFamily: {
        perfetto: ['Perfetto', 'serif'],
        graphik: ['Graphik', 'serif'],
        graphikMedium: ['Graphik Medium', 'serif'],
        graphikBold: ['Graphik Bold', 'serif'],
        barlowCondensed: ['Barlow Condensed', 'serif'],
      },
      colors: {
        blue: {
          light: '#0959A4',
          DEFAULT: '#004A8F',
          dark: '#336695',
        },
        yellow: {
          DEFAULT: '#fec724',
          dark: '#D7A100',
          darker: '#FEB119',
        },
        orange: {
          DEFAULT: '#E65A1C',
          dark: '#D8370F',
        },
        gray: {
          DEFAULT: '#5F5F5F',
          dark: '#41444A',
        },
        black: {
          light: '#484A4E',
          DEFAULT: '#18191B',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              color: '#5F5F5F',
            },
            h3: {
              fontSize: '1.5rem',
            },
            h1: {
              fontSize: '16px',
              color: '#004A8F',
            },
            h2:{
              fontFamily: ['Graphik', 'sans-serif'], 
              fontWeight: 400,
              fontSize: '1.2em'
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
