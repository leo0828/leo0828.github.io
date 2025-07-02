// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@lobehub/webfont-harmony-sans-sc@1.0.0/css/index.min.css",
        },
      ],
    },
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@unocss/nuxt", "nuxt-shiki"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY, //
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
