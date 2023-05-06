describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "demo",
      username: "demo",
      password: "demo",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3001");
  });

  it("Login from is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("anancarv");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
      cy.contains("Demologged in");
    });

    it("login fails with wrong password", function () {
      cy.contains("login").click();
      cy.get("#username").type("anancarv");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get("#error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "Demo logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "anancarv", password: "test" });
    });

    it("a new blog can be created", function () {
      cy.contains("Add new blog").click();
      cy.get("#title").type("First class tests");
      cy.get("#author").type("Edsger W. Dijkstra");
      cy.get("#url").type(
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
      );
      cy.contains("add").click();

      cy.contains("First class tests - Edsger W. Dijkstra");
    });

    it("user can like a blog", function () {
      cy.contains("Add new blog").click();
      cy.get("#title").type("First class tests");
      cy.get("#author").type("Edsger W. Dijkstra");
      cy.get("#url").type(
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
      );
      cy.contains("add").click();

      cy.contains("First class tests - Edsger W. Dijkstra").click();
      cy.contains("view").click();
      cy.contains("0");
      cy.get("#like-button").click();
      cy.contains("1");
    });

    it("user who created a blog can delete it", function () {
      cy.contains("Add new blog").click();
      cy.get("#title").type("First class tests");
      cy.get("#author").type("Edsger W. Dijkstra");
      cy.get("#url").type(
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
      );
      cy.contains("add").click();

      cy.contains("First class tests - Edsger W. Dijkstra").click();
      cy.contains("view").click();
      cy.get("#remove").click();

      cy.get("html").should(
        "not.contain",
        "First class tests - Edsger W. Dijkstra"
      );
    });
  });
});
