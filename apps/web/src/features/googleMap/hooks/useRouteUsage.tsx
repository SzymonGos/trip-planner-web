import { useCallback, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { updateUserRouteCountMutationQuery } from '../server/actions/updateUserRouteCountMutationQuery';
import { getUserRouteCountQuery } from '../server/db/getUserRouteCountQuery';
import { USER_GOOGLE_MAPS_ROUTE_LIMIT } from '@/lib/config';

export const useRouteUsage = (authUserId: string) => {
  const { data: userData, refetch } = useQuery(getUserRouteCountQuery, {
    variables: { id: authUserId },
    skip: !authUserId,
  });

  const [updateUserRouteCount] = useMutation(updateUserRouteCountMutationQuery);
  const isProcessingRef = useRef(false);
  const completedRoutesRef = useRef<Set<string>>(new Set());
  const currentRouteCount = userData?.user?.googleMapsRouteCount || 0;
  const usagePercentage = Math.round((currentRouteCount / USER_GOOGLE_MAPS_ROUTE_LIMIT) * 100);
  const resetDate = userData?.user?.googleMapsRouteResetDate;

  const incrementRouteCount = useCallback(
    async (origin: string, destination: string) => {
      if (!authUserId) {
        return;
      }
      const routeHash = `${origin}|${destination}`.toLowerCase();
      if (completedRoutesRef.current.has(routeHash)) {
        return;
      }
      if (isProcessingRef.current) {
        console.log('Already processing, skipping');
        return;
      }

      isProcessingRef.current = true;

      try {
        const newCount = currentRouteCount + 1;
        await updateUserRouteCount({
          variables: {
            updateUserWhere: { id: authUserId },
            data: { googleMapsRouteCount: newCount },
          },
        });

        completedRoutesRef.current.add(routeHash);
      } catch (error) {
        console.error('Failed to update route count:', error);
      } finally {
        isProcessingRef.current = false;
      }
    },
    [authUserId, currentRouteCount, updateUserRouteCount],
  );

  const canCreateRoute = currentRouteCount < USER_GOOGLE_MAPS_ROUTE_LIMIT;

  return {
    currentRouteCount,
    usagePercentage,
    resetDate,
    incrementRouteCount,
    canCreateRoute,
    refetch,
  };
};
