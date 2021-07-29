module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '400px',
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
        },
        orange: {
          DEFAULT: '#E65A1C',
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
