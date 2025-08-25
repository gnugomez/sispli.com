// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@nuxthq/studio',
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },

  googleFonts: {
    families: {
      Inconsolata: '200..900',
    },
  },

  image: {
  },

  content: {},

  compatibilityDate: '2024-11-11',
})