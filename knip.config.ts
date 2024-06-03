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
      ignoreDependencies: ["request", "encoding"],
      tailwind: {
        project: ["lib/colors/**/*"],
      },
    },
    "packages/party-data": {
      entry: ["scripts/cli.ts"],
      ignoreDependencies: ["prettier"],
    },
    "actions/update-standpoints": {
      ignore: ["dist/**/*"],
    },
  },
};

export default config;
