/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
  images: {
    remotePatterns: [
      {
        hostname: "loremflickr.com",
      },
    ],
  },
};

module.exports = nextConfig;
