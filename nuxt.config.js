import path from 'path';

import merge from 'deepmerge';

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  mode: 'spa',
  css: ['modern-normalize', './assets/scss/main.scss'],
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
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
  modules: ['@nuxtjs/axios'],
  plugins: ['./plugins/axios'],
  loading: {
    color: '#4a4a4a',
  },
  loadingIndicator: {
    color: '#4a4a4a',
  },
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
        fiber: require('fibers'),
      },
    },
    extend(config) {
      config.resolve.alias.lowlight$ = path.join(__dirname, './lib/lowlight');
    },
  },
};

const envs = {
  development: {
    plugins: ['./plugins/test-directive-fake', './plugins/axios-mock'],
  },
  test: {
    plugins: ['./plugins/test-directive', './plugins/axios-mock'],
  },
  production: {
    modules: ['@nuxtjs/sentry', '@nuxtjs/google-analytics'],
    plugins: ['./plugins/test-directive-fake'],
    sentry: {
      dsn: 'https://cd350f3bc93247049a7c1d3bfea4ccbc@sentry.io/1207111',
    },
    'google-analytics': {
      id: 'UA-49200696-6',
    },
  },
};

export default merge(config, envs[NODE_ENV]);
