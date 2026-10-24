describe('Create Trip E2E', () => {
  it('should create a new trip', () => {
    const tripTitle = `Cypress Trip ${Date.now()}`;

    cy.visit('/');
    cy.clerkLoaded();

    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('TEST_EMAIL'),
      password: Cypress.env('TEST_PASSWORD'),
    });

    cy.visit('/trip/planner');
    cy.location('pathname').should('eq', '/trip/planner');

    cy.get('[data-cy="trip-title"]').type(tripTitle);

    cy.get('[data-cy="trip-description"]').type('E2E trip created automatically by Cypress');

    cy.get('[data-cy="trip-origin"]').clear().type('Warsaw, Poland');

    cy.get('.pac-container:visible .pac-item').should('have.length.greaterThan', 0);

    cy.get('[data-cy="trip-origin"]').type('{downarrow}{enter}');

    cy.get('[data-cy="trip-destination"]').clear().type('Krakow, Poland');

    cy.get('.pac-container:visible .pac-item').should('have.length.greaterThan', 0);

    cy.get('[data-cy="trip-destination"]').type('{downarrow}{enter}');

    cy.window().its('setTestDistanceInfo').should('be.a', 'function');

    cy.window().then((win) => {
      const testWindow = win as typeof win & {
        setTestDistanceInfo: (value: { distanceMeters: number; estimatedDurationSeconds: number }) => void;
      };

      testWindow.setTestDistanceInfo({
        distanceMeters: 300_000,
        estimatedDurationSeconds: 14_400,
      });
    });

    cy.get('[data-cy="submit-trip"]').should('be.enabled').click();

    cy.get('[data-cy="trip-title"]', { timeout: 20000 }).should('have.value', '');

    cy.get('[data-cy="trip-description"]').should('have.value', '');

    cy.get('[data-cy="trip-origin"]').should('have.value', '');

    cy.get('[data-cy="trip-destination"]').should('have.value', '');
  });
});
