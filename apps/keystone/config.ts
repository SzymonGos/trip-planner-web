import 'dotenv/config';

export const CORS_ORIGIN = [
  'http://localhost:4000',
  /^https:\/\/(app|keystone)-trip-planner[a-z0-9-_]+\.up\.railway\.app$/,
  /^https:\/\/trip-planner-(app|keystone|)\.up\.railway\.app$/,
  'https://routetripper.com',
];
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const DATABASE_URL_SUFFIX = process.env.DATABASE_URL_SUFFIX || '';

export const SHADOW_DATABASE_URL = process.env.SHADOW_DATABASE_URL || '';

export const CLOUDINARY_CONFIGS = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  apiKey: process.env.CLOUDINARY_API_KEY || '',
  apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  folder: process.env.CLOUDINARY_API_FOLDER || '',
};

export const SESSION_SECRET = process.env.SESSION_SECRET || '';

export type TCloudinaryImageProps = {
  id?: string;
  _meta?: {
    public_id: string;
  };
};
