'use client';

import { useMemo } from 'react';
import { useAuth } from '@clerk/nextjs';

export const useAuthenticatedUser = () => {
  const { userId: clerkId, isLoaded, isSignedIn } = useAuth();

  console.log(clerkId);
  // get user id by clerk id

  // const authUserId = useMemo(() => data?.user?.id, [data]);
  const authUserId = useMemo(() => '1', []);

  const isAuth = isLoaded && isSignedIn && !!authUserId;

  return { authUserId, isAuth };
};
