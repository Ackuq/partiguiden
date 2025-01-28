import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

import redirects from "./config/redirect.mjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
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

export default withSentryConfig(nextConfig, {
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
});
