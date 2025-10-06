// @ts-check
import { defineConfig } from "eslint/config";

import baseConfig from "./tooling/eslint/base.mjs";
import nextConfig from "./tooling/eslint/next.mjs";
import reactConfig from "./tooling/eslint/react.mjs";

const config = defineConfig(
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
    name: "Next.js environment",
    files: ["./apps/web/next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    name: "Ignore actions dist",
    ignores: ["actions/*/dist"],
  },
);

export default config;
