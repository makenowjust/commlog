# maidfile

This file is to define tasks for [maid](https://github.com/egoist/maid) task runner.

## dev

Start development server.

```bash
nuxt
```

## lint

Run formatter and linters.

You can specify `--fix` flag to fix files as possible.

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
NODE_ENV=production nuxt generate
```

## test

Run test with coverage.

```bash
nyc ava "$@"
```
