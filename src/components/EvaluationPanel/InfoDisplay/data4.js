const confusion_matrix = {
  row1: [{
      data: '甲',
      // annotation: 'no file'
    },
    {
      data: 2,
      annotation: 'File Name: 11, 12'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    }, {
      data: 0,
      annotation: 'no file'
    }
  ],
  row2: [{
      data: '乙',
      // annotation: null
    },
    {
      data: 1,
      annotation: 'File Name: 13'
    },
    {
      data: 5,
      annotation: 'File Name: 2,67,12,32,56'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    }, {
      data: 0,
      annotation: 'no file'
    }
  ],
  row3: [{
      data: '丙',
      // annotation: null
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    }, {
      data: 0,
      annotation: 'no file'
    }
  ],
  row4: [{
      data: '丁',
      // annotation: null
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    }, {
      data: 0,
      annotation: 'no file'
    }
  ],
  row5: [{
      data: '戊',
      // annotation: null
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    },
    {
      data: 0,
      annotation: 'no file'
    }, {
      data: 0,
      annotation: 'no file'
    }
  ],
}


const confusion_matrix2 = {
  row1: [{
      data: '甲',
      // annotation: 'no file'
    },
    {
      data: 2,
      annotation: 'File Name: 11, 12'
    },
    {
      data: 0,
      annotation: 'no file'
    },
  ],
  row2: [{
      data: '乙',
      // annotation: null
    },
    {
      data: 1,
      annotation: 'File Name: 13'
    },
    {
      data: 5,
      annotation: 'File Name: 2,67,12,32,56'
    },
  ],
}




function getLabels(Obj) {
  let labels = ['']
  for (let key in Obj) {
    let len = Obj[key].length
    for (let i = 0; i < len; i++) {
      if (i === 1) {
        break;
      } else {
        labels.push(Obj[key][i].data)
      }
    }
  }
  return labels
}

// get labels from confusion_matrix
// ex. const confusion_matrix_caterogies = ["", '甲', '乙', '丙']
const confusion_matrix_caterogies = getLabels(confusion_matrix)
const confusion_matrix_caterogies2 = getLabels(confusion_matrix2)



export {
  confusion_matrix,
  confusion_matrix_caterogies,
  confusion_matrix2,
  confusion_matrix_caterogies2,
}
