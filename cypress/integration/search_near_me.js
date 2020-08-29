describe('BeerDb Web App', () => {
  it('Visits beerdb homepage and checks for search form elements', () => {
    cy.visit("http://localhost:3000/")
    cy.contains("City")
    cy.contains("State")
    cy.contains("Zip")
  })

  it('Searches near me', () => {
    cy.visit("http://localhost:3000/")
    // https://github.com/cypress-io/cypress/issues/2671
    // cy.on('window:before:load', (win) => { cy.mockGeolocation(win, 39.12208, -98.579) })
    cy.contains("Near Me").click()
  })
})
