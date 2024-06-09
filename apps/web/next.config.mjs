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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "data.riksdagen.se",
        port: "",
        pathname: "/filarkiv/bilder/**",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
  webpack: function (config) {
    // Remove once the `Critical dependency: the request of a dependency is an expression` warning is fixed
    const ignoreRule = { module: /@opentelemetry\/instrumentation/ };
    config.ignoreWarnings = config.ignoreWarnings || [];
    config.ignoreWarnings.push(ignoreRule);
    return config;
  },
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
