'use client';

import React from 'react';
import { UserTripsList } from './UserTripsList';
// import { MultipleTripCardsLoader } from '@/features/trip/components/MultipleTripCardsLoader';

type UserTripListContainerProps = {
  userId: string;
  username?: string;
};

export const UserTripsListContainer = ({ userId }: UserTripListContainerProps) => {
  console.log(userId);

  // get user trips api

  // if (loading) return <MultipleTripCardsLoader count={3} />;

  return (
    <div className="mt-5 col-span-full lg:col-span-9">
      <UserTripsList trips={{}} isLoading={false} />
    </div>
  );
};
