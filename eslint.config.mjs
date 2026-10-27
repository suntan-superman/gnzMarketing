import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-control-regex": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^(?:_|[A-Z])", varsIgnorePattern: "^[A-Z]" }],
    },
  },
  globalIgnores([".next/**", "out/**", "node_modules/**"]),
]);
