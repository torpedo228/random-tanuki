// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
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
