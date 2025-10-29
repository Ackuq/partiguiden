// @ts-expect-error -- No types available
import nextVitals from "eslint-config-next/core-web-vitals";
// @ts-expect-error -- No types available
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const nextConfig = defineConfig(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  ...nextVitals,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
);

export default nextConfig;
