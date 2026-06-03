import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resetGoogleMapsRouteUsage = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const usersToReset = await prisma.user.findMany({
      where: {
        googleMapsRouteResetDate: {
          lte: thirtyDaysAgo,
        },
      },
    });

    for (const user of usersToReset) {
      const newResetDate = new Date();
      newResetDate.setDate(newResetDate.getDate() + 30);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          googleMapsRouteCount: 0,
          googleMapsRouteResetDate: newResetDate,
        },
      });
    }

    if (usersToReset.length > 0) {
      console.log(`Reset Google Maps route usage for ${usersToReset.length} users`);
    }
  } catch (error) {
    console.error('Error resetting Google Maps route usage:', error);
  }
};
