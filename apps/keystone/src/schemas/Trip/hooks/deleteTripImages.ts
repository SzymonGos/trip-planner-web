// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteTripImages = async (tripId: string, context: any) => {
  try {
    const tripImages = await context.query.TripImage.findMany({
      where: { trip: { id: { equals: tripId } } },
      query: 'id image { id }',
    });
    for (const tripImage of tripImages) {
      await context.query.TripImage.deleteOne({
        where: { id: tripImage.id },
      });
    }
    console.log(`Deleted ${tripImages.length} images for trip ${tripId}`);
  } catch (error) {
    console.error('Error deleting trip images:', error);
  }
};
