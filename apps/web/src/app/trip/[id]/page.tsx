import { ViewTripContainer } from '@/features/trip/components/ViewTrip/ViewTripContainer';

const TripPage = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  return (
    <div className="h-screen">
      <ViewTripContainer id={id} />
    </div>
  );
};
export default TripPage;
