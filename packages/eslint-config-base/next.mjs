// @ts-check
import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

const flatCompat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // @ts-ignore
  ...fixupConfigRules(flatCompat.extends("next/core-web-vitals")),
  eslintPluginPrettierRecommended,
);
