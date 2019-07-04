Scenario: Go to project overview page
    Given Application is launched
    When Project overview button is pressed
    Then Page should be redirected to project overview page

Scenario: Go to model overview page
    Given Application is launched
    When Model overview button is pressed
    Then Page should be redirected to model overview page

Scenario: Go to data import page
    Given Application is launched
    When Temporary shortcut for data import page is triggered
    Then Page should be redirected to data import page

Scenario: Go to training page
    Given Application is launched
    When Temporary shortcut for training page is triggered
    Then Page should be redirected to training page
