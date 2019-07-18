const GraphDisplayLineChart = require('../GraphDisplayLineChart.vue');

it('shall have key property inside GraphDisplayLineChart object', () => {
  expect(GraphDisplayLineChart).toHaveProperty('default.extends') 
  expect(GraphDisplayLineChart).toHaveProperty('default.props') 
  expect(GraphDisplayLineChart).toHaveProperty('default.mixins') 
  expect(GraphDisplayLineChart).toHaveProperty('default.mounted') 
  expect(GraphDisplayLineChart).toHaveProperty('default.props') 
})



//
//  {
//    "default": {
//      "extends": {
//        "beforeDestroy": [Function beforeDestroy],
//        "data": [Function data],
//        "methods": {
//          "addPlugin": [Function addPlugin],
//          "generateLegend": [Function generateLegend],
//          "renderChart": [Function renderChart]
//        },
//        "props": {
//          "chartId": {
//            "default": "line-chart",
//            "type": [Function String]
//          },
//          "cssClasses": {
//            "default": "",
//            "type": [Function String]
//          },
//          "height": {
//            "default": 400,
//            "type": [Function Number]
//          },
//          "plugins": {
//            "default": [Function _default],
//            "type": [Function Array]
//          },
//          "styles": {
//            "type": [Function Object]
//          },
//          "width": {
//            "default": 400,
//            "type": [Function Number]
//          }
//        },
//        "render": [Function render]
//      },
//      "mixins": [{
//        "props": {
//          "chartData": {
//            "default": [Function _default],
//            "required": true,
//            "type": [Function Object]
//          }
//        },
//        "watch": {
//          "chartData": [Function dataHandler]
//        }
//      }],
//      "mounted": [Function mounted],
//      "props": ["options"]
//    }
//  }