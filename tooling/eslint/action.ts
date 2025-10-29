import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import turboPlugin from "eslint-plugin-turbo";
import { defineConfig } from "eslint/config";

const actionConfig = defineConfig({
  files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
  plugins: {
    // @ts-expect-error -- Colliding eslint versions
    import: importPlugin,
  },
  extends: [
    eslint.configs.recommended,
    turboPlugin.configs["flat/recommended"],
  ],
});

export default actionConfig;
