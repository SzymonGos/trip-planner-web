export const GRAPHQL_API_URL =
  process.env.GRAPHQL_API_URL ||
  process.env.NEXT_PUBLIC_GRAPHQL_API ||
  (process.env.NODE_ENV === 'production'
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/api/graphql`
    : 'http://localhost:3000/api/graphql');

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
export const IPAPI_URL = 'https://ipapi.co/json/';
export const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET || process.env.CLERK_WEBHOOK_SECRET || '';
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const CHAT_API_URL = '/api/chat';
export const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

export const USER_GOOGLE_MAPS_ROUTE_LIMIT = 10;
export const USER_AI_CHAT_LIMIT = 20;
