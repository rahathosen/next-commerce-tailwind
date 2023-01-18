/** @type {import('next').NextConfig} */

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });

// const nextConfig = withPWA({
//   reactStrictMode: true,
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
//   i18n: {
//     locales: ["en"],
//     defaultLocale: "en",
//   },
// });

// module.exports = nextConfig;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  swcMinify: true,
  compiler: {
    // removeConsole: process.env.NODE_ENV !== "development",
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  register: true,
});

module.exports = withPWA(nextConfig);
