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

const COMMIT_SHA = VERCEL_GITHUB_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;
const basePath = '';

const moduleExports = withSourceMaps({
  target: 'serverless',
  env: {
    NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
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

  future: {
    webpack5: true,
  },

  basePath,
});

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
