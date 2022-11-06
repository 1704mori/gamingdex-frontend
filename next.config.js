// const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-US", "ja"],
    defaultLocale: "en-US",
  },
  images: {
    domains: [
      "imgur.com",
      "i.imgur.com",
      "images.igdb.com",
      "uploads.gaminglist.net",
    ],
  },
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;

// module.exports = () => {
//   return removeImports(nextConfig);
// };
