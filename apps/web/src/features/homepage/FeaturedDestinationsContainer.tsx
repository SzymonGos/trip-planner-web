// import { PreloadQuery } from '@/lib/apolloClient';
import React from 'react';
import { FeaturedDestinations } from './FeaturedDestinations';
import { Suspense } from 'react';
import { Container } from '@/components/Container/Container';
import { MultipleTripCardsLoader } from '../trip/components/MultipleTripCardsLoader';

export const FeaturedDestinationsContainer = () => (
  <Container className="mb-24">
    <div className="w-full mb-14">
      <h3 className="text-4xl font-bold text-black mb-4 text-center font-primary">Explore Curated Destinations</h3>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
        Discover amazing destinations handpicked just for you. From hidden gems to popular spots, find your next
        adventure.
      </p>
    </div>
    {/* <PreloadQuery<{ trips: TTrip[] }, { id: string }>
      query={getHomePageRecommededTripsQuery}
      context={{
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      }}
    > */}
    {/* {(queryRef) => (
      <Suspense fallback={<MultipleTripCardsLoader />}> */}
    <FeaturedDestinations queryRef={{}} />
    {/* </Suspense>
    )} */}
    {/* </PreloadQuery> */}
  </Container>
);
