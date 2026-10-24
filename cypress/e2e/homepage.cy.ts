describe('Routetripper Homepage', () => {
  it('should load homepage successfully', () => {
    cy.visit('/');

    cy.get('body').should('be.visible');

    cy.url().should('eq', 'http://localhost:4000/');
  });
});
