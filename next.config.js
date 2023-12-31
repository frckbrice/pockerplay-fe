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
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "www.google.com",
      },
      {
        hostname: "***",
      },
    ],
  },
};

module.exports = nextConfig;
