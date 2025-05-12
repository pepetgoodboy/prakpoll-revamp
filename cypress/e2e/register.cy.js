describe("User Registration", () => {
  it("should register a new user successfully", () => {
    cy.visit("http://localhost:3000/register");

    cy.get('input[name="npm"]').type("0425002");
    cy.get('input[name="password"]').type("bagus123");
    cy.get('input[name="verifCode"]').type("ad3ebf");

    cy.get('button[type="submit"]').click();

    cy.wait(1000);
    cy.contains("Registrasi berhasil").should("be.visible");

    cy.url().should("include", "/login");
    cy.contains("Masuk");
  });
});
