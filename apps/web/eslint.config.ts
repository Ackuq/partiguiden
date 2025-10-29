import { defineConfig } from "eslint/config";

import baseConfig from "@partiguiden/eslint-config/base";
import nextConfig from "@partiguiden/eslint-config/next";
import reactConfig from "@partiguiden/eslint-config/react";

const config = defineConfig(baseConfig, reactConfig, nextConfig);

export default config;
