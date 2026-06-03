'use client';

import React, { FC } from 'react';
import { useReadQuery, QueryRef } from '@apollo/client';
import { TripCard } from '@/features/trip/components/TripCard/TripCard';
import { Trip as TTrip } from 'tp-graphql-types';

type TTripsListProps = {
  queryRef: QueryRef<{ trips: TTrip[] }>;
};

export const TripsList: FC<TTripsListProps> = ({ queryRef }) => {
  const { data } = useReadQuery(queryRef);
  const trips = data?.trips;

  return <>{trips?.map((trip: TTrip) => <TripCard key={trip?.id} trip={trip} />)}</>;
};
