function createData(labels = '', metric = {}) {
	// 1. init the data for all labels
	let tabData = [];

	// 1.2 setup for later init
	// 1.2.1 setup the all_class axis obj
	function createAxis(labels) {
		let checkDataStructure = metric['fpr_roccurve'];
		let axisObj = {};

		if (!Array.isArray(checkDataStructure)) {
			for (let i = 0; i < labels.length + 1; i++) {
				axisObj[`tpr_roccurve of class ${i}`] = `fpr_roccurve of class ${i}`;
			}
			return axisObj;
		} else {
			axisObj = { 'ROC curve': 'x' };
			return axisObj;
		}
	}

	// 1.1.2 create all_class dataColumne
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
			dataArray.push([ 'x', ...metric['fpr_roccurve'] ]);
			dataArray.push([ 'ROC curve', ...metric['tpr_roccurve'] ]);
			// dataArray.push('qq')
			return dataArray;
			console.log(dataArray);
		}
	}

	// calculate total imgae
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

	// 1.3 init all_class data
	// func to create all class tab
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
				confusionMatrix: [ ...metric['confusion_matrix'] ],
				confusionMatrixLable: [ ...labels ],

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
					[ 'no_img', 'img05', 'img12', 'img09', 'no img', 'no_img', 'img05', 'img12', 'no img', 'no img' ],
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

	// create all class tab
	createAllClassTab(metric, labels);

	// 1.3 create dataColumn for each class

	// function to create each class data column to plot pr curve
	function createEachTabDataArray(labels, metric) {
		// init data strcutrure
		let eachDataColumn = [];
		for (let i = 0; i < labels.length; i++) {
			eachDataColumn.push([]);
		}

		for (let i = 0; i < labels.length; i++) {
			// loop thru class
			eachDataColumn[i].push([ 'threshold', ...metric['thresholds_prcurve'][i] ]);
			eachDataColumn[i].push([ 'precision', ...metric['precision_prcurve'][i] ]);
			eachDataColumn[i].push([ 'recall', ...metric['recall_prcurve'][i] ]);
		}

		return eachDataColumn;
	}

	// 1.4 init each class/label
	// function to create each each class/label
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
					precision: [ 0.45, 0.5, 0.6, 0.7, 0.8, 1 ],
					recall: [ 1, 0.75, 0.5, 0.25, 0.1, 0 ],
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
					confusionMatrixLable: [ i, 'other' ],
					confusionMatrixAnnotation: [ [ 'img01, img03', 'img02,img04' ], [ 'no_img', 'img05' ] ],
					labelsNum: labels.length,
					thresholdValue: metric['thresholds_prcurve'][i]
				}
			});
		}
	}

	// check if not binary data, then create all other class
	if (labels.length > 2) {
		createEachClassTab(metric, labels);
	}

	return tabData;
}

export default createData;
