module.exports = {
  root: true,
  plugins: ['import', 'promise', 'unicorn', 'vue'],
  extends: [
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    // Many `*.vue` format error fixes by `prettier`,
    // however these fixes are conflicted with `eslint-plugin-vue`...
    // So, they are disabled for now.
    'plugin:vue/essential',
    'xo-space',
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
    // These rules are too strict for me.
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-null': 'off',
  },
  overrides: [
    {
      files: ['components/*.vue'],
      rules: {
        'unicorn/filename-case': ['error', {case: 'pascalCase'}],
      },
    },
    {
      files: ['layouts/*.vue', 'pages/**/*.vue'],
      rules: {'vue/multi-word-component-names': 'off'},
    },
  ],
};
