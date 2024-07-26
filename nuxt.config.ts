// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL_DEV,
      apiImgUrl: process.env.API_IMG_URL_DEV,
    },
  },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: ["usePinia", "defineStore"],
      },
    ],
  ],
  css: ["~/assets/main.css"],
});
