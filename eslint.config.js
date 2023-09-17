import path from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("@nuxt/eslint-config", "eslint-config-prettier"),
  {
    ignores: [".nuxt/**/*", ".output/**/*"],
  },
  {
    files: ["**/*.vue"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
