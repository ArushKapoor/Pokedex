/// <reference types="cypress" />

describe("Search tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(10000);
  });

  it("Testing if pokemon appear if search contains letter a", () => {
    cy.get("[data-cy='search-bar']").type("a");
    cy.get("[data-cy='search-suggestions']")
      .contains("bulbasaur")
      .should("be.visible");
    cy.get("[data-cy='card-item']").contains("bulbasaur").should("be.visible");
  });

  it("Testing if pokemon appear if search is abcd", () => {
    cy.get("[data-cy='search-bar']").type("abcd");
    cy.get("[data-cy='search-suggestions']").should("not.be.visible");
    cy.get("[data-cy='card-item']").should("not.exist");
  });

  it("Test if clicking on the autosuggestion work", () => {
    cy.get("[data-cy='search-bar']").type("a");
    cy.get("[data-cy='search-suggestions']").contains("bulbasaur").click();
    cy.get("[data-cy='search-bar']").should("have.value", "bulbasaur");
    cy.get("[data-cy='card-item']").contains("bulbasaur").should("be.visible");
  });
});
