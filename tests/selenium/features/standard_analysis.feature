Feature: Standard analysis
    A deep learning tool for Radiology analysis.

Scenario:Standard analysis
	Given RSNA pneumonia dataset is at /DemoDataSet
	When I upload newdataset at /DemoDataSet
	And I satrt the training process
	Then Evaluation report and PDF and xls result were gernerated

Scenario:Standard upload
	Given RNAS pneumonia dataset is at /DemoDataSet
	When I select /DemoDataSet
	Then "RNAS pneumonia dataset" was gernerated
	And image number is 4016
	And image size is 1233 MB
	And label-image match rate is 100%

Scenario:Standard training
	Given project "RNAS pneumoniat" exist
	When I satrt the training process
	Then Evaluation report and PDF and xls result were gernerated

Scenario:Stop training
	Given project "RNAS pneumonia" exist
	And I satrt the training process
	When After 5 min
	And I stop trainign process
	Then Training stop

Scenario:Relabel when I have RNAS pneumonia model
	Given RSNA pneumonia dataset is trained
	When I open evaluation
	And I adjust threshold of All label as 0.9 and relabel
	Then AI label was changed

Scenario:Relabel 'NORMAL' when I have RNAS pneumonia model
	Given RSNA pneumonia dataset is trained
	When I open evaluation
	And I adjust threshold of 'NORMAL' label as 0.9 and relabel
	Then AI label was changed

Scenario:Relabel 'PNEUMONIA' when I have RNAS pneumonia model
	Given RSNA pneumonia dataset is trained
	When I open evaluation
	And I adjust threshold of 'PNEUMONIA' label as 0.9 and relabel
	Then AI label was changed

Scenario:User can't upload dataset without label
	Given RNAS pneumonia dataset without label file is at /DemoDataSet
	When I select /DemoDataSet
	Then image number is 4016
	And image size is 1233 MB
	And label file not exist.
	And User can't create the project

