// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      // apiBaseUrl: "/api",
      // apiImgUrl: "/images",

      apiBaseUrl: "https://random-tanuki.vercel.app/api",
      apiImgUrl: "https://random-tanuki.vercel.app/images",
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
