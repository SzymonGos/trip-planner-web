describe('Routetripper Authentication', () => {
  it('should authenticate user and access trip planner', () => {
    cy.visit('/');

    cy.clerkLoaded();

    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('TEST_EMAIL'),
      password: Cypress.env('TEST_PASSWORD'),
    });

    cy.visit('/trip/planner');

    cy.location('pathname').should('eq', '/trip/planner');
  });
});
