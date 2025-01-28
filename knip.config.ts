import type { KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    ".": {
      eslint: {
        project: ["tooling/eslint/**/*"],
      },
    },
    "apps/web": {
      // Additional entry points
      entry: ["next-sitemap.config.js"],
      ignore: ["config/**/*"],
      tailwind: {
        project: ["lib/colors/**/*"],
      },
      ignoreDependencies: ["postcss"],
    },
    "packages/party-data": {
      entry: ["scripts/cli.ts"],
    },
    "actions/update-standpoints": {
      ignore: ["dist/**/*"],
    },
  },
};

export default config;
