import {
  BaseModel,
  BinaryModel,
  RegressionModel,
  MultiClassModel,
  checkModel,
  generateModel
} from "@/components/EvaluationPanel/TabsInfo/dataProcess.js";


it('BaseModel constructor works', () => {
  const obj = new BaseModel(1, 2);
  expect(obj.labels).toBe(1);
  expect(obj.metric).toBe(2);
});

it('BaseModel method getTotalImage work', () => {
  const labels = [0, 1, 2]
  const metric = {
    "label_counts": {
      "0": 100,
      "1": 100,
      "2": 100,
    },
  }
  const obj = new BaseModel(labels, metric);
  expect(obj.getTotalImage()).toBe(300);


  // test when we have no this info 
  const noLabelCount = {}
  const obj2 = new BaseModel(labels, noLabelCount);
  expect(obj2.getTotalImage()).toBe(undefined);
})

it('BinaryModel is instanceof BaseModel', () => {
  expect(BinaryModel.prototype instanceof BaseModel).toBe(true)
})

it('MultiClassModel is instanceof BaseModel', () => {
  expect(MultiClassModel.prototype instanceof BaseModel).toBe(true)
})

it('RegressionModel is instanceof BaseModel', () => {
  expect(RegressionModel.prototype instanceof BaseModel).toBe(true)
})

it('BinaryModel constructor works', () => {
  const obj = new BinaryModel();
  expect(obj.allData).toStrictEqual([]);
  expect(obj.axisObj).toStrictEqual({});
});

it('BinaryModel method createC3Axis works', () => {
  const obj = new BinaryModel();
  // let axisObj = {
  //   'foo': 'bar'
  // };
  expect(obj.createC3Axis()).toEqual({
    'ROC curve': 'x'
  });

});

it('BinaryModel method createC3Data_AllClass works', () => {
  const labels = [0, 1, 2]
  const metric = {
    "fpr_roccurve": [1, 2, 3],
    "tpr_roccurve": [1, 2, 3],
  }
  const obj = new BinaryModel(labels, metric);
  // console.log(obj.createC3Data_AllClass())
  expect(obj.createC3Data_AllClass()).toEqual([
    ['x', 1, 2, 3],
    ['ROC curve', 1, 2, 3]
  ]);
})

// it('BinaryModel method createC3Data_EachClass works', () => {
//   const labels = [0, 1, 2]
//   const metric = {
//     "precision_prcurve": [1, 2, 3],
//     "recall_prcurve": [1, 2, 3],
//     "thresholds_prcurve": [1,2,3]
//   }
//   const obj = new BinaryModel(labels, metric);
//   console.log(obj.createC3Data_EachClass())
// })

it('BinaryModel method generateData work', () => {
  const labels = [0, 1, 2]
  const metric = {
    "precision_prcurve": [1, 2, 3],
    "recall_prcurve": [1, 2, 3],
    "thresholds_prcurve": [1, 2, 3]
  }
  const obj = new BinaryModel(labels, metric);

  let pushAllClass = jest.fn()
  let localthis = {
    pushAllClass,
    allData: "foo"
  }

  // console.log(obj.generateData.call(localthis))
  expect(obj.generateData.call(localthis)).toBeTruthy()

})


it('RegressionModel constructor works', () => {
  const obj = new RegressionModel();
  expect(obj.allData).toStrictEqual([]);
  expect(obj.axisObj).toStrictEqual({});
});


it('RegressionModel method createC3Axis works', () => {
  const obj = new RegressionModel();

  expect(obj.createC3Axis()).toEqual({
    dependent_y_axis: 'inde_x_axis',
    line: 'line_x_axis',
  });
});

it('RegressionModel method createC3Data_AllClass works', () => {
  const labels = [0, 1, 2]
  const metric = {
    'inde_x_axis': [1, 2, 3],
    'dependent_y_axis': [1, 2, 3],
    'line_x_axis': [1, 2, 3],
    'line': [1, 2, 3],
  }
  const obj = new RegressionModel(labels, metric);
  expect(obj.createC3Data_AllClass()).toEqual([
    ['inde_x_axis', 1, 2, 3],
    ['dependent_y_axis', 1, 2, 3],
    ['line_x_axis', 1, 2, 3],
    ['line', 1, 2, 3]
  ]);
})

it('RegressionModel method addRegressionData work', () => {
  const labels = [0, 1, 2]
  const metric = {
    'distFromLine': [1, 2, 3],
  }

  // let allData = jest.fn()
  let localthis = {
    allData: [{
      'graph': {
        'distFromLine': [1, 2, 3]
      }
    }],
    metric: {
      'distFromLine': [1, 2, 3],
    }
  }
  const obj = new RegressionModel(labels, metric);
  expect(obj.addRegressionData.call(localthis)).toBe(null);
})

it('RegressionModel method generateData work', () => {
  // const labels = [0, 1, 2]
  // const metric = {
  //   "inde_x_axis": [1, 2, 3],
  //   "dependent_y_axis": [1, 2, 3],
  //   'line_x_axis': [1, 2, 3],
  //   'line': [1, 2, 3],
  // }
  const obj = new RegressionModel();

  let pushAllClass = jest.fn()
  let addRegressionData = jest.fn()
  let localthis = {
    pushAllClass,
    addRegressionData,
    allData: "foo"
  }

  expect(obj.generateData.call(localthis)).toBeTruthy()

})




it('MultiClassModel constructor works', () => {
  const obj = new MultiClassModel();
  expect(obj.allData).toStrictEqual([]);
  expect(obj.axisObj).toStrictEqual({});
});

