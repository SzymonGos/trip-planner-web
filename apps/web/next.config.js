// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [process.env.CLOUDINARY_API_DOMAIN || ''],
  },
  outputFileTracingRoot: path.join(__dirname, '../..'),
  experimental: {
    globalNotFound: true,
  },
};

module.exports = nextConfig;
