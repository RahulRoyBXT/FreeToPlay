/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.freetogame.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      }
    ],
  },
};

module.exports = nextConfig;