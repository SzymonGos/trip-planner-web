import { headers } from 'next/headers';

export const getRedirectUrl = async (fallbackUrl: string = '/') => {
  const headersList = await headers();
  const referer = headersList.get('referer') || fallbackUrl;
  return referer;
};
