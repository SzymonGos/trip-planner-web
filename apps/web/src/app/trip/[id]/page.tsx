import { ViewTripContainer } from '@/features/trip/components/ViewTrip/ViewTripContainer';

const TripPage = ({ params }: { params: { id: number } }) => (
  <div className="h-screen">
    <ViewTripContainer id={params?.id} />
  </div>
);

export default TripPage;
