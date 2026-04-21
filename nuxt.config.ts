import process from 'node:process'
import IconsResolver from 'unplugin-icons/resolver'
import ViteComponents from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    vintedUserId: process.env.VINTED_USER_ID || '',
    vintedDomain: process.env.VINTED_DOMAIN || 'www.vinted.es',
  },

  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    'unplugin-icons/nuxt',
    'nuxt-studio',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
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

  studio: {
    route: '/_studio', // default
    repository: {
      provider: 'github',
      owner: 'gnugomez',
      repo: 'sispli.com',
      branch: 'main',
    },
  },

  vite: {
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({
            prefix: '',
            strict: true,
          }),
        ],
        dts: true,
      }) as any,
    ],
  },
})
