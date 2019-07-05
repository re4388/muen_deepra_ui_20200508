Feature: DeepRA
    A deep learning tool for Radiology analysis.
"""
Scenario: Go to project overview
    Given Application is launched
    When Project overview button is pressed
    Then Page should be redirected to project overview

Scenario: Scroll down page of project overview
    Given Page is redirected to project overview
    When Project overview panel is scrolled down
    Then Y position of page should be changed
"""
#1
Scenario: Standard analysis
	Given RSNA dataset is at /DemoDataSet
	When I upload newdataset at /DemoDataSet
	And I click Start Training
	And I Click Evaluation report
	Then Evaluation report and PDF and xls result were gernerated

#2
Scenario: Standard Testing
	Given 10 RSNA images is at /DemoDataSet
	And I have a RSNA pneumonia model
	And I am at Test module
	When I click Start icon of RNSA pneumonia model
	And I upload newdataset at /DemoDataSet
	And I Click Evaluation report
	Then Evaluation report and PDF and xls result were gernerated
	
#3
Scenario: Standard upload
	Given RNAS pneumonia is at /DemoDataSet
	When I click NewData
	And I click Import data icon
	And I choose /DemoDataSet directory
	And I click Confirm icon 
	And I click Finish icon
	And I name project "My first image Dataset"
	Then "My first image Dataset" was gernerated
	And image number is ??
	And label number is ??

#4
Scenario: Standard training
	Given project "My first image Dataset" exist
	Then I click Start cion
	And I click Train icon
	And I click Start train icon
	Then Evaluation report was generated

#5
Scenario: Stop training
	Given project "My first image Dataset" exist
	Then I click Start cion
	And I click Train icon
	And I click Start train icon
	And after 5 min , I click stop training icon
	Then Training stop

	