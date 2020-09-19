import { Configuration } from "tslint"

describe("My First Test", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true)
  })
})

describe("Example test", () => {
  it("Adds a country", () => {
    cy.visit("/")

    cy.visit("/countries")

    cy.get(".App").should("contain", "There are")

    var now = Date.now().toString()

    cy.get(".country-name").type(now)

    cy.get(".submit").click()

    cy.get(".countries-list").should("contain", now)
  })
})
