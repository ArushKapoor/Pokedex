/// <reference types="cypress" />

describe("Locators", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("locating elements on the page if rendered correctly", () => {
    // Should contain a search bar
    cy.get("[data-cy='search-bar']").should("be.visible");

    // should contain a search icon
    cy.get("[data-cy='search-icon']").should("be.visible");

    // search suggesstions should not be visible yet
    cy.get("[data-cy='search-suggestions']").should("not.be.visible");

    // wait for the data to fetch components
    cy.wait(10000);

    // pokemon should be visible on the page
    cy.get("[data-cy='card-item']").should("be.visible");

    // After typing a character, search suggestions should be visible
    cy.get("[data-cy='search-bar']").type("c");
    cy.get("[data-cy='search-suggestions']").should("be.visible");
  });
});
