import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getRedirectUrl } from './getRedirectUrl';

export const forceSignIn = async (fallbackUrl: string = '/') => {
  const { userId } = await auth();

  if (!userId) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent(getRedirectUrl(fallbackUrl))}`);
  }

  return userId;
};
