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
