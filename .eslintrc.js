module.exports = {
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
    // `prettier` can format it better.
    'vue/max-attributes-per-line': ['off'],
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
