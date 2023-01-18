/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

module.exports = nextConfig;
