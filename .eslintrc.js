module.exports = {
  plugins: ['import', 'unicorn'],
  extends: ['plugin:vue/recommended', 'xo-space/esnext', 'plugin:unicorn/recommended', 'prettier'],
  rules: {
    'unicorn/filename-case': 'off',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': [
      'error',
      {
        js: 'never',
        json: 'never',
        jsx: 'never',
      },
    ],
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': ['error', {allowComputed: true}],
    'import/no-absolute-path': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/newline-after-import': 'error',
    'import/no-amd': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-as-default': 'error',
    'import/no-unresolved': ['error', {commonjs: true}],
    'import/order': 'error',
    'import/no-unassigned-import': [
      'error',
      {
        allow: ['babel-polyfill', '@babel/polyfill', 'babel-register', '@babel/register'],
      },
    ],
  },
};
