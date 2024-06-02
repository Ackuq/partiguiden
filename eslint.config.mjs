// @ts-check
import tseslint from "typescript-eslint";

import baseConfig from "./tooling/eslint/base.mjs";
import nextConfig from "./tooling/eslint/next.mjs";

const config = tseslint.config(...baseConfig, ...nextConfig, {
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
});

export default config;
