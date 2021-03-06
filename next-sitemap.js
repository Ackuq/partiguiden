const robotsTxtPolicy =
  process.env.VERCEL_ENV === 'production'
    ? [{ userAgent: '*', allow: '/' }]
    : [{ userAgent: '*', disallow: '/' }];

module.exports = {
  siteUrl: process.env.BASE_PATH || 'https://partiguiden.se',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: robotsTxtPolicy,
  },
};
