function createData(lables = "", metric = {}) {
  // 1. init the data for all lables
  let tabData = []

  // 1.2 setup for later init
  // 1.2.1 setup the all_class axis obj
  let axisObj = {}
  for (let i = 0; i < lables.length + 1; i++) {
    axisObj[`tpr_roccurve of class ${i}`] = `fpr_roccurve of class ${i}`
  }

  // 1.1.2 create all_class dataColumne

  let dataArray = []

  let len = lables.length

  // need to construct the strcuture first to later use push method to its index
  for (let i = 0; i < len * 2; i++) {
    dataArray.push([])
  }

  for (let i = 0; i < len; i++) {
    dataArray[i].push(`fpr_roccurve of class ${i}`, ...metric['fpr_roccurve'][`${i}`])
  }

  // also push tpr into array, use i-len to get the correct index from data
  for (let i = len; i < len * 2; i++) {
    dataArray[i].push(`tpr_roccurve of class ${i - len}`, ...metric['tpr_roccurve'][`${i - len}`])
  }


  // calculate total imgae
  let totalImage = 0;
  for (let i = 0; i < len; i++) {
    totalImage += metric['label_counts'][i]
  }


  // 1.3 init all_class data
  tabData.push({
    "id": 0,
    "name": "all class",
    "metrics": {
      "Sensitivity": metric['micro_recall'],
      "Specificity": metric['micro_specificity'],
      "Precision": metric['micro_precision'],
      "F1score": metric['micro_f1_score'],
      "AUC": metric['weighted_roc_auc'],
    },
    "grpah": {
      ChartTitle: 'ROC Chart',
      xAxisLabel: '1 - Specificity (False Positive Rate)',
      yAxisLabel: 'Sensitivity (True Positive Rate)',
      axisSetting: axisObj,
      dataColumn: dataArray,
      "precision": [0.45, 0.5, 0.6, 0.7, 0.8, 1],
      "recall": [1, 0.75, 0.5, 0.25, 0.1, 0],
      "image": totalImage
    },
    'confusionMatrixInfo': {
      confusionMatrix: [...metric['confusion_matrix']],
      confusionMatrixLable: [...lables],

      // TODO: need to import dynamically 
      confusionMatrixAnnotation: [
        ["img01, img03", "img02,img04", "img23", "no img", "img09", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "img09", "no img", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "no img  ", "no img", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "no img  ", "no img", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "no img  ", "no img", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "no img  ", "no img", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "no img  ", "no img", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "no img  ", "no img", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "no img  ", "no img", "no_img", "img05", "img12", "no img  ", "no img"],
        ["no_img", "img05", "img12", "no img  ", "no img", "no_img", "img05", "img12", "no img  ", "no img"]
      ]
    }
  })

  // 1.3 create dataColumn for each class

  // init data strcutrure
  let eachDataColumn = []
  for (let i = 0; i < lables.length; i++) {
    eachDataColumn.push([])
  }


  for (let i = 0; i < lables.length; i++) { // loop thru class
    eachDataColumn[i].push(['threshold', ...metric['thresholds_prcurve'][i]])
    eachDataColumn[i].push(['precision', ...metric['precision_prcurve'][i]])
    eachDataColumn[i].push(['recall', ...metric['recall_prcurve'][i]])
  }


  // 1.4 init each class/label
  for (let i = 0; i < lables.length; i++) {
    tabData.push({
      "id": `${i+1}`,
      "name": `class ${lables[i]}`,
      "metrics": {
        "Sensitivity": metric['report_per_labels'][i]['recall'],
        "Specificity": metric['report_per_labels'][i]['specificity'],
        "Precision": metric['report_per_labels'][i]['precision'],
        "F1score": metric['report_per_labels'][i]['f1'],
        "AUC": metric['roc_auc'][i],
      },
      "grpah": {
        ChartTitle: 'Precision Recall Curve',
        xAxisLabel: 'Threshold',
        yAxisLabel: 'Precision / Recall',
        axisSetting: {
          'precision': 'threshold',
          'recall': 'threshold',
        },
        dataColumn: eachDataColumn[i],
        precision: [0.45, 0.5, 0.6, 0.7, 0.8, 1],
        recall: [1, 0.75, 0.5, 0.25, 0.1, 0],
        image: metric['label_counts'][i]
      },
      'confusionMatrixInfo': {
        confusionMatrix: [
          ...metric["report_per_labels"][i]["content"]
          // [1, 0],
          // [7, 0],
        ],
        confusionMatrixLable: [
          i, 'other',
        ],
        confusionMatrixAnnotation: [
          ['img01, img03', 'img02,img04'],
          ['no_img', 'img05'],
        ],
      }
    })
  }




  return tabData

}


// import deepraData_4 from '../deepra.pretty.4class.json'
// import deepraData_10 from '../deepra.10Class.json'

// let lables = deepraData_10['labels']
// let metrics = deepraData_10['metrics']

export {
  createData,

}
