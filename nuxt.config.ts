// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@unocss/nuxt", "nuxt-shiki"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiToken: process.env.API_TOKEN, // butter cms token
      apiBase: process.env.NUXT_PUBLIC_API_BASE, // butter cms API
    },
  },
  // @ts-ignore
  shiki: {
    bundledLangs: [
      "javascript",
      "html",
      "css",
      "json",
      "shell",
      "vue",
      "markdown",
    ],
    defaultTheme: "one-dark-pro",
  },
});
