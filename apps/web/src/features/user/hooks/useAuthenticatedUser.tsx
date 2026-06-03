'use client';

import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useAuth } from '@clerk/nextjs';
import { getUserIdByClerkIdQuery } from '../server/db/getUserIdByClerkIdQuery';

export const useAuthenticatedUser = () => {
  const { userId: clerkId, isLoaded, isSignedIn } = useAuth();

  const { data } = useQuery(getUserIdByClerkIdQuery, {
    variables: {
      clerkId,
    },
    skip: !clerkId || !isLoaded,
  });

  const authUserId = useMemo(() => data?.user?.id, [data]);

  const isAuth = isLoaded && isSignedIn && !!authUserId;

  return { authUserId, isAuth };
};