it('MultiClassModel method createC3Axis works', () => {
  const labels = [0, 1, 2]
  const metric = {}
  const obj = new MultiClassModel(labels, metric);

  // console.log(obj.createC3Axis())
  expect(obj.createC3Axis()).toEqual({
    "tpr_roccurve of class 0": "fpr_roccurve of class 0",
    "tpr_roccurve of class 1": "fpr_roccurve of class 1",
    "tpr_roccurve of class 2": "fpr_roccurve of class 2",
    "tpr_roccurve of class 3": "fpr_roccurve of class 3",
  });

});

it('MultiClassModel method createC3Data_AllClass works', () => {
  const labels = [0, 1]
  const metric = {
    "fpr_roccurve": {
      "0": [
        1, 2, 3
      ],
      "1": [
        1, 2, 3
      ]
    },
    "tpr_roccurve": {
      "0": [
        1, 2, 3
      ],
      "1": [
        1, 2, 3
      ]
    },
  }
  const obj = new MultiClassModel(labels, metric);
  // console.log(obj.createC3Data_AllClass())
  expect(obj.createC3Data_AllClass()).toEqual([
    ['fpr_roccurve of class 0', 1, 2, 3],
    ['fpr_roccurve of class 1', 1, 2, 3],
    ['tpr_roccurve of class 0', 1, 2, 3],
    ['tpr_roccurve of class 1', 1, 2, 3]
  ]);
})

it('MultiClassModel method createC3Data_eachClass works', () => {
  const labels = [0, 1]
  const metric = {
    "thresholds_prcurve": {
      "0": [
        1, 2, 3
      ],
      "1": [
        1, 2, 3
      ]
    },
    "precision_prcurve": {
      "0": [
        1, 2, 3
      ],
      "1": [
        1, 2, 3
      ]
    },
    "recall_prcurve": {
      "0": [
        1, 2, 3
      ],
      "1": [
        1, 2, 3
      ]
    },
  }
  const obj = new MultiClassModel(labels, metric);
  // console.log(obj.createC3Data_eachClass())
  expect(obj.createC3Data_eachClass()).toEqual([
    [
      ['threshold', 1, 2, 3],
      ['precision', 1, 2, 3],
      ['recall', 1, 2, 3]
    ],
    [
      ['threshold', 1, 2, 3],
      ['precision', 1, 2, 3],
      ['recall', 1, 2, 3]
    ]
  ]);

})

it('MultiClassModel method generateData work', () => {

  const obj = new MultiClassModel();

  let pushAllClass = jest.fn()
  let pushEachClass = jest.fn()
  let localThis = {
    pushAllClass,
    pushEachClass,
    allData: "foo"
  }

  expect(obj.generateData.call(localThis)).toBeTruthy()

})


it('function checkModel works', () => {

  let metric = {
    'fpr_roccurve': {
      "0": [
        1, 2, 3
      ],
      "1": [
        1, 2, 3
      ]
    },
  }

  let metric2 = {
    "distFromLine": [1, 2, 3],
    'fpr_roccurve': []
  }

  let metric3 = {
    'fpr_roccurve': [1, 2, 3]
  }

  // console.log(checkModel(metric))
  expect(checkModel(metric)).toBe('multiType')
  expect(checkModel(metric2)).toBe('regression')
  expect(checkModel(metric3)).toBe('binaryModel')
})








// use jest to mock sperate class methods inside external module
jest.mock('@/components/EvaluationPanel/TabsInfo/dataProcess.js', () => {
  const mockDataProcess = jest.requireActual('@/components/EvaluationPanel/TabsInfo/dataProcess.js')
  mockDataProcess.MultiClassModel.prototype.pushAllClass = function () {
    // console.log('---  MultiClassModel pushAllClass is mocked')
    return null
  }
  mockDataProcess.MultiClassModel.prototype.pushEachClass = function () {
    // console.log('--- MultiClassModel pushEachClass is mocked')
    return null
  }

  mockDataProcess.RegressionModel.prototype.pushAllClass = function () {
    // console.log('---  RegressionModel pushAllClass is mocked')
    return null
  }
  mockDataProcess.RegressionModel.prototype.addRegressionData = function () {
    // console.log('---  RegressionModel addRegressionData is mocked')
    return null
  }

  mockDataProcess.BinaryModel.prototype.pushAllClass = function () {
    // console.log('---  binaryModel pushAllClass is mocked')
    return null
  }


  return mockDataProcess
})

describe('generateModel', () => {
  it('execute class method based on different metric strcuture', () => {
    const labels = [0, 1]
    let metric1 = {
      'fpr_roccurve': {
        "0": [
          1, 2, 3
        ],
        "1": [
          1, 2, 3
        ]
      },
    }
    let metric2 = {
      "distFromLine": [1, 2, 3],
      'fpr_roccurve': []
    }

    let metric3 = {
      'fpr_roccurve': [1, 2, 3]
    }


    expect(generateModel(labels, metric1)).toBeTruthy()
    expect(generateModel(labels, metric2)).toBeTruthy()
    expect(generateModel(labels, metric3)).toBeTruthy()

  })
})




// function generateModel(labels, metric) {
//   if (checkModel(metric) === 'multiType') {
//     return new MultiClassModel(labels, metric).generateData()
//   }
//   if (checkModel(metric) === 'regression') {
//     return new RegressionModel(labels, metric).generateData()
//   } else {
//     return new BinaryModel(labels, metric).generateData()
//   }
// }

// function checkModel(metric) {
//   if (!Array.isArray(metric['fpr_roccurve'])) {
//     return 'multiType'
//   }
//   if (metric['distFromLine']) { // if this specific field exist..
//     return 'regression'
//   } else {
//     return 'binaryModel'
//   }
// }


//  generateData() {
//    this.pushAllClass()
//    this.pushEachClass()
//    return this.allData
//  }
