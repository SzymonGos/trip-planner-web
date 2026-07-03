/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET || '',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    API_URL: process.env.API_URL || '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [process.env.CLOUDINARY_API_DOMAIN || ''],
  },
  outputFileTracingRoot: '/web',
};

module.exports = nextConfig;
