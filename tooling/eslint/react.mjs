// @ts-check
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

const reactApps = ["apps/web"];

const files = reactApps.flatMap((app) => [`${app}/**/*.ts`, `${app}/**/*.tsx`]);

const reactConfig = defineConfig(
  {
    name: "React plugins",
    files,
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  {
    name: "React Hooks plugin",
    files,
    ...reactHooksPlugin.configs.flat.recommended,
  },
);

export default reactConfig;
