'use client';

import React from 'react';
import { UserTripsList } from './UserTripsList';
import type { TripResponse } from '@/features/trip/types/types';
import { MultipleTripCardsLoader } from '@/features/trip/components/MultipleTripCardsLoader';

type UserTripListContainerProps = {
  trips: TripResponse[];
  isLoading: boolean;
};

export const UserTripsListContainer = ({ trips, isLoading }: UserTripListContainerProps) => {
  if (isLoading) return <MultipleTripCardsLoader count={3} />;

  return (
    <div className="mt-5 col-span-full lg:col-span-9">
      <UserTripsList trips={trips} isLoading={isLoading} />
    </div>
  );
};
