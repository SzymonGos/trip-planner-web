import { PreloadQuery } from '@/lib/apolloClient';
import { ViewTripContainer } from '@/features/trip/components/ViewTrip/ViewTripContainer';
import { Suspense } from 'react';
import { TripLoader } from '@/features/trip/components/TripLoader';

export const revalidate = 60;

const TripPage = ({ params }: { params: { id: string } }) => (
  <PreloadQuery<{ trip: TTrip }, { id: string }>
    query={getTripQuery}
    variables={{
      id: params.id,
    }}
  >
    {(queryRef) => (
      <Suspense fallback={<TripLoader type="view" />}>
        <div className="h-screen">
          <ViewTripContainer queryRef={queryRef} />
        </div>
      </Suspense>
    )}
  </PreloadQuery>
);

export default TripPage;
