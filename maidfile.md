# maidfile

This file is to define tasks for [maid](https://github.com/egoist/maid) task runner.

## dev

Start development server.

When `--no-mock` is specified, it dosen't use API mock.

```bash
if [[ $1 == --no-mock ]]; then
  NODE_ENV=developmentNoMock
else
  NODE_ENV=development
fi
set -ex
export NODE_ENV=$NODE_ENV
nuxt
```

## lint

Run formatter and linters.

You can use `yarn format` to fix files as possible.

```bash
if [[ $1 == --fix ]]; then
  lint_opt=--fix
  prettier_opt=--write
else
  lint_opt=
  prettier_opt=--list-different
fi
set -ex
prettier-package-json $prettier_opt
prettier --ignore-path .gitignore '**/*.{js,json,md,scss,vue,yml}' $prettier_opt
eslint --ignore-path .gitignore '**/*.{js,vue}' $lint_opt
stylelint --ignore-path .gitignore '**/*.{scss,vue}' $lint_opt
```

## generate

Generate commlog as static web application.

```bash
set -ex
export NODE_ENV=production
nuxt generate
```

## test

Run unit test and end-to-end test.

To update snapshot, use `yarn snapshot'.

```bash
set -ex
yarn unit-test
yarn e2e-test
```

## unit-test

Run unit test with coverage.

```bash
set -ex
nyc ava --config ./ava.unit.config.js "$@"
```

## e2e-test

Run end-to-end test (without coverage).

```bash
set -ex
export NODE_ENV=test
nuxt build
ava --config ./ava.e2e.config.js"$@"
```
