import { ViewTripContainer } from '@/features/trip/components/ViewTrip/ViewTripContainer';

const TripPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="h-screen">
      <ViewTripContainer id={Number(id)} />
    </div>
  );
};

export default TripPage;
