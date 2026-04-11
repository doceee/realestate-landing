export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxtjs/i18n'],

  app: {
    head: {
      title: 'Maison — Luxury Real Estate',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Exceptional properties for discerning clients. Luxury real estate redefined.' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/index.css'],
  compatibilityDate: '2024-11-01',

  routeRules: {
    '/': { redirect: '/en' },
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-GB', file: 'en.json' },
      { code: 'pl', name: 'Polski',  language: 'pl-PL', file: 'pl.json' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix',
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL ?? 'https://maison.co',
  },
})
