import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

const reactConfig = defineConfig(
  // @ts-expect-error -- Colliding eslint versions
  {
    files: ["**/*.jsx", "**/*.tsx"],
    name: "React plugins",
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  reactHooks.configs.flat["recommended-latest"],
);

export default reactConfig;
