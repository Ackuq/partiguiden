import { defineConfig, globalIgnores } from "eslint/config";

import baseConfig from "@partiguiden/eslint-config/base";

const config = defineConfig(globalIgnores(["dist/**", ".rollup.cache/**"]), baseConfig);

export default config;
