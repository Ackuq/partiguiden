import { withSentryConfig } from '@sentry/nextjs';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const moduleExports = withBundleAnalyzer({
  productionBrowserSourceMaps: true,
  basePath: '',
});

/**
 * @type {Partial<import('@sentry/nextjs').SentryWebpackPluginOptions>}
 */
const sentryWebpackPluginOptions = {
  silent: true,
};

const defaultExport = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

export default defaultExport;
