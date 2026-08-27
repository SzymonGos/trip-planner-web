import { useCallback, useRef } from 'react';

export const useRouteUsage = (authUserId: number) => {
  // user route count api

  // user route count mutation

  const isProcessingRef = useRef(false);
  const completedRoutesRef = useRef<Set<string>>(new Set());
  const currentRouteCount = 0;

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

  return {
    currentRouteCount,
    resetDate,
    incrementRouteCount,
    // refetch,
  };
};
