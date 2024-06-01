import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

// TODO Remove this when next/core-web-vitals is updated to use the new config format
// https://github.com/vercel/next.js/issues/58411
const flatCompat = new FlatCompat();
const nextCoreWebVitals = fixupConfigRules(
  flatCompat.extends("next/core-web-vitals"),
);

const nextConfigs = nextCoreWebVitals.map((config) => {
  return {
    ...config,
  };
});

const config = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["apps/web/**/*"],
    extends: [...nextConfigs],
    settings: {
      next: {
        rootDir: "apps/web/",
      },
    },
  },
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
