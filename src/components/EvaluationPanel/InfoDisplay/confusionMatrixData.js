//  原始測試資料
// array of obj, 每一個 obj have 3 keys: data, label 和annotaion
let matrixData = [
  {
    confusionMatrix: [
      [169, 10, 12, 0, 12, 169, 10, 12, 0, 12],
      [7, 46, 12, 1, 1, 169, 10, 12, 0, 12],
      [1, 2, 3, 33, 0, 169, 10, 12, 0, 12],
      [0, 2, 3, 3, 22, 169, 10, 12, 0, 12],
      [1, 0, 3, 6, 2, 169, 10, 12, 0, 12],
      [1, 0, 3, 6, 2, 169, 10, 12, 0, 12],
      [1, 0, 3, 6, 2, 169, 10, 12, 0, 12],
      [1, 0, 3, 6, 2, 169, 10, 12, 0, 12],
      [1, 0, 3, 6, 2, 169, 10, 12, 0, 12],
      [1, 0, 3, 6, 2, 169, 10, 12, 0, 12]
    ],

    lableMatrix: [
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
    ],

    labels: ["Class A", "Class B", "Class C", "Class D", "Class E",
            "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
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


// 導入外部資料，會更新預設資料
import deepraData_4 from '../deepra.pretty.4class.json'
import deepraData_10 from '../deepra.10Class.json'

// 整理資料
let updateData = deepraData_10['metrics']['confusion_matrix']
let lablesData = deepraData_10['labels'].map(i => i.toString()) //d3 的label 需要是string


// 更新原始資料
matrixData[0]['confusionMatrix'] = updateData


// 更新原始資料標籤
matrixData[0]['labels'] = lablesData


// TODO: 還需要標籤資料



// TODO: 還需要個別的矩陣資料






export {
  matrixData
}
