class BaseModel {
    constructor(labels, metric) {
        this.labels = labels
        this.metric = metric
    }

    getTotalImage() {
        // return if backend don't have this info
        if (this.metric['label_counts'] === undefined) {
            return;
        }

        let totalImage = 0;
        for (let i = 0; i < this.labels.length; i++) {
            totalImage += this.metric['label_counts'][i];
        }
        return totalImage;
    }

    // push all_class
    pushAllClass() {
        this.allData.push({
            id: 0,
            name: 'all class',
            metrics: {
                Sensitivity: this.metric['macro_recall'] || 'not available yet',
                Specificity: this.metric['macro_specificity'] || 'not available yet',
                Precision: this.metric['macro_precision'] || 'not available yet',
                F1score: this.metric['macro_f1_score'] || 'not available yet',
                AUC: this.metric['weighted_roc_auc'] || 'not available yet'
            },
            grpah: {
                ChartTitle: 'ROC Chart',
                xAxisLabel: '1 - Specificity (False Positive Rate)',
                yAxisLabel: 'Sensitivity (True Positive Rate)',
                axisSetting: this.createC3Axis(this.labels),
                dataColumn: this.createC3Data_AllClass(this.labels, this.metric),
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

    // push each each class
    pushEachClass() {
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
                    dataColumn: this.createC3Data_eachClass(this.labels, this.metric)[i],
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
}

class BinaryModel extends BaseModel {
    constructor(labels, metric) {
        super(labels, metric)
        this.allData = []
        this.axisObj = {}
    }

    createC3Axis() {
        this.axisObj = {'ROC curve': 'x'};
        return this.axisObj;
    }

    createC3Data_AllClass() {
        let dataArray = [];
        dataArray.push(['x', ...this.metric['fpr_roccurve']]);
        dataArray.push(['ROC curve', ...this.metric['tpr_roccurve']]);
        return dataArray;
    }

    createC3Data_EachClass() {
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

    generateData() {
        this.pushAllClass()
        return this.allData
    }

}


class MultiClassModel extends BaseModel {
    constructor(labels, metric) {
		super(labels, metric)
        this.allData = []
        this.axisObj = {}
    }

    createC3Axis() {
        for (let i = 0; i < this.labels.length + 1; i++) {
            this.axisObj[`tpr_roccurve of class ${i}`] = `fpr_roccurve of class ${i}`;
        }
        return this.axisObj;
    }

    createC3Data_AllClass() {
        let dataArray = [];
        let len = this.labels.length;
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
    }

    createC3Data_eachClass() {

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

    generateData() {
		this.pushAllClass()
        this.pushEachClass()
        return this.allData
    }
}


// return model Type, use 'fpr_roccurve' data structure to check model type
function checkModel(metric) {

    if (!Array.isArray(metric['fpr_roccurve'])) {
        return 'multiType'
    } else {
        return 'binaryModel'
    }
}


function generateModel(labels, metric) {
    if (checkModel(metric) === 'multiType') {
        return new MultiClassModel(labels, metric).generateData()
    } else {
		return new BinaryModel(labels, metric).generateData()
    }
}


export {
    generateModel
}

