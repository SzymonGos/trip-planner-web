'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '../server/queries/getCurrentUserQuery';

export const useAuthenticatedUser = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const { data } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      return getCurrentUserQuery(token);
    },
  });

  const authUserId = data?.id;

  const user = data;

  const isAuth = isLoaded && isSignedIn && !!authUserId;

  return { authUserId, isAuth, user };
};
