import { defineConfig, globalIgnores } from "eslint/config";

import actionConfig from "@partiguiden/eslint-config/action";

const config = defineConfig(globalIgnores(["dist/**"]), actionConfig);

export default config;
