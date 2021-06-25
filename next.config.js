/* eslint-disable @typescript-eslint/no-var-requires */
const withSourceMaps = require('@zeit/next-source-maps');
const { withSentryConfig } = require('@sentry/nextjs');

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
} = process.env;

const moduleExports = withSourceMaps({
  target: 'serverless',
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
  },

  basePath: '',
});

const SentryWebpackPluginOptions = {
  silent: true,
};

if (SENTRY_ORG && SENTRY_PROJECT) {
  module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
} else {
  module.exports = moduleExports;
}
