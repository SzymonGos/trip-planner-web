import { useCallback, useRef } from 'react';

export const useRouteUsage = (isAuth: boolean) => {
  const isProcessingRef = useRef(false);
  const completedRoutesRef = useRef<Set<string>>(new Set());
  const currentRouteCount = 0;

  const incrementRouteCount = useCallback(
    async (origin: string, destination: string) => {
      if (!isAuth) {
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
        completedRoutesRef.current.add(routeHash);
      } catch (error) {
        console.error('Failed to update route count:', error);
      } finally {
        isProcessingRef.current = false;
      }
    },
    [isAuth],
  );

  return {
    currentRouteCount,
    incrementRouteCount,
  };
};
