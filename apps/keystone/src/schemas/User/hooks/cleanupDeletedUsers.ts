import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const scheduledCleanup = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const usersToDelete = await prisma.user.findMany({
      where: {
        isDeleted: true,
        deletedAt: {
          lt: thirtyDaysAgo,
        },
      },
      include: {
        from_Trip_creator: {
          include: {
            tripImages: true,
          },
        },
      },
    });

    console.log(`Found ${usersToDelete.length} users to permanently delete`);

    for (const user of usersToDelete) {
      try {
        await prisma.$transaction(async (tx) => {
          for (const trip of user.from_Trip_creator) {
            if (trip.tripImages && trip.tripImages.length > 0) {
              await tx.tripImage.deleteMany({
                where: {
                  tripId: trip.id,
                },
              });
            }
          }
          await tx.trip.deleteMany({
            where: {
              creatorId: user.id,
            },
          });
          await tx.user.delete({
            where: { id: user.id },
          });
        });
      } catch (userError) {
        console.error(`Failed to delete user ${user.id}:`, userError);
      }
    }

    console.log('Cleanup of deleted users completed successfully');
  } catch (error) {
    console.error('Cleanup job failed:', error);
  }
};
