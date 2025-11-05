import IconsResolver from 'unplugin-icons/resolver'
import ViteComponents from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    'unplugin-icons/nuxt',
    'nuxt-studio'
  ],

  postcss: {
    plugins: {
      'tailwindcss': {},
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
    repository: {
      provider: 'github',
      owner: 'gnugomez',
      repo: 'sispli.com',
      branch: 'main',
      rootDir: ''
    }
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
      }),
    ],
  },
})