





let data = [
  {
    confusionMatrix: [
      [169, 10, 12, 0, 12],
      [7, 46, 12, 1, 1],
      [1, 2, 3, 33, 0],
      [0, 2, 3, 3, 22],
      [1, 0, 3, 6, 2]
    ],

    lableMatrix: [
      ["img01, img03", "img02,img04", "img23", "no img", "img09"],
      ["no_img", "img05", "img12", "img09", "no img"],
      ["no_img", "img05", "img12", "no img  ", "no img"],
      ["no_img", "img05", "img12", "no img  ", "no img"],
      ["no_img", "img05", "img12", "no img  ", "no img"]
    ],

    labels: ["Class A", "Class B", "Class C", "Class D", "Class E"],
  },
  {
    confusionMatrix: [
      [1, 0],
      [7, 0],
    ],

    lableMatrix: [
      ['img01, img03', 'img02,img04'],
      ['no_img', 'img05'],
    ],
    labels: ['Class A', 'Class B'],
  },
  {
    confusionMatrix: [
      [2, 0],
      [7, 6],
    ],

    lableMatrix: [
      ['img01, img03', 'img02,img04'],
      ['no_img', 'img05'],
    ],
    labels: ['Class A', 'Class B'],
  },
  {
    confusionMatrix: [
      [3, 10],
      [1, 0],
    ],

    lableMatrix: [
      ['img01, img03', 'img02,img04'],
      ['no_img', 'img05'],
    ],
    labels: ['Class A', 'Class B'],
  },
  {
    confusionMatrix: [
      [4, 10],
      [7, 6],
    ],

    lableMatrix: [
      ['img01, img03', 'img02,img04'],
      ['no_img', 'img05'],
    ],
    labels: ['Class A', 'Class B'],
  },
  {
    confusionMatrix: [
      [5, 10],
      [7, 0],
    ],

    lableMatrix: [
      ['img01, img03', 'img02,img04'],
      ['no_img', 'img05'],
    ],
    labels: ['Class A', 'Class B'],
  }
]



import deepraData_4 from '../deepra.pretty.4class.json'
import deepraData_10 from '../deepra.10Class.json'

// demo deepraData_10 will error since
// we don't have corresponding tooltip mounted with 10

// 1. get data from backup json
let updateData = deepraData_4['metrics']['confusion_matrix']
let lablesData = deepraData_4['labels'].map(i => i.toString())

// console.log(updateData)

// 2. update allTab matrix data
data[0]['confusionMatrix'] = updateData

// 3. update alltab label
data[0]['labels'] = lablesData


// 4. update alltab annotations
// TODO: no backend info yet 



// 5. TODO: no invidual matrix for each tab yet






export {
  data
}
