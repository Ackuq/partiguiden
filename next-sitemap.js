const robotsTxtPolicy =
  process.env.VERCEL_ENV === 'production'
    ? [{ userAgent: '*', allow: '/' }]
    : [{ userAgent: '*', disallow: '/' }];

/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.BASE_PATH || 'https://partiguiden.nu',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: robotsTxtPolicy,
  },
};
