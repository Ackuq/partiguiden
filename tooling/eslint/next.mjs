// @ts-check
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const nextApps = ["apps/web"];

const files = nextApps.flatMap((app) => [`${app}/**/*.ts`, `${app}/**/*.tsx`]);
const ignores = nextApps.map((app) => `**/${app}/.next`);

const nextConfig = tseslint.config(
  {
    name: "Next plugin",
    files,
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
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
