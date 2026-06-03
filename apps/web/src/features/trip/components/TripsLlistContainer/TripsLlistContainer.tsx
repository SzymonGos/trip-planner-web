import { Container } from '@/components/Container/Container';
import { PreloadQuery } from '@/lib/apolloClient';
import React, { Suspense } from 'react';
import { getTripsQuery } from '../../server/db/getTripsQuery';
import { TripsList } from './TripsList';
import { Trip } from 'tp-graphql-types';
import { MultipleTripCardsLoader } from '../MultipleTripCardsLoader';

export const TripsLlistContainer = () => (
  <Container className="mt-40">
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Browse All Trips</h1>
          <p className="text-gray-600 text-lg">Discover amazing routes shared by our community</p>
        </div>
      </div>
    </div>

    <PreloadQuery<{ trips: Trip[] }, { id: string }>
      query={getTripsQuery}
      context={{
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      }}
    >
      {(queryRef) => (
        <Suspense fallback={<MultipleTripCardsLoader count={6} />}>
          <div className="mt-10 w-full grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <TripsList queryRef={queryRef} />
          </div>
        </Suspense>
      )}
    </PreloadQuery>
  </Container>
);
