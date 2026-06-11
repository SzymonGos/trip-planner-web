import { useCallback, useRef } from 'react';
import { USER_GOOGLE_MAPS_ROUTE_LIMIT } from '@/lib/config';

export const useRouteUsage = (authUserId: string) => {
  // user roue count api

  // user rout ecount mutation

  const isProcessingRef = useRef(false);
  const completedRoutesRef = useRef<Set<string>>(new Set());
  const currentRouteCount = 0;
  const usagePercentage = Math.round((currentRouteCount / USER_GOOGLE_MAPS_ROUTE_LIMIT) * 100);
  // const resetDate = userData?.user?.googleMapsRouteResetDate;
  const resetDate = '';

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
        // const newCount = currentRouteCount + 1;
        // user route count update

        completedRoutesRef.current.add(routeHash);
      } catch (error) {
        console.error('Failed to update route count:', error);
      } finally {
        isProcessingRef.current = false;
      }
    },
    [authUserId, currentRouteCount],
  );

  const canCreateRoute = currentRouteCount < USER_GOOGLE_MAPS_ROUTE_LIMIT;

  return {
    currentRouteCount,
    usagePercentage,
    resetDate,
    incrementRouteCount,
    canCreateRoute,
    // refetch,
  };
};
