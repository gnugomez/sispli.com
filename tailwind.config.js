import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /gap-[1-6]/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /(flex|grid|inline-flex|inline-grid)/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /(justify-start|justify-end|justify-center|justify-between|justify-around|justify-evenly)/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /(items-start|items-end|items-center|items-baseline|items-stretch)/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /(place-items-start|place-items-end|place-items-center|place-items-stretch)/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /(place-content-start|place-content-end|place-content-center|place-content-between|place-content-around|place-content-evenly|place-content-stretch)/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /(flex-row|flex-col|flex-row-reverse|flex-col-reverse)/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /(flex-wrap|flex-nowrap|flex-wrap-reverse)/,
      variants: ['sm', 'md', 'lg'],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E396A',
          background: '#FFFBF8',
          dimmed: '#5C70CE',
        },
      },
      fontFamily: {
        inconsolata: ['Inconsolata', 'monospace'],
        granaina: ['Granaina', 'sans-serif'],
        brasilero: ['Brasilero', 'sans-serif'],
        ppmondwest: ['PPMondwest', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
}
