import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    linterOptions: { reportUnusedDisableDirectives: false },
  },
  globalIgnores([".next/**", "out/**", "node_modules/**"]),
]);
