/** @type {import("prettier").Config} */
const config = {
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
