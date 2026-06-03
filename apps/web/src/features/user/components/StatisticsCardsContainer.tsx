'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { StatisticsCard } from './StatisticsCard';
import { MapPinIcon } from '@/components/Icons/MapPinIcon';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { formatDistance } from '../helpers/formatDistance';
import { getUserCompletedTripsQuery } from '../server/db/getUserCompletedTripsQuery';
import { StatiticsCardLoader } from './StatiticsCardLoader';

type StatisticsCardsContainerProps = {
  userId: string;
};

export const StatisticsCardsContainer = ({ userId }: StatisticsCardsContainerProps) => {
  const { data, loading } = useQuery(getUserCompletedTripsQuery, {
    variables: {
      id: userId,
    },
  });

  if (loading) return <StatiticsCardLoader />;

  const allTrips = (data as { trips?: Array<{ distance?: string; status?: string }> })?.trips || [];
  const completedTrips = allTrips.filter((trip) => trip.status === 'completed');
  const totalCompletedTrips = completedTrips.length;

  const totalDistance = completedTrips.reduce((total, trip) => {
    if (trip.distance) {
      const distanceMatch = trip.distance.match(/([\d,]+(?:\.\d+)?)/);
      if (distanceMatch) {
        const cleanDistance = distanceMatch[1].replace(/,/g, '');
        return total + parseFloat(cleanDistance);
      }
    }
    return total;
  }, 0);

  const statisticsCards = [
    {
      title: 'Completed Distance',
      value: `${formatDistance(totalDistance)} km`,
      icon: <MapPinIcon className="w-7 h-7 text-tp-primary" />,
    },
    {
      title: 'Completed Trips',
      value: totalCompletedTrips.toString(),
      icon: <ClockIcon className="w-7 h-7 text-tp-primary" />,
    },
  ];

  return (
    <div className="grid grid-flow-row lg:grid-flow-col gap-4">
      {statisticsCards.map((card) => (
        <StatisticsCard key={card.title} title={card.title} value={card.value} icon={card.icon} />
      ))}
    </div>
  );
};
