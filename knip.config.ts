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
      next: {
        project: ["config/**/*"],
      },
      // TODO: Remove when instrumentation-client is supported by knip
      ignore: ["instrumentation-client.ts"],
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
