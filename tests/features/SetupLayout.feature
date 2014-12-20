Feature: Setup Layout
  As a user of the Recipes book
  I want to have the app divided in pieces
  So that I end up with a header, a main area and a footer

  Scenario: Visiting the home page
    Given I am on the home page
    Then I should see a "div.navbar"
    And I should see a "section.content"
    And I should see a "footer"