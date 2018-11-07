module.exports = {
  root: true,
  plugins: ['import', 'promise', 'unicorn', 'vue'],
  extends: [
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:vue/recommended',
    'xo-space/esnext',
    'prettier',
  ],
  rules: {
    'import/order': ['error', {'newlines-between': 'always'}],
    'import/no-unassigned-import': [
      'error',
      {
        allow: ['vue-awesome/icons/*'],
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // `prettier` can format `*.vue` files better.
    // So, some rules are disabled.
    'vue/max-attributes-per-line': ['off'],
    'vue/html-closing-bracket-newline': ['off'],
  },
  overrides: [
    {
      files: 'components/*.vue',
      rules: {
        'unicorn/filename-case': ['error', {case: 'pascalCase'}],
      },
    },
  ],
};
