Feature: Setup Layout
  As a user of the Recipes book
  I want to have the app divided in pieces
  So that I end up with a header, a main area and a footer

  Scenario: Visiting the home page
    Given I am on the home page
    Then I should see a "header"
    And I should see a "main area"
    And I should see a "footer"