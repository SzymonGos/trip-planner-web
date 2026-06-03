'use client';

import React, { FC, useEffect, useState } from 'react';
import { useReadQuery, QueryRef } from '@apollo/client';
import { ViewTrip } from './ViewTrip';
import { Trip as TTrip } from 'tp-graphql-types';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';

type TViewTripContainerProps = {
  queryRef: QueryRef<{ trip: TTrip }>;
};

export const ViewTripContainer: FC<TViewTripContainerProps> = ({ queryRef }) => {
  const { setDirectionsValue } = useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const [expanded, setExpanded] = useState(false);

  const { data } = useReadQuery(queryRef);
  const trip = data?.trip;
  const isOwner = trip?.creator?.id === authUserId;

  useEffect(() => {
    if (trip?.origin && trip?.destination) {
      setDirectionsValue({
        origin: trip.origin,
        destination: trip.destination,
      });
    }
  }, [trip, setDirectionsValue]);

  return <ViewTrip trip={trip} isOwner={isOwner} expanded={expanded} setExpanded={setExpanded} />;
};
