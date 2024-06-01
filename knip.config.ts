import { KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    ".": {
      ignoreDependencies: ["eslint-config-next"],
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
  },
};

export default config;
