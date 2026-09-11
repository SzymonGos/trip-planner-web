import React from 'react';
import { Container } from '@/components/Container/Container';
import { TripsList } from './TripsList';
import { getTrips } from '../../server/queries/getTrips';

export const TripsLlistContainer = async () => {
  const data = await getTrips();

  return (
    <Container>
      <div className="mt-10 w-full grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <TripsList trips={data} />
      </div>
    </Container>
  );
};
