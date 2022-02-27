import { withSentryConfig } from '@sentry/nextjs';
import bundleAnalyzer from '@next/bundle-analyzer';
import runtimeCaching from 'next-pwa/cache.js';
import withPWA from 'next-pwa';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const {
  // Vercel
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_ENV,

  // Custom
  API_URL,
  PROXY_URL,
  BASE_PATH,

  // Sentry
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,

  // Google AdSense
  AD_CLIENT_ID,
  FLOW_AD_SLOT,
  RESPONSIVE_AD_SLOT,
} = process.env;

const moduleExports = withPWA(
  withBundleAnalyzer({
    productionBrowserSourceMaps: true,
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      runtimeCaching,
    },
    env: {
      NEXT_PUBLIC_COMMIT_SHA: VERCEL_GITHUB_COMMIT_SHA,
      API_URL,
      BASE_PATH,
      PROXY_URL,
      VERCEL_ENV,

      // Sentry
      SENTRY_DSN,
      SENTRY_URL: 'https://sentry.io/',
      SENTRY_ORG,
      SENTRY_PROJECT,
      SENTRY_AUTH_TOKEN,

      // Google AdSense
      AD_CLIENT_ID,
      FLOW_AD_SLOT,
      RESPONSIVE_AD_SLOT,
    },

    basePath: '',
  })
);

const SentryWebpackPluginOptions = {
  silent: true,
};

const defaultExport =
  SENTRY_ORG && SENTRY_PROJECT
    ? withSentryConfig(moduleExports, SentryWebpackPluginOptions)
    : moduleExports;

export default defaultExport;
