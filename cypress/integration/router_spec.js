describe('BeerDb Web App Routes', () => {
  it('Loads about page', () => {
    cy.visit("http://localhost:3000/about");
  })

  it('Shows page not found', () => {
    cy.visit("http://localhost:3000/bogus_route");
    cy.contains("Page Not Found");
  })
})
