import React, { FC } from 'react';
import { TripCardLoader } from './TripCard/TripCardLoader';

type TMultipleTripCardsLoaderProps = {
  count?: number;
};

export const MultipleTripCardsLoader: FC<TMultipleTripCardsLoaderProps> = ({ count = 3 }) => (
  <div className="mt-10 grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }, (_, index) => (
      <TripCardLoader key={index} />
    ))}
  </div>
);
