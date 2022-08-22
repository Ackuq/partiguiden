import { withSentryConfig } from '@sentry/nextjs';
import bundleAnalyzer from '@next/bundle-analyzer';
import runtimeCaching from 'next-pwa/cache.js';
import withPWA from 'next-pwa';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const {
  // Vercel
  VERCEL_GITHUB_COMMIT_SHA,

  // Sentry
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
} = process.env;

const moduleExports = withPWA(
  withBundleAnalyzer({
    productionBrowserSourceMaps: true,
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      runtimeCaching,
    },

    basePath: '',
  })
);

/**
 * @type {Partial<import('@sentry/nextjs').SentryWebpackPluginOptions>}
 */
const SentryWebpackPluginOptions = {
  silent: true,
  url: 'https://sentry.io/',
  org: SENTRY_ORG,
  project: SENTRY_PROJECT,
  authToken: SENTRY_AUTH_TOKEN,
  release: VERCEL_GITHUB_COMMIT_SHA,
};

const defaultExport =
  SENTRY_ORG && SENTRY_PROJECT
    ? withSentryConfig(moduleExports, SentryWebpackPluginOptions)
    : moduleExports;

export default defaultExport;
