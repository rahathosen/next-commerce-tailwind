/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  // disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

module.exports = nextConfig;
