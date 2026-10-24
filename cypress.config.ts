import { defineConfig } from 'cypress';
import { clerkSetup } from '@clerk/testing/cypress';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.cypress' });

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    env: {
      TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL,
      TEST_PASSWORD: process.env.CYPRESS_TEST_PASSWORD,
    },

    setupNodeEvents(on, config) {
      return clerkSetup({ config });
    },
  },
});
