import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

import redirects from "./config/redirect";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  staticPageGenerationTimeout: 120,
  productionBrowserSourceMaps: true,
  reactCompiler: true,
  transpilePackages: ["@partiguiden/party-data"],
  redirects,
  basePath: "",
  experimental: {
    useTypeScriptCli: false,
    // Some endpoints might rate-limit, keep to 1 to reduce risk of being continously rate-limited
    staticGenerationMaxConcurrency: 1,
  },
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
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
