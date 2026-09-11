import React, { Suspense } from 'react';
import { TripsLlistContainer } from '@/features/trip/components/TripsLlistContainer/TripsLlistContainer';
import { Footer } from '@/components/Footer/Footer';
import { MultipleTripCardsLoader } from '@/features/trip/components/MultipleTripCardsLoader';
import { Container } from '@/components/Container/Container';

const TripsPage = () => (
  <div>
    <Container className="mt-40">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Browse All Trips</h1>
            <p className="text-gray-600 text-lg">Discover amazing routes shared by our community</p>
          </div>
        </div>
      </div>
    </Container>
    <Suspense fallback={<MultipleTripCardsLoader count={6} />}>
      <TripsLlistContainer />
    </Suspense>
    <Footer />
  </div>
);

export default TripsPage;
