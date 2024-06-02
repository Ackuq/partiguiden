// @ts-check
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const reactApps = ["apps/web"];

const files = reactApps.flatMap((app) => [`${app}/**/*.ts`, `${app}/**/*.tsx`]);

const reactConfig = tseslint.config({
  files,
  plugins: {
    react: reactPlugin,
    "react-hooks": hooksPlugin,
  },
  rules: {
    ...reactPlugin.configs["jsx-runtime"].rules,
    ...hooksPlugin.configs.recommended.rules,
  },
  languageOptions: {
    globals: {
      React: "writable",
    },
  },
});

export default reactConfig;
