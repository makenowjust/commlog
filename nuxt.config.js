export default {
  mode: 'spa',
  css: [
    'modern-normalize',
    '@/assets/scss/main.scss',
  ],
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nova+Mono|Raleway|Oswald',
      },
    ],
  },
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: [
    '~/plugins/axios',
  ],
  router: {
    base: '/commlog/',
  },
  generate: {
    fallback: true,
  },
};
