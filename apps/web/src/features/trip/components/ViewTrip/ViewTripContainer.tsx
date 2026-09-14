'use client';

import React, { FC, useEffect, useState } from 'react';
import { ViewTrip } from './ViewTrip';
import { useAuthenticatedUser } from '@/features/user/hooks/useAuthenticatedUser';
import { useGoogleMapsDirections } from '@/lib/contexts/DirectionsContext';
import { useQuery } from '@tanstack/react-query';
import { getTripByIdQuery } from '../../server/queries/getTripByIdQuery';

type TViewTripContainerProps = {
  id: number;
};

export const ViewTripContainer: FC<TViewTripContainerProps> = ({ id }) => {
  const { setDirectionsValue } = useGoogleMapsDirections();
  const { authUserId } = useAuthenticatedUser();
  const [expanded, setExpanded] = useState(false);

  const { data: trip } = useQuery({
    queryKey: ['trip'],
    queryFn: () => getTripByIdQuery(id),
  });

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
