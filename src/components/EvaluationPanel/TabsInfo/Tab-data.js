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



  // 1.3 init all_class data
  tabData.push({
    "id": 0,
    "name": "all class",
    "metrics": {
      "Sensitivity": metric['micro_recall'],
      "Specificity": "N/A",
      "Precision": metric['micro_precision'],
      "F1score": metric['micro_f1_score'],
      "AUC": "N/A"
    },
    "grpah": {
      ChartTitle: 'ROC Chart',
      xAxisLabel: '1 - Specificity (False Positive Rate)',
      yAxisLabel: 'Sensitivity (True Positive Rate)',
      axisSetting: axisObj,
      dataColumn: dataArray,
      "precision": [0.45, 0.5, 0.6, 0.7, 0.8, 1],
      "recall": [1, 0.75, 0.5, 0.25, 0.1, 0],
      "image": 1000
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
        "Sensitivity": "N/A",
        "Specificity": "N/A",
        "Precision": "N/A",
        "F1score": "N/A",
        "AUC": metric['roc_auc'][`${i}`],
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
        "precision": [0.45, 0.5, 0.6, 0.7, 0.8, 1],
        "recall": [1, 0.75, 0.5, 0.25, 0.1, 0],
        "image": "N/A"
      },
      'confusionMatrixInfo': {
        // TODO: need to import dynamically later
        confusionMatrix: [
          [1, 0],
          [7, 0],
        ],
        // TODO: need to import dynamically later
        confusionMatrixLable: [
          0,1
        ],
        // TODO: need to import dynamically later
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
