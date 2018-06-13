export default {
  mode: 'spa',
  css: ['modern-normalize', '@/assets/scss/main.scss'],
  head: {
    title: 'commlog',
    meta: [{charset: 'utf-8'}, {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nova+Mono|Raleway|Oswald',
      },
      {
        rel: 'icon',
        href: '/favicon.png',
      },
    ],
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/sentry', '@nuxtjs/google-analytics'],
  plugins: ['~/plugins/axios', '~/plugins/test-directive'],
  loading: {
    color: '#4a4a4a',
  },
  loadingIndicator: {
    color: '#4a4a4a',
  },
  build: {
    extend(config) {
      config.resolve.alias['lowlight$'] = '~/lib/lowlight';
    },
  },
  sentry: {
    dsn: 'https://cd350f3bc93247049a7c1d3bfea4ccbc@sentry.io/1207111',
  },
  'google-analytics': {
    id: 'UA-49200696-6',
  },
};
