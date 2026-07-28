'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserId } from '../server/queries/getCurrentUserId';

export const useAuthenticatedUser = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const { data } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      return getCurrentUserId(token);
    },
  });

  const authUserId = data?.id;

  const isAuth = isLoaded && isSignedIn && !!authUserId;

  return { authUserId, isAuth };
};
