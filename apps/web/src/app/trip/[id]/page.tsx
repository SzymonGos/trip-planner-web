import { ViewTripContainer } from '@/features/trip/components/ViewTrip/ViewTripContainer';
// import { Suspense } from 'react';
// import { TripLoader } from '@/features/trip/components/TripLoader';

export const revalidate = 60;

const TripPage = ({ params }: { params: { id: number } }) => (
  <div className="h-screen">
    <ViewTripContainer id={params?.id} />
  </div>
);

export default TripPage;
