'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { getUserTripsQuery } from '../server/db/getUserTripsQuery';
import { UserTripsList } from './UserTripsList';
import { MultipleTripCardsLoader } from '@/features/trip/components/MultipleTripCardsLoader';

type UserTripListContainerProps = {
  userId: string;
  username?: string;
};

export const UserTripsListContainer = ({ userId }: UserTripListContainerProps) => {
  const { data, loading } = useQuery(getUserTripsQuery, {
    variables: {
      id: userId,
    },
  });

  if (loading) return <MultipleTripCardsLoader count={3} />;

  return (
    <div className="mt-5 col-span-full lg:col-span-9">
      <UserTripsList trips={data?.trips} isLoading={loading} />
    </div>
  );
};
