/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL || '',
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET || '',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [process.env.CLOUDINARY_API_DOMAIN || ''],
  },
};

module.exports = nextConfig;
