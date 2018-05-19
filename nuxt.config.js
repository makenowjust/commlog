export default {
  mode: 'spa',
  css: [
    'modern-normalize',
    '@/assets/scss/main.scss',
  ],
  head: {
    title: 'commlog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
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
  loading: {
    color: '#4a4a4a',
  },
  loadingIndicator: {
    color: '#4a4a4a',
  },
  build: {
    extend(config) {
      config.resolve.alias['lowlight$'] = '~/lib/alias/lowlight';
    }
  }
};
