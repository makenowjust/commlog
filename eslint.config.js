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
      // This rule does not check variables used in Vue template.
      // Therefore, it causes many false positives.
      "@typescript-eslint/no-unused-vars": "off",
      // This rule causes many false positives.
      // It is disabled for now.
      "vue/valid-v-for": "off",
    },
  },
];
