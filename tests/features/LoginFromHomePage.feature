Feature: Login from home page
  As a passionate chef
  I want to login to Recipes book
  So that I end up logged-in

  Scenario: See login fields when unauthenticated
    Given I am on the home page unauthenticated
    Then I should see an element "input[placeholder='Email']"
    Then I should see an element "input[placeholder='Password'][type=password]"
    Then I should see an element "button[name='login']"

  Scenario: Login succeeds when the right credentials are entered
    Given I am on the home page unauthenticated
    And I have entered "login" at "input[placeholder='Email']"
    And I have entered "password" at "input[placeholder='Password']"
    When I click "button[name='login']"
    Then I login

  Scenario: Login fails when invalid credentials are entered and user is redirected to login page
    Given I am on the home page unauthenticated
    And I have entered "invalidLogin" at "input[placeholder='Email']"
    And I have entered "password" at "input[placeholder='Password']"
    When I click "button[name='login']"
    Then I am sent to "login" page
    And I should see an element ""
    #TODO-licavalc: Add error message in the step above

  Scenario: Login fields are not displayed when logged in
    Given I am on the home page authenticated
    Then I should not see an element "input[placeholder='Email']"
    Then I should not see an element "input[placeholder='Password'][type=password]"
    Then I should not see an element "button[name='login']"
    #TODO-licavalc: Add some verification for the logout option