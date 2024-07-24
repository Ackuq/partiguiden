// @ts-check
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const reactApps = ["apps/web"];

const files = reactApps.flatMap((app) => [`${app}/**/*.ts`, `${app}/**/*.tsx`]);

const reactConfig = tseslint.config(
  {
    name: "React plugins",
    files,
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  {
    files,
    name: "React Hooks plugin",
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },
);

export default reactConfig;
