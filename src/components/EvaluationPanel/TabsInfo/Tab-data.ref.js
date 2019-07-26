要自動生成一個目前的結構
let tabData = [{
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
      ChartTitle:'ROC',
      xAxisLabel: '1 - Specificity (False Positive Rate)',
      yAxisLabel: 'Sensitivity (True Positive Rate)',
      axisSetting:{
        "tpr_roccurve of class 9": "fpr_roccurve of class 9",
        "tpr_roccurve of class 8": "fpr_roccurve of class 8",
        "tpr_roccurve of class 7": "fpr_roccurve of class 7",
        "tpr_roccurve of class 6": "fpr_roccurve of class 6",
        "tpr_roccurve of class 5": "fpr_roccurve of class 5",
        "tpr_roccurve of class 4": "fpr_roccurve of class 4",
        "tpr_roccurve of class 3": "fpr_roccurve of class 3",
        "tpr_roccurve of class 2": "fpr_roccurve of class 2",
        "tpr_roccurve of class 1": "fpr_roccurve of class 1",
        "tpr_roccurve of class 0": "fpr_roccurve of class 0"
      },
      dataColumn: [
        [
          "fpr_roccurve of class 0",
          ...deepraData_10["metrics"]["fpr_roccurve"]["0"]
        ],
        [
          "tpr_roccurve of class 0",
          ...deepraData_10["metrics"]["tpr_roccurve"]["0"]
        ],
        [
          "fpr_roccurve of class 1",
          ...deepraData_10["metrics"]["fpr_roccurve"]["1"]
        ],
        [
          "tpr_roccurve of class 1",
          ...deepraData_10["metrics"]["tpr_roccurve"]["1"]
        ],
        [
          "fpr_roccurve of class 2",
          ...deepraData_10["metrics"]["fpr_roccurve"]["2"]
        ],
        [
          "tpr_roccurve of class 2",
          ...deepraData_10["metrics"]["tpr_roccurve"]["2"]
        ],
        [
          "fpr_roccurve of class 3",
          ...deepraData_10["metrics"]["fpr_roccurve"]["3"]
        ],
        [
          "tpr_roccurve of class 3",
          ...deepraData_10["metrics"]["tpr_roccurve"]["3"]
        ],
        [
          "fpr_roccurve of class 4",
          ...deepraData_10["metrics"]["fpr_roccurve"]["4"]
        ],
        [
          "tpr_roccurve of class 4",
          ...deepraData_10["metrics"]["tpr_roccurve"]["4"]
        ],
        [
          "fpr_roccurve of class 5",
          ...deepraData_10["metrics"]["fpr_roccurve"]["5"]
        ],
        [
          "tpr_roccurve of class 5",
          ...deepraData_10["metrics"]["tpr_roccurve"]["5"]
        ],
        [
          "fpr_roccurve of class 6",
          ...deepraData_10["metrics"]["fpr_roccurve"]["6"]
        ],
        [
          "tpr_roccurve of class 6",
          ...deepraData_10["metrics"]["tpr_roccurve"]["6"]
        ],
        [
          "fpr_roccurve of class 7",
          ...deepraData_10["metrics"]["fpr_roccurve"]["7"]
        ],
        [
          "tpr_roccurve of class 7",
          ...deepraData_10["metrics"]["tpr_roccurve"]["7"]
        ],
        [
          "fpr_roccurve of class 8",
          ...deepraData_10["metrics"]["fpr_roccurve"]["8"]
        ],
        [
          "tpr_roccurve of class 8",
          ...deepraData_10["metrics"]["tpr_roccurve"]["8"]
        ],
        [
          "fpr_roccurve of class 9",
          ...deepraData_10["metrics"]["fpr_roccurve"]["9"]
        ],
        [
          "tpr_roccurve of class 9",
          ...deepraData_10["metrics"]["tpr_roccurve"]["9"]
        ]
      ],
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
      ChartTitle: 'Precision Recall Curve',
      xAxisLabel: 'Threshold',
      yAxisLabel: 'Precision / Recall',
      axisSetting: {
          'precision': 'threshold',
          'recall': 'threshold',
        },
        dataColumn: [
          ['threshold',
            0.638652503490448,
            0.7687115669250488,
            0.7861970663070679,
            0.8254095911979675,
            0.8278610110282898,
            0.832051694393158,
            0.8495823740959167,
            0.857808530330658,
            0.879504382610321,
            0.9190024137496948,
            0.9387750029563904,
            0.9393826127052307,
            0.9563928842544556,
            0.9593612551689148,
            0.9665204882621765,
            0.972623348236084,
            0.9744020700454712,
            0.9759137034416199,
            0.9764076471328735,
            0.9785075187683105,
            0.9793577194213867,
            0.9795815944671631,
            0.9798107743263245,
            0.9812110662460327,
            0.9821147918701172,
            0.9823380708694458,
            0.9842478036880493,
            0.9843664169311523,
            0.9844129681587219,
            0.984614372253418,
            0.9847074747085571,
            0.989180326461792,
            0.9914558529853821,
            0.991496741771698,
            0.992426872253418,
            0.9952804446220398,
            0.997246265411377,
            0.9975305199623108,
            0.9975696206092834,
            0.9975820779800415,
            0.9980112314224243,
            0.9980402588844299,
            0.9980620741844177,
            0.9981809854507446,
            0.9986849427223206,
            0.9989044666290283,
            0.9990818500518799,
            0.9991300702095032,
            0.999220609664917,
            0.9993157386779785,
            0.9993450045585632,
            0.9993671774864197,
            0.9996845722198486,
            0.9997765421867371,
            0.9998311996459961,
            0.9998341798782349,
            0.9998406171798706,
            0.9998860359191895,
            0.9999634027481079
          ],
          ['precision', 1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          ['recall', 1,
            0.9833333333333333,
            0.9666666666666667,
            0.95,
            0.9333333333333333,
            0.9166666666666666,
            0.9,
            0.8833333333333333,
            0.8666666666666667,
            0.85,
            0.8333333333333334,
            0.8166666666666667,
            0.8,
            0.7833333333333333,
            0.7666666666666667,
            0.75,
            0.7333333333333333,
            0.7166666666666667,
            0.7,
            0.6833333333333333,
            0.6666666666666666,
            0.65,
            0.6333333333333333,
            0.6166666666666667,
            0.6,
            0.5833333333333334,
            0.5666666666666667,
            0.55,
            0.5333333333333333,
            0.5166666666666667,
            0.5,
            0.48333333333333334,
            0.4666666666666667,
            0.45,
            0.43333333333333335,
            0.4166666666666667,
            0.4,
            0.38333333333333336,
            0.36666666666666664,
            0.35,
            0.3333333333333333,
            0.31666666666666665,
            0.3,
            0.2833333333333333,
            0.26666666666666666,
            0.25,
            0.23333333333333334,
            0.21666666666666667,
            0.2,
            0.18333333333333332,
            0.16666666666666666,
            0.15,
            0.13333333333333333,
            0.11666666666666667,
            0.1,
            0.08333333333333333,
            0.06666666666666667,
            0.05,
            0.03333333333333333,
            0.016666666666666666,
            0
          ]
        ],
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