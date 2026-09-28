'use client';

import React from 'react';
import { StatisticsCard } from './StatisticsCard';
import { MapPinIcon } from '@/components/Icons/MapPinIcon';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import type { TripResponse } from '@/features/trip/types/types';
import { formatDistance } from '@/features/trip/helpers/formatDistance';
import { StatiticsCardLoader } from './StatiticsCardLoader';

type StatisticsCardsContainerProps = {
  trips: TripResponse[];
  isLoading?: boolean;
};

export const StatisticsCardsContainer = ({ trips, isLoading }: StatisticsCardsContainerProps) => {
  const totalCompletedTrips = trips?.length || 0;

  const totalDistanceMeters = trips?.reduce((total, trip) => total + trip.distanceMeters, 0) || 0;

  const statisticsCards = [
    {
      title: 'Completed Distance',
      value: `${formatDistance(totalDistanceMeters)} km`,
      icon: <MapPinIcon className="w-7 h-7 text-tp-primary" />,
    },
    {
      title: 'Completed Trips',
      value: totalCompletedTrips?.toString(),
      icon: <ClockIcon className="w-7 h-7 text-tp-primary" />,
    },
  ];

  if (isLoading) return <StatiticsCardLoader />;

  return (
    <div className="grid grid-flow-row lg:grid-flow-col gap-4">
      {statisticsCards.map((card) => (
        <StatisticsCard key={card.title} title={card.title} value={card.value} icon={card.icon} />
      ))}
    </div>
  );
};
