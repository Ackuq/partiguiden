import { KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    ".": {
      prettier: true,
    },
    "apps/web": {
      // Additional entry points
      entry: ["next-sitemap.config.js"],
      ignore: ["config/**/*"],
      // Inherited from eslint config package
      ignoreBinaries: ["eslint"],
      ignoreDependencies: ["@typescript-eslint/utils", "request", "encoding"],
      eslint: true,
      tailwind: {
        project: ["lib/colors/**/*"],
      },
    },
    "packages/eslint-config-base": {
      ignoreDependencies: ["eslint-config-next"],
    },
    "packages/scrapers": {
      ignoreBinaries: ["eslint"],
      ignoreDependencies: ["@typescript-eslint/utils"],
      eslint: true,
    },
    "packages/party-data": {
      ignoreBinaries: ["eslint"],
      ignoreDependencies: ["@typescript-eslint/utils"],
      eslint: true,
    },
  },
};

export default config;
