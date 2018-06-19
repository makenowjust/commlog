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
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
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
