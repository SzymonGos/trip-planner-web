import React, { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import { TripCard } from '@/features/trip/components/TripCard/TripCard';
import { EmptyTripsState } from '../../trip/EmptyTripsState';
import { isEmpty } from 'lodash';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';

type TUserTripsListProps = {
  trips: TTrip[];
  isLoading: boolean;
};

export const UserTripsList: FC<TUserTripsListProps> = ({ trips, isLoading }) => {
  const { authUserId } = useAuthenticatedUser();

  if (isEmpty(trips) && !isLoading) {
    return <EmptyTripsState authUserId={authUserId} />;
  }

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};
