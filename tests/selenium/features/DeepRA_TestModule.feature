Feature: TestModule
    A function for independent dataset Testing and show prediction performance.

Scenario: #1 Standard Testing
	Given 10 RSNA images without label are at /DemoDataSet
	And RSNA pneumonia dataset is trained
	When I choose RNSA pneumonia model
	And I choose 10 RSNA images at /DemoDataSet
	Then xls result were gernerated

Scenario: #2 Standard Testing with label
	Given 10 RSNA images with label are at /DemoDataSet
	And RSNA pneumonia dataset is trained
	When I choose RNSA pneumonia model
	And I choose 10 RSNA images at /DemoDataSet
	Then Evaluation report and PDF and xls result were gernerated
