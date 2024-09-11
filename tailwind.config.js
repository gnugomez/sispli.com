import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E396A',
      },
      fontFamily: {
        inconsolata: ['Inconsolata', 'monospace'],
        granaina: ['Granaina', 'sans-serif'],
        brasilero: ['Brasilero', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
}
