'use client';

import { Trip as TTrip } from 'tp-graphql-types';
import { TripCard } from '../trip/components/TripCard/TripCard';
import { FC } from 'react';
import { QueryRef, useReadQuery } from '@apollo/client';

type TFeaturedDestinationsProps = {
  queryRef: QueryRef<{ trips: TTrip[] }>;
};

export const FeaturedDestinations: FC<TFeaturedDestinationsProps> = ({ queryRef }) => {
  const { data } = useReadQuery(queryRef);
  const trips = data?.trips;

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trips?.map((trip: TTrip) => <TripCard key={trip.id} trip={trip} />)}
    </div>
  );
};
