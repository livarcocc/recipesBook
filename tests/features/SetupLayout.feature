Feature: Setup Layout
  As a user of the Recipes book
  I want to have the app divided in pieces
  So that I end up with a header, a main area and a footer

  Scenario: I should see the key elements of the layout
    Given I am on the home page unauthenticated
    Then I should see an element "div.navbar"
    And I should see an element "section.content"
    And I should see an element "footer"