'use client';

import React, { FC } from 'react';
import { TripCard } from '@/features/trip/components/TripCard/TripCard';

type TTripsListProps = {
   
  queryRef: any;
};

export const TripsList: FC<TTripsListProps> = ({ queryRef }) => {
  // const { data } = useReadQuery(queryRef);
  const trips = [];

   
  return (
    <>
      {trips?.map((trip: any) => (
        <TripCard key={trip?.id} trip={trip} />
      ))}
    </>
  );
};
