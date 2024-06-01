import { KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    ".": {},
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
    "packages/*": {},
  },
};

export default config;
