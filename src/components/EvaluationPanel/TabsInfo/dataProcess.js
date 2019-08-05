class dataGenerator {
	constructor(labels, metric) {
		this.labels = labels
		this.metric = metric
		this.allData = []
		this.axisObj = {}
		this.checkDataStructure = metric['fpr_roccurve']
		
	}

	// return model Type
	// we only have 2 cases for now,multi_class/multi_label,  one is another on is binary
	// we currently use 'fpr_roccurve' data structure to decide which model backend send into
	checkModel(){
		if (!Array.isArray(this.checkDataStructure)) {   
			return 'multiType'
		} else {                                        
			return 'binary model'
		}

	}

	// create axis obj for c3
	createAxis() {
		if (this.checkModel() === 'multiType' ) {
			for (let i = 0; i < this.labels.length + 1; i++) {
				this.axisObj[`tpr_roccurve of class ${i}`] = `fpr_roccurve of class ${i}`;
			}
			return this.axisObj;
		} else {
			this.axisObj = {'ROC curve': 'x'};
			return this.axisObj;
		}
	}

	// create data obj for all_class
	createDataArray() {
		let dataArray = [];
		let len = this.labels.length;

		if (this.checkModel() === 'multiType' ) {
			// need to construct the strcuture first to later use push method to its index
			for (let i = 0; i < len * 2; i++) {
				dataArray.push([]);
			}

			for (let i = 0; i < len; i++) {
				dataArray[i].push(`fpr_roccurve of class ${i}`, ...this.metric['fpr_roccurve'][`${i}`]);
			}

			// also push tpr into array, use i-len to get the correct index from data
			for (let i = len; i < len * 2; i++) {
				dataArray[i].push(`tpr_roccurve of class ${i - len}`, ...this.metric['tpr_roccurve'][`${i - len}`]);
			}

			return dataArray;

		} else {
			dataArray.push(['x', ...this.metric['fpr_roccurve']]);
			dataArray.push(['ROC curve', ...this.metric['tpr_roccurve']]);
			// dataArray.push('qq')
			return dataArray;
			// console.log(dataArray);
		}
	}

	// get total imgae-
	getTotalImage() {
		// return if backend don't have this info
		if (this.metric['label_counts'] === undefined) {
			return;
		}

		let len = this.labels.length;
		let totalImage = 0;
		for (let i = 0; i < len; i++) {
			totalImage += this.metric['label_counts'][i];
		}
		return totalImage;
	}

	// fun to gen all_class data
	createAllClassTab() {

		this.allData.push({
			id: 0,
			name: 'all class',
			metrics: {
				Sensitivity: this.metric['micro_recall'] || 'not available yet',
				Specificity: this.metric['micro_specificity'] || 'not available yet',
				Precision: this.metric['micro_precision'] || 'not available yet',
				F1score: this.metric['micro_f1_score'] || 'not available yet',
				AUC: this.metric['weighted_roc_auc'] || 'not available yet'
			},
			grpah: {
				ChartTitle: 'ROC Chart',
				xAxisLabel: '1 - Specificity (False Positive Rate)',
				yAxisLabel: 'Sensitivity (True Positive Rate)',
				axisSetting: this.createAxis(this.labels),
				dataColumn: this.createDataArray(this.labels, this.metric),
				// precision: [ 0.45, 0.5, 0.6, 0.7, 0.8, 1 ],
				// recall: [ 1, 0.75, 0.5, 0.25, 0.1, 0 ],
				// image: 'not available yet'
				image: this.getTotalImage(this.labels, this.metric) || 'not available yet'
			},
			confusionMatrixInfo: {
				confusionMatrix: [...this.metric['confusion_matrix']],
				confusionMatrixLable: [...this.labels],

				// TODO: need to import dynamically
				confusionMatrixAnnotation: [
					[
						'img01, img03',
						'img02,img04',
						'img23',
						'no img',
						'img09',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					['no_img', 'img05', 'img12', 'img09', 'no img', 'no_img', 'img05', 'img12', 'no img', 'no img'],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					]
				],
				labelsNum: this.labels.length,
				thresholdValue: null
			}
		});
	}

	


	// 3. function to create each_class datacolumn
	createEachTabDataArray() {
		// init data strcutrure
		let eachDataColumn = [];
		for (let i = 0; i < this.labels.length; i++) {
			eachDataColumn.push([]);
		}

		for (let i = 0; i < this.labels.length; i++) {
			// loop thru class
			eachDataColumn[i].push(['threshold', ...this.metric['thresholds_prcurve'][i]]);
			eachDataColumn[i].push(['precision', ...this.metric['precision_prcurve'][i]]);
			eachDataColumn[i].push(['recall', ...this.metric['recall_prcurve'][i]]);
		}

		return eachDataColumn;
	}


	// 5. function to create each each class/label
	createEachClassTab() {
		for (let i = 0; i < this.labels.length; i++) {
			this.allData.push({
				id: `${i + 1}`,
				name: `class ${this.labels[i]}`,
				metrics: {
					Sensitivity: this.metric['report_per_labels'][i]['recall'] || 'not available yet',
					Specificity: this.metric['report_per_labels'][i]['specificity'] || 'not available yet',
					Precision: this.metric['report_per_labels'][i]['precision'] || 'not available yet',
					F1score: this.metric['report_per_labels'][i]['f1'] || 'not available yet',
					AUC: this.metric['roc_auc'][i] || 'not available yet'
				},
				grpah: {
					ChartTitle: 'Precision Recall Curve',
					xAxisLabel: 'Threshold',
					yAxisLabel: 'Precision / Recall',
					axisSetting: {
						precision: 'threshold',
						recall: 'threshold'
					},
					dataColumn: this.createEachTabDataArray(this.labels, this.metric)[i],
					image: this.metric['label_counts'][i]
				},
				confusionMatrixInfo: {
					confusionMatrix: [
						...this.metric['report_per_labels'][i]['content']
						// below code is for mutiple matrix in one class
						// ...this.metric['matrix_threshold'][i]
						// [1, 0],
						// [7, 0],
					],
					confusionMatrixLable: [i, 'other'],
					confusionMatrixAnnotation: [['img01, img03', 'img02,img04'], ['no_img', 'img05']],
					labelsNum: this.labels.length,
					thresholdValue: this.metric['thresholds_prcurve'][i]
				}
			});
		}
	}


	generateData() {
		if (this.labels.length > 2) {
			this.createAllClassTab()
			this.createEachClassTab();
			return this.allData
		} else {
			this.createAllClassTab()
			return this.allData
		}
	}

}

