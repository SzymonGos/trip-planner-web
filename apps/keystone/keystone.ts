import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { CORS_ORIGIN, DATABASE_URL, DATABASE_URL_SUFFIX } from './config';
import { exec } from 'child_process';
import { lists } from './index';
import { scheduledCleanup } from './src/schemas/User/hooks/cleanupDeletedUsers';
import { resetAiChatUsage } from './src/schemas/User/hooks/resetAiChatUsage';
import { resetGoogleMapsRouteUsage } from './src/schemas/User/hooks/resetGoogleMapsRouteUsage';
import { insertSeedData } from './seed-data/seed';

const { withAuth } = createAuth({
  listKey: 'Admin',
  identityField: 'name',
  secretField: 'password',
});

const session = statelessSessions({
  secret: process.env.SESSION_SECRET,
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: CORS_ORIGIN,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Apollo-Require-Preflight'],
      },
      extendExpressApp: () => {
        setInterval(
          async () => {
            try {
              await scheduledCleanup();
              await resetAiChatUsage();
              await resetGoogleMapsRouteUsage();
            } catch (error) {
              console.error('Scheduled cleanup failed:', error);
            }
          },
          24 * 60 * 60 * 1000,
        );
      },
    },
    db: {
      provider: 'postgresql',
      url: DATABASE_URL + DATABASE_URL_SUFFIX,
      onConnect: async (keystone) => {
        console.log('--- Generate graphql types');

        exec('nx graphqlTypes:generate tp-graphql-types', () => {
          console.log('--- Generate graphql types is completed');
        });

        if (process.argv.includes('--seed-data')) {
          console.log('--- Insert seed data');
          await insertSeedData(keystone);
          console.log('--- Insert seed data is completed');
        }
      },
    },
    session,
    lists,
  }),
);
