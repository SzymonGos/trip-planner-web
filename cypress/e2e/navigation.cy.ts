describe('Routetripper navigation', () => {
  it('should navigate to trip planner after clicking Start planning', () => {
    cy.visit('/');

    cy.contains('a, button', 'Start planning').should('be.visible').click();

    cy.location('pathname').should('eq', '/trip/planner');
  });
});
