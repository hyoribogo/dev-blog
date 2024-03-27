// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', ...fontFamily.sans],
        mono: ['var(--font-kotra)', ...fontFamily.mono],
      },
      colors: {
        primary: colors.yellow,
        gray: {
          50: '#f9fafb',
          100: '#ebebeb',
          200: '#d0d0d0',
          300: '#b0b0b0',
          400: '#8d8d8d',
          500: '#6a6a6a',
          600: '#4b4b4b',
          700: '#303030',
          800: '#1d1d1d',
          900: '#141414',
          950: '#141414',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.600'),
            a: {
              textUnderlineOffset: '4px',
              color: theme('colors.primary.500'),
              '&:hover': {
                // color: `${theme('colors.primary.600')}`,
              },
              'code:not(.code-highlight)': { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            'code:not(.code-highlight)': {
              fontFamily: 'var(--font-pretendard)',
              backgroundColor: theme('colors.primary.50'),
              border: `1px solid ${theme('colors.primary.300')}`,
              borderRadius: '0.25rem',
              paddingInline: '0.25rem',
              marginInline: '0.15rem',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
            '.internal': {},
            '.anchor': {},
            '.external': {
              boxSizing: 'content-box',
              padding: '0.25rem',
              borderRadius: '5px',
              textDecorationColor: theme('colors.primary.400'),
              color: theme('colors.black'),
              '&::after': {
                content: '"↗"',
                width: '0.875rem',
                height: '0.875rem',
              },
              '&:hover': {
                color: theme('colors.primary.500'),
              },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              'code:not(.code-highlight)': { color: theme('colors.primary.400') },
            },
            'code:not(.code-highlight)': {
              backgroundColor: theme('colors.gray.950'),
              borderColor: theme('colors.gray.500'),
              color: theme('colors.primary.500'),
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            '.external': {
              color: theme('colors.primary.500'),
              textDecorationColor: theme('colors.primary.500'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
