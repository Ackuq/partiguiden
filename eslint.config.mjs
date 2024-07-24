// @ts-check
import tseslint from "typescript-eslint";

import baseConfig from "./tooling/eslint/base.mjs";
import nextConfig from "./tooling/eslint/next.mjs";
import reactConfig from "./tooling/eslint/react.mjs";

const config = tseslint.config(
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        project: [
          "./apps/web/tsconfig.json",
          "./tsconfig.json",
          "./packages/*/tsconfig.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: "Ignore actions dist",
    ignores: ["actions/*/dist"],
  },
);

export default config;
