

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


export {
  data
}
