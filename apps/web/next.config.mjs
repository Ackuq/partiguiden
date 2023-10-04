import { withSentryConfig } from "@sentry/nextjs";
import bundleAnalyzer from "@next/bundle-analyzer";
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
});

/**
 * @type {Partial<import('@sentry/nextjs').SentryWebpackPluginOptions>}
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
