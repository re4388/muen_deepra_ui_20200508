Scenario: Go to project overview
    Given Application is launched
    When Project overview button is pressed
    Then Page should be redirected to project overview

Scenario: Scroll down page of project overview
    Given Page is redirected to project overview
    When Project overview panel is scrolled down
    Then Y position of page should be changed
