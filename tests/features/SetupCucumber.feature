Feature: Setup Cucumber.js
  As a fervent adept of BDD
  I want to start my project with Cucumber features
  So that I end up with the right functionalities

  Scenario: Visiting the home page
    Given I am on the home page unauthenticated
    Then I should see "Livro de Receitas" at the "body"