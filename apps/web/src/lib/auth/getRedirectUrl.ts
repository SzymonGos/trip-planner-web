import { headers } from 'next/headers';

export const getRedirectUrl = (fallbackUrl: string = '/') => {
  const headersList = headers();
  const referer = headersList.get('referer') || fallbackUrl;
  return referer;
};
