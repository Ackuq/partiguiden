/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.BASE_PATH || 'https://partiguiden.nu',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
