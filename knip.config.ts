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
      ignoreDependencies: ["protobufjs"],
    },
    "actions/update-standpoints": {
      ignore: ["dist/**/*"],
    },
  },
};

export default config;
