// @ts-check
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const nextApps = ["apps/web"];

const files = nextApps.flatMap((app) => [`${app}/**/*.ts`, `${app}/**/*.tsx`]);
const ignores = nextApps.map((app) => `**/${app}/.next`);

const nextConfig = tseslint.config(
  {
    files,
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // TypeError: context.getAncestors is not a function
      "@next/next/no-duplicate-head": "off",
    },
    settings: {
      next: {
        rootDir: nextApps.map((app) => `${app}/`),
      },
    },
  },
  {
    name: "Ignores",
    ignores,
  },
);

export default nextConfig;
