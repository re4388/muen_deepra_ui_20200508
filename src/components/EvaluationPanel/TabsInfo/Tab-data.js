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
  let dataArray = [] // will later store to dataColumn

  // can't use spread, setup temp
  let fprTemp = {}
  let tprTemp = {}
  for (let i = 0; i < lables.length + 1; i++) {
    fprTemp[`${i}`] = metric['fpr_roccurve'][`${i}`]
    tprTemp[`${i}`] = metric['tpr_roccurve'][`${i}`]
  }

  // push fpr first
  for (let i = 0; i < lables.length; i++) {
    dataArray.push([`fpr_roccurve of class ${ i }`])
    for (let j = 0; j < fprTemp[i].length; j++) {
      dataArray[i].push(fprTemp[i][j])
    }
  }

  // push tpr
  for (let i = 0; i < lables.length; i++) {
    dataArray.push([`tpr_roccurve of class ${ i }`])
    for (let j = 0; j < tprTemp[i].length; j++) {
      // i + lables.length -> begin after fpr element
      dataArray[i + lables.length].push(tprTemp[i][j])
    }
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
      }
    })
  }



  return tabData

}


// import deepraData_4 from '../deepra.pretty.4class.json'
import deepraData_10 from '../deepra.10Class.json'

let lables = deepraData_10['labels']
let metrics = deepraData_10['metrics']

// let tabData = createData(lables, metrics)


export {
  createData,
  // tabData,
}
