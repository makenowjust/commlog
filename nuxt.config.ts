// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  devtools: { enabled: true },
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "highlight.js/styles/atom-one-dark.css",
  ],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["bun-types"],
      },
    },
  },
  app: {
    head: {
      title: "commlog",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  googleFonts: {
    families: {
      Raleway: true,
      Oswald: true,
    },
    download: false,
  },
});
