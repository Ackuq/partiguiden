/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_PATH || "https://partiguiden.nu",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies:
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? [{ userAgent: "*", allow: "/" }]
        : [{ userAgent: "*", disallow: "/" }],
  },
};