// class multiClassData {
// 	constructor() {

// 	}


// }

// class binaryData {
// 	constructor() {

// 	}


// }




// 這兩行要寫在tabs
// let n1 = new dataGenerator(1, 2)
// console.log(n1.generateData())




////////////////////////////////////////////////////////////////////




function createData(labels = '', metric = {}) {
	// 0. init data
	let tabData = [];


	// 1. create axis and dataColumne for c3 pr curve
	// 1.1 to create axis obj
	function createAxis(labels) {
		let checkDataStructure = metric['fpr_roccurve'];
		let axisObj = {};

		if (!Array.isArray(checkDataStructure)) {
			for (let i = 0; i < labels.length + 1; i++) {
				axisObj[`tpr_roccurve of class ${i}`] = `fpr_roccurve of class ${i}`;
			}
			return axisObj;
		} else {
			axisObj = {'ROC curve': 'x'};
			return axisObj;
		}
	}

	// 1.2 create dataColumne for all_class
	function createDataArray(labels, metric) {
		let dataArray = [];
		let len = labels.length;
		let checkDataStructure = metric['fpr_roccurve'];

		if (!Array.isArray(checkDataStructure)) {
			// need to construct the strcuture first to later use push method to its index
			for (let i = 0; i < len * 2; i++) {
				dataArray.push([]);
			}

			for (let i = 0; i < len; i++) {
				dataArray[i].push(`fpr_roccurve of class ${i}`, ...metric['fpr_roccurve'][`${i}`]);
			}

			// also push tpr into array, use i-len to get the correct index from data
			for (let i = len; i < len * 2; i++) {
				dataArray[i].push(`tpr_roccurve of class ${i - len}`, ...metric['tpr_roccurve'][`${i - len}`]);
			}

			return dataArray;

		} else {
			dataArray.push(['x', ...metric['fpr_roccurve']]);
			dataArray.push(['ROC curve', ...metric['tpr_roccurve']]);
			// dataArray.push('qq')
			return dataArray;
			console.log(dataArray);
		}
	}

	// 1.3 calculate total imgae-
	function getTotalImage(labels, metric) {
		// deal with source data don't have label_counts prop
		if (metric['label_counts'] === undefined) {
			return;
		}

		let len = labels.length;
		let totalImage = 0;
		for (let i = 0; i < len; i++) {
			totalImage += metric['label_counts'][i];
		}
		return totalImage;
	}

	// 2. fun to gen all_class data
	function createAllClassTab(metric, labels) {
		tabData.push({
			id: 0,
			name: 'all class',
			metrics: {
				Sensitivity: metric['micro_recall'] || 'not available yet',
				Specificity: metric['micro_specificity'] || 'not available yet',
				Precision: metric['micro_precision'] || 'not available yet',
				F1score: metric['micro_f1_score'] || 'not available yet',
				AUC: metric['weighted_roc_auc'] || 'not available yet'
			},
			grpah: {
				ChartTitle: 'ROC Chart',
				xAxisLabel: '1 - Specificity (False Positive Rate)',
				yAxisLabel: 'Sensitivity (True Positive Rate)',
				axisSetting: createAxis(labels),
				dataColumn: createDataArray(labels, metric),
				// precision: [ 0.45, 0.5, 0.6, 0.7, 0.8, 1 ],
				// recall: [ 1, 0.75, 0.5, 0.25, 0.1, 0 ],
				// image: 'not available yet'
				image: getTotalImage(labels, metric) || 'not available yet'
			},
			confusionMatrixInfo: {
				confusionMatrix: [...metric['confusion_matrix']],
				confusionMatrixLable: [...labels],

				// TODO: need to import dynamically
				confusionMatrixAnnotation: [
					[
						'img01, img03',
						'img02,img04',
						'img23',
						'no img',
						'img09',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					['no_img', 'img05', 'img12', 'img09', 'no img', 'no_img', 'img05', 'img12', 'no img', 'no img'],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					],
					[
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img',
						'no_img',
						'img05',
						'img12',
						'no img  ',
						'no img'
					]
				],
				labelsNum: labels.length,
				thresholdValue: null
			}
		});
	}

	// 3. create all_class data
	createAllClassTab(metric, labels);


	// 4. function to create each_class datacolumn
	function createEachTabDataArray(labels, metric) {
		// init data strcutrure
		let eachDataColumn = [];
		for (let i = 0; i < labels.length; i++) {
			eachDataColumn.push([]);
		}

		for (let i = 0; i < labels.length; i++) {
			// loop thru class
			eachDataColumn[i].push(['threshold', ...metric['thresholds_prcurve'][i]]);
			eachDataColumn[i].push(['precision', ...metric['precision_prcurve'][i]]);
			eachDataColumn[i].push(['recall', ...metric['recall_prcurve'][i]]);
		}

		return eachDataColumn;
	}


	// 5. function to create each each class/label
	function createEachClassTab(metric, labels) {
		for (let i = 0; i < labels.length; i++) {
			tabData.push({
				id: `${i + 1}`,
				name: `class ${labels[i]}`,
				metrics: {
					Sensitivity: metric['report_per_labels'][i]['recall'] || 'not available yet',
					Specificity: metric['report_per_labels'][i]['specificity'] || 'not available yet',
					Precision: metric['report_per_labels'][i]['precision'] || 'not available yet',
					F1score: metric['report_per_labels'][i]['f1'] || 'not available yet',
					AUC: metric['roc_auc'][i] || 'not available yet'
				},
				grpah: {
					ChartTitle: 'Precision Recall Curve',
					xAxisLabel: 'Threshold',
					yAxisLabel: 'Precision / Recall',
					axisSetting: {
						precision: 'threshold',
						recall: 'threshold'
					},
					dataColumn: createEachTabDataArray(labels, metric)[i],
					image: metric['label_counts'][i]
				},
				confusionMatrixInfo: {
					confusionMatrix: [
						...metric['report_per_labels'][i]['content']
						// below code is for mutiple matrix in one class
						// ...metric['matrix_threshold'][i]
						// [1, 0],
						// [7, 0],
					],
					confusionMatrixLable: [i, 'other'],
					confusionMatrixAnnotation: [['img01, img03', 'img02,img04'], ['no_img', 'img05']],
					labelsNum: labels.length,
					thresholdValue: metric['thresholds_prcurve'][i]
				}
			});
		}
	}

	// 6. check if not binary data, then call each each class/label func
	if (labels.length > 2) {
		createEachClassTab(metric, labels);
	}

	return tabData;
}

export {
	createData,
	dataGenerator
};
