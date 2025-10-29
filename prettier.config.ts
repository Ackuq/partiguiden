import type { Config } from "prettier";

const config: Config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  trailingComma: "all",
  tailwindFunctions: ["twMerge"],
  importOrder: ["^(@partiguiden|@app|@components|@lib)/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
