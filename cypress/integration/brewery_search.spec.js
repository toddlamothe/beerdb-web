describe('BeerDb Web App', () => {

  it('Visits beerdb homepage and checks for search form elements', () => {
    cy.visit("http://localhost:3000/")
    cy.contains("City")
    cy.contains("State")
    cy.contains("Zip")
  })

  it('Searches near me', () => {
    cy.fixture('breweries.json').as('breweriesJSON');
    cy.visit("http://localhost:3000/")

    cy.contains("Near Me").click();
  })
})
