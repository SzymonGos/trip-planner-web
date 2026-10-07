import { EditTripFormContainer } from '@/features/trip/components/EditTrip/EditTripFormContainer';

const EditTripPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  return (
    <div className="h-screen">
      <EditTripFormContainer id={id} />
    </div>
  );
};
export default EditTripPage;
