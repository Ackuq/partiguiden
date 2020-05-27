module.exports = {
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL,
    SHARE_BASE_URL: process.env.SHARE_BASE_URL,
  },
};
