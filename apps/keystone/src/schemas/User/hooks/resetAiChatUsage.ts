import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resetAiChatUsage = async () => {
  try {
    const now = new Date();
    const usersToReset = await prisma.user.findMany({
      where: {
        aiChatUsageResetDate: {
          lte: now,
        },
      },
    });
    for (const user of usersToReset) {
      try {
        const nextResetDate = new Date();
        nextResetDate.setDate(nextResetDate.getDate() + 30);

        await prisma.user.update({
          where: { id: user.id },
          data: {
            aiChatUsageCount: 0,
            aiChatUsageResetDate: nextResetDate,
          },
        });
      } catch (userError) {
        console.error(`Failed to reset AI chat usage for user ${user.id}:`, userError);
      }
    }

    console.log('AI chat usage reset job completed successfully');
  } catch (error) {
    console.error('AI chat usage reset job failed:', error);
  }
};
