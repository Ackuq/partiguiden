import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    name: "Disable type checking for JS files",
    files: ["**/*.js", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  //...fixupConfigRules(flatCompat.extends("next/core-web-vitals")),
  {
    languageOptions: {
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./apps/*/tsconfig.json",
          "./packages/*/tsconfig.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: "Ignores",
    ignores: ["**/.next", "**/out", "**/build", "**/.turbo"],
  },
);

export default config;
