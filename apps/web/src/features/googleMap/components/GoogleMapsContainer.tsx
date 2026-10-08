'use client';

import React from 'react';
import { GoogleMaps } from './GoogleMaps';
import { useParams, usePathname } from 'next/navigation';
import { TripDistanceInfo } from '@/features/trip/components/TripDistanceInfo/TripDistanceInfo';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { getUserUsageQuery } from '../server/queries/getUserUsageQuery';

export const GoogleMapsContainer = () => {
  const params = useParams();
  const pathname = usePathname();
  const tripId = params?.id as string;
  const { distanceInfo } = useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const { getToken } = useAuth();

  const isTripViewPage = pathname.startsWith(`/trip/${tripId}`);
  const isTripPlannerPage = pathname.startsWith('/trip/planner');
  const isEditTripPlannerPage = pathname.startsWith('/trip/planner/edit/');
  const canEdit = !isTripViewPage;
  const shouldCountRoutes = (isTripPlannerPage || isEditTripPlannerPage) && !isTripViewPage;

  const { data } = useQuery({
    queryKey: ['user-usage'],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      return getUserUsageQuery(token);
    },
  });

  const routeCount = data?.googleMapsRouteCount ?? 0;
  const maxLimit = data?.googleMapsMaxLimit ?? 0;
  const resetDate = data?.googleMapsRouteResetDate ?? '';

  const canCreateRoute = !!data && routeCount < maxLimit;
  const usagePercentage = maxLimit > 0 ? Math.round((routeCount / maxLimit) * 100) : 0;

  // const canCreateRoute = data?.googleMapsRouteCount < data?.googleMapsMaxLimit;
  // const usagePercentage = Math.round((data?.googleMapsRouteCount / data?.googleMapsMaxLimit) * 100);

  return (
    <>
      {authUserId && (isTripPlannerPage || isEditTripPlannerPage) && (
        <TripDistanceInfo
          distanceMeters={distanceInfo?.distanceMeters}
          estimatedDurationSeconds={distanceInfo?.estimatedDurationSeconds}
          currentRouteCount={routeCount}
          usagePercentage={usagePercentage}
          googleMapsMaxLimit={maxLimit}
          resetDate={resetDate}
        />
      )}
      <GoogleMaps
        canEdit={canEdit}
        shouldCountRoutes={shouldCountRoutes}
        canCreateRoute={canCreateRoute}
        googleMapMaxLimit={data?.googleMapsMaxLimit}
      />
      {/* todo: refactor ai chat AiChatSheetContainer */}
    </>
  );
};
