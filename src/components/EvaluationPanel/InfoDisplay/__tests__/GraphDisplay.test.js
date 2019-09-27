import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'


let emptyPropsMock = () => {
  return shallowMount(GraphDisplay, {
    propsData: {
      graphData: {
        axisSetting: [],
        dataColumn: [],
        distFromLine: [],
      }
    },
  })
}


describe('GraphDisplay', function () {

  it('is a Vue instance', () => {
    const wrapper = emptyPropsMock()
    expect(wrapper.isVueInstance).toBeTruthy()
  })



  it('when mounted, initData is called', () => {
    let initData = jest.fn()
    // let handler = jest.fn()
    const wrapper = shallowMount(GraphDisplay, {
      propsData: {
        graphData: {
          axisSetting: [],
          dataColumn: [],
          distFromLine: [],
        }
      },
      methods: {
        initData,
        // handler,
      }
    })
    expect(initData).toHaveBeenCalled()
    // expect(handler).toHaveBeenCalled()
  })



  it('methods: "initData" work properly', () => {
    let localThis = {
      graphData: {
        "axisSetting": [],
        "dataColumn": [],
        "distFromLine": []
      }
    }
    expect(GraphDisplay.methods.initData.call(localThis)).toBe(undefined)
  })


  // showAnnotation() {
  //   this.handler.$emit("dispatch", chart => {
  //     chart.tooltip.show({
  //       x: this.dataColumn[0][this.newThreshold]
  //     });
  //   });
  // }


  it('methods: "showAnnotation" work properly', () => {
    let localThis = {
      newThreshold: 0,
      dataColumn: [
        [1, 2, 3], 2, 3
      ],
      handler: {
        $emit(...args) {
          return null
        }
      },
      chart: {
        tooltip: {
          show(...args) {
            return null
          }
        }
      }
    }
    expect(GraphDisplay.methods.showAnnotation.call(localThis)).toBeTruthy
  })

  it('computed: chartTitle, xAxisLabel, yAxisLabel, AxisYMax, AxisYMin, tickValue, type work properly', () => {
    let localThis_1 = {
      graphData: {
        "axisSetting": [],
        "dataColumn": [],
        "distFromLine": [],
        "modelType": "multiType"
      }
    }
    let localThis_2 = {
      graphData: {
        "axisSetting": [],
        "dataColumn": [],
        "distFromLine": [],
        "modelType": "binaryModel"
      }
    }
    let localThis_3 = {
      graphData: {
        "axisSetting": [],
        "dataColumn": [],
        "distFromLine": [],
        "modelType": "regression"
      }
    }

    // // test chartTitle
    // expect(GraphDisplay.computed.chartTitle.call(localThis_1)).toBe('ROC Chart')
    // expect(GraphDisplay.computed.chartTitle.call(localThis_2)).toBe('ROC Chart')
    // expect(GraphDisplay.computed.chartTitle.call(localThis_3)).toBe('Regression Line')

    // // test xAxisLabel
    // expect(GraphDisplay.computed.xAxisLabel.call(localThis_1)).toBe("1 - Specificity (False Positive Rate)")
    // expect(GraphDisplay.computed.xAxisLabel.call(localThis_2)).toBe("1 - Specificity (False Positive Rate)")
    // expect(GraphDisplay.computed.xAxisLabel.call(localThis_3)).toBe("independent variable")


    // //test yAxisLabel
    // expect(GraphDisplay.computed.yAxisLabel.call(localThis_1)).toBe("Sensitivity (True Positive Rate)")
    // expect(GraphDisplay.computed.yAxisLabel.call(localThis_2)).toBe("Sensitivity (True Positive Rate)")
    // expect(GraphDisplay.computed.yAxisLabel.call(localThis_3)).toBe("dependent variable")


    //test AxisYMax
    expect(GraphDisplay.computed.AxisYMax.call(localThis_1)).toBe(1)
    expect(GraphDisplay.computed.AxisYMax.call(localThis_2)).toBe(1)
    expect(GraphDisplay.computed.AxisYMax.call(localThis_3)).toBe(undefined)


    //test AxisYMin
    expect(GraphDisplay.computed.AxisYMin.call(localThis_1)).toBe(0)
    expect(GraphDisplay.computed.AxisYMin.call(localThis_2)).toBe(0)
    expect(GraphDisplay.computed.AxisYMin.call(localThis_3)).toBe(undefined)


    //test tickValue
    expect(GraphDisplay.computed.tickValue.call(localThis_1)).toStrictEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    expect(GraphDisplay.computed.tickValue.call(localThis_2)).toStrictEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    expect(GraphDisplay.computed.tickValue.call(localThis_3)).toBe(undefined)


    //test type
    expect(GraphDisplay.computed.type.call(localThis_1)).toBe(undefined)
    expect(GraphDisplay.computed.type.call(localThis_2)).toBe(undefined)
    expect(GraphDisplay.computed.type.call(localThis_3)).toBe('scatter')

  })

  it('computed "options" is called', () => {
    let options = jest.fn()
    // let handler = jest.fn()
    const wrapper = shallowMount(GraphDisplay, {
      propsData: {
        graphData: {
          axisSetting: [],
          dataColumn: [],
          distFromLine: [],
        }
      },
      computed: {
        options,
        // handler,
      }
    })
    expect(options).toHaveBeenCalled()
    // expect(handler).toHaveBeenCalled()
  })


  it('watch "newThreshold" work', () => {
    let localThis = {
      showAnnotation() {
        return null
      }
    }
    expect(GraphDisplay.watch.newThreshold.call(localThis)).toBe(undefined)
  })


  it('watch "graphData" work', () => {
    let localThis = {
      initData() {
        return null
      },
      handler: {
        $emit(...args) {
          return null
        }
      },
      options: 'foo'
    }
    expect(GraphDisplay.watch.graphData.call(localThis)).toBe(undefined)
  })


  // FIXME: how to test computed->options->tooltip(key)
  it('test Optional tooltip', () => {
    let localThis = {
      tooltip: {
        format: {
          title() {
            return null
          },
          value() {
            return null
          }
        }
      }
    }

    // console.log(GraphDisplay.computed.options())
    expect(GraphDisplay.computed.options.call(localThis)).toBeTruthy

  })

  it('description', () => {
    let localThis = {
      handler: {
        $emit(...args) {
          return null
        }
      }

    }
    GraphDisplay.methods.showAnnotation.call(localThis)


  })


  //  {
  //    padding: {
  //      top: 0
  //    },
  //    title: {
  //      show: false,
  //      text: [Function: chartTitle],
  //      position: 'top-center',
  //      padding: {
  //        top: 20,
  //        right: 0,
  //        bottom: 0,
  //        left: 0
  //      }
  //    },
  //    data: {
  //      size: {
  //        height: 1200,
  //        width: 1200
  //      },
  //      xs: undefined,
  //      columns: undefined,
  //      type: [Function: type],
  //      types: {
  //        line: 'line'
  //      },
  //      colors: {
  //        line: 'orange',
  //        dependent_y_axis: '#00ff00',
  //        precision: '#00ff00',
  //        recall: 'orange',
  //        'ROC curve': 'orange'
  //      }
  //    },
  //    axis: {
  //      x: {
  //        show: true,
  //        tick: [Object],
  //        label: [Object]
  //      },
  //      y: {
  //        show: true,
  //        max: [Function: AxisYMax],
  //        min: [Function: AxisYMin],
  //        tick: [Object],
  //        label: [Object]
  //      }
  //    },
  //    tooltip: {
  //      format: {
  //        title: [Function: title],
  //        value: [Function: value]
  //      },
  //      contents: [Function: contents]
  //    },
  //    point: {
  //      show: false
  //    },
  //    grid: {
  //      x: {
  //        show: false
  //      },
  //      y: {
  //        show: false
  //      }
  //    },
  //    legend: {
  //      show: true,
  //      position: 'right'
  //    }
  //  }



})
