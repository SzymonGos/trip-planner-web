import React from 'react';
import { EditTripFormContainer } from '@/features/trip/components/EditTrip/EditTripFormContainer';
import { Suspense } from 'react';
import { TripLoader } from '@/features/trip/components/TripLoader';

const EditTripPage = ({ params }: { params: { id: string } }) => (
  // <PreloadQuery<{ trip: TTrip }, { id: string }>
  //   query={getTripQuery}
  //   variables={{
  //     id: params.id,
  //   }}
  // >
  //   {(queryRef) => (
  <Suspense fallback={<TripLoader type="edit" />}>
    <div className="h-screen">
      <EditTripFormContainer queryRef={{}} />
    </div>
  </Suspense>
  //   )}
  // </PreloadQuery>
);

export default EditTripPage;
