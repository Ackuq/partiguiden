import { withSentryConfig } from "@sentry/nextjs";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

let moduleExports = withBundleAnalyzer({
  productionBrowserSourceMaps: true,
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
};

if (process.env.VERCEL) {
  moduleExports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
}

export default moduleExports;
