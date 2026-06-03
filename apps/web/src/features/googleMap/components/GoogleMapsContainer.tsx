'use client';

import React from 'react';
import { GoogleMaps } from './GoogleMaps';
import { useParams, usePathname } from 'next/navigation';
import { TripDistanceInfo } from '@/features/trip/components/TripDistanceInfo/TripDistanceInfo';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { AiChatSheetContainer } from '@/features/aichat/AiChatSheetContainer';
import { useRouteUsage } from '../hooks/useRouteUsage';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';

export const GoogleMapsContainer = () => {
  const params = useParams();
  const pathname = usePathname();
  const tripId = params?.id as string;
  const { distanceInfo } = useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const { currentRouteCount, usagePercentage, resetDate } = useRouteUsage(authUserId);

  const isTripViewPage = pathname.startsWith(`/trip/${tripId}`);
  const isTripPlannerPage = pathname.startsWith('/trip/planner');
  const isEditTripPlannerPage = pathname.startsWith('/trip/planner/edit/');
  const canEdit = !isTripViewPage;
  const shouldCountRoutes = (isTripPlannerPage || isEditTripPlannerPage) && !isTripViewPage;

  return (
    <>
      {authUserId && (isTripPlannerPage || isEditTripPlannerPage) && (
        <TripDistanceInfo
          distance={distanceInfo?.distance}
          duration={distanceInfo?.duration}
          currentRouteCount={currentRouteCount}
          usagePercentage={usagePercentage}
          resetDate={resetDate}
        />
      )}
      <GoogleMaps canEdit={canEdit} shouldCountRoutes={shouldCountRoutes} />
      {canEdit && <AiChatSheetContainer />}
    </>
  );
};
