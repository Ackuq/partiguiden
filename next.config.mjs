import { withSentryConfig } from '@sentry/nextjs';
import bundleAnalyzer from '@next/bundle-analyzer';
import runtimeCaching from 'next-pwa/cache.js';
import withPWA from 'next-pwa';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

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
const sentryWebpackPluginOptions = {
  silent: true,
};

const defaultExport = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

export default defaultExport;
