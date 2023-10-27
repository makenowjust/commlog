import type * as vite from "vite";

import license from "rollup-plugin-license";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  devtools: { enabled: true },
  css: ["highlight.js/styles/atom-one-dark.css"],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["bun-types"],
      },
    },
  },
  vite: {
    plugins: [
      license({
        thirdParty: {
          includePrivate: false,
          allow: {
            test: (dependency) => {
              if (!dependency.license) return false;

              if (
                dependency.name === "@nuxt/ui-templates" &&
                dependency.license === "CC-BY-ND-4.0"
              )
                return true;

              return [
                "Apache-2.0",
                "BSD-2-Clause",
                "BSD-3-Clause",
                "ISC",
                "MIT",
                "Unlicense",
              ].includes(dependency.license);
            },
            failOnUnlicensed: true,
            failOnViolation: true,
          },
          output: {
            file: "public/LICENSES.txt",
          },
        },
      }) as vite.Plugin,
    ],
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
