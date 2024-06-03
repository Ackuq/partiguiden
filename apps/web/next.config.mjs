// @ts-check
import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

import redirects from "./config/redirect.mjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

let moduleExports = withBundleAnalyzer({
  productionBrowserSourceMaps: true,
  transpilePackages: ["@partiguiden/party-data"],
  redirects,
  basePath: "",
});

/**
 * @type {Parameters<typeof withSentryConfig>[1]}
 */
const sentryWebpackPluginOptions = {
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
};

if (process.env.VERCEL) {
  moduleExports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
}

export default moduleExports;
