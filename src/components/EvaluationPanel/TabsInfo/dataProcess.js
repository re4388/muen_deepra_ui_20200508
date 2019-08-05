class dataGenerator {
	constructor(labels, metric) {
		this.labels = labels
		this.metric = metric
		this.allData = []
		this.axisObj = {}
		this.checkDataStructure = metric['fpr_roccurve']
		
	}

	// get total imgae
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


	// create axis obj for plot C3
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



	// create graph da tafor all_class for plot C3
	getAllClassGraphData() {
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

	

	// create all_class data
	createAllClassData() {

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
				dataColumn: this.getAllClassGraphData(this.labels, this.metric),
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

	

	// create each_class graph data for plot C3
	getEachClassGraphData() {
		
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


	// create each each class data
	createEachClassData() {
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
					dataColumn: this.getEachClassGraphData(this.labels, this.metric)[i],
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

	// generate data based on given model
	generateData() {
		if (this.checkModel() === 'multiType') {
			this.createAllClassData()
			this.createEachClassData()
			return this.allData
		} else {
			this.createAllClassData()
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




export {
	dataGenerator
};
