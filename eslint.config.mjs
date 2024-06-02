// @ts-check
import tseslint from "typescript-eslint";

import baseConfig from "./tooling/eslint/base.mjs";
import nextConfig from "./tooling/eslint/next.mjs";
import reactConfig from "./tooling/eslint/react.mjs";

const config = tseslint.config(...baseConfig, ...reactConfig, ...nextConfig);

export default config;
