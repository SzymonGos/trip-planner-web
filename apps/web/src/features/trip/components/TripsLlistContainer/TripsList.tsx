'use client';

import React, { FC } from 'react';
import { TripCard } from '@/features/trip/components/TripCard/TripCard';
import type { TripResponse } from '../../types/types';

type TTripsListProps = {
  trips: TripResponse[];
};

export const TripsList: FC<TTripsListProps> = ({ trips }) => (
  <>
    {trips?.map((trip: any) => (
      <TripCard key={trip?.id} trip={trip} />
    ))}
  </>
);
