

import deepraData_4 from '../deepra.pretty.4class.json'
import deepraData_10 from '../deepra.10Class.json'



// get class number 
let classNumbers = Object.keys(deepraData_10['labels']).length

function createLableArray(num) {
  let array = ['All Class']
  for (let i = 1; i < num + 1; i++) {
    array.push(`class ${i}`)
  }
  return array
}

let classArray = createLableArray(classNumbers)
// console.log(classArray)






// 1. get image
let predict = deepraData_10['prediction']
let predictNumber = Object.keys(predict).length // 605 image?
// FIXME: but how to I know each class image?


//2. get metric info for each tab
// FIXME: don't have sensitivity, specificity info 
// FIXME: what's the marco and micro mean?
// FIXME: don't have each tab info


// 3. score threshold
// currently, i have x-axis as threshold, y axis as precision and recall
// the data looks only have invidual lables data
// FIXME: don't know how to use data to draw graph 

// precision_prcurve
// recall_prcurve
// thresholds_prcurve


// let q = Object.keys().length
// 61 val for precision_prcurve, recall_prcurve, thresholds_prcurve
// console.log(deepraData_4['metrics']['thresholds_prcurve']['3'])



// thresholds_prcurve都會少一個
// 0->60, 1->111, 2->499, 3->135...
// 有幾個，我就可以有幾個input tick -> checked
// 我需要有一個map的機制，就是第0個tick, 就會對應到一個數字，這個應該也不是問題 -> checked!



// 4. confution matrix
// see confusionMatrixData.js


// 5. ROC chart
// see 

// console.log(deepraData_10['metrics']['tpr_roccurve']['8']) //14
// console.log(deepraData_10['metrics']['fpr_roccurve']['8'])
// console.log(deepraData_10['metrics']['thresholds_roccurve']['8'])


// data.content.forEach( i => {
//   i['name']="apple"
// })




let tabData = {
  "content": [{
      "id": 0,
      "name": "AllTabInfo",
      "metrics": {
        "Sensitivity": "99.2%±0.01",
        "Specificity": "94.3%±0.09",
        "Precision": "91.8%±0.02",
        "F1score": "0.854±0.08",
        "AUC": "0.938±0.04"
      },
      "grpah": {
        "precision": [0.45, 0.5, 0.6, 0.7, 0.8, 1],
        "recall": [1, 0.75, 0.5, 0.25, 0.1, 0],
        "image": 100
      }
    },
    {
      "id": 1,
      "name": "Tab-1info",
      "metrics": {
        "Sensitivity": "29.2%±0.03",
        "Specificity": "24.3%±0.02",
        "Precision": "21.8%±0.05",
        "F1score": "0.854±0.02",
        "AUC": "0.938±0.06"
      },
      "grpah": {
        "precision": [
          0.25,
          0.5,
          0.6,
          0.7,
          0.8,
          0.9
        ],
        "recall": [
          1,
          0.75,
          0.5,
          0.25,
          0.1,
          0
        ],
        "image": 140
      }
    },
    {
      "id": 2,
      "name": "Tab-2info",
      "metrics": {
        "Sensitivity": "39.2%±0.04",
        "Specificity": "34.3%±0.02",
        "Precision": "31.8%±0.01",
        "F1score": "0.854±0.09",
        "AUC": "0.938±0.03"
      },
      "grpah": {
        "precision": [
          0.1,
          0.2,
          0.3,
          0.4,
          0.5,
          1
        ],
        "recall": [
          1,
          0.65,
          0.5,
          0.35,
          0.1,
          0.05
        ],
        "image": 150
      }
    },
    {
      "id": 3,
      "name": "Tab-3info",
      "metrics": {
        "Sensitivity": "49.2%±0.02",
        "Specificity": "44.3%±0.29",
        "Precision": "41.8%±0.05",
        "F1score": "0.454±2.01",
        "AUC": "0.438±0.03"
      },
      "grpah": {
        "precision": [
          0.2,
          0.4,
          0.6,
          0.7,
          0.8,
          1
        ],
        "recall": [
          1,
          0.85,
          0.4,
          0.25,
          0.1,
          0
        ],
        "image": 200
      }
    },
    {
      "id": 4,
      "name": "Tab-4info",
      "metrics": {
        "Sensitivity": "29.2%±0.01",
        "Specificity": "24.3%±2.02",
        "Precision": "41.8%±0.01",
        "F1score": "0.454±1.07",
        "AUC": "0.438±0.03"
      },
      "grpah": {
        "precision": [
          0.15,
          0.4,
          0.6,
          0.7,
          0.9,
          1
        ],
        "recall": [
          1,
          0.75,
          0.45,
          0.25,
          0,
          0
        ],
        "image": 300
      }
    },
    {
      "id": 5,
      "name": "Tab-5info",
      "metrics": {
        "Sensitivity": "59.2%±0.01",
        "Specificity": "54.3%±2.02",
        "Precision": "41.8%±0.01",
        "F1score": "0.454±1.07",
        "AUC": "0.438±0.03"
      },
      "grpah": {
        "precision": [
          0,
          0.2,
          0.33,
          0.4,
          0.5,
          0.9
        ],
        "recall": [
          1,
          0.85,
          0.5,
          0.35,
          0.15,
          0.2
        ],
        "image": 50
      }
    }
  ]
}





export {
  tabData,
  classArray
}
