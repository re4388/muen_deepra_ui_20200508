import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
// let localVue = createLocalVue()
// import * as d3 from "d3";
// import VueC3 from "vue-c3";
// localVue.use(VueC3)
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



  //FIXME: don't know how to deal with this.handler.$emit
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


  // FIXME: don't know how to test this.handler.$emit
  it('methods: "showAnnotation" work properly', () => {
    // let handler = jest.fn().mockReturnThis()
    // let $emit = jest.fn()
    // let localThis = {
    //   handler,
    //   $emit
    // }
    // wrapper.vm.handler.$emit('dispatch')
    // expect(wrapper.emitted().dispatch).toBeTruthy()
    // console.log(GraphDisplay.methods.showAnnotation)
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

    // test chartTitle
    expect(GraphDisplay.computed.chartTitle.call(localThis_1)).toBe('ROC Chart')
    expect(GraphDisplay.computed.chartTitle.call(localThis_2)).toBe('ROC Chart')
    expect(GraphDisplay.computed.chartTitle.call(localThis_3)).toBe('Regression Line')

    // test xAxisLabel
    expect(GraphDisplay.computed.xAxisLabel.call(localThis_1)).toBe("1 - Specificity (False Positive Rate)")
    expect(GraphDisplay.computed.xAxisLabel.call(localThis_2)).toBe("1 - Specificity (False Positive Rate)")
    expect(GraphDisplay.computed.xAxisLabel.call(localThis_3)).toBe("independent variable")


    //test yAxisLabel
    expect(GraphDisplay.computed.yAxisLabel.call(localThis_1)).toBe("Sensitivity (True Positive Rate)")
    expect(GraphDisplay.computed.yAxisLabel.call(localThis_2)).toBe("Sensitivity (True Positive Rate)")
    expect(GraphDisplay.computed.yAxisLabel.call(localThis_3)).toBe("dependent variable")


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

  // FIXME: mutating the props cause console.error..
  // how to change passed different props and test watch?
  it('watch "newThreshold"', () => {
    let showAnnotation = jest.fn()
    const wrapper = shallowMount(GraphDisplay, {
      propsData: {
        graphData: {
          axisSetting: [],
          dataColumn: [],
          distFromLine: [],
        },
        newThreshold: 23
      },
      methods: {
        showAnnotation,
      }
    })
    // when
    // wrapper.setData({
    //   newThreshold: 24
    // });
    // wrapper.vm.newThreshold = 24
    //then

    // expect(showAnnotation).toHaveBeenCalled()


  })

  // FIXME: 1. don't know how to chnage the graphDATA, 
  // 2. initData called only in mounted
  it('watch "graphData"', () => {
    let initData = jest.fn()
    const wrapper = shallowMount(GraphDisplay, {
      propsData: {
        graphData: {
          axisSetting: [0, 1, 2],
          dataColumn: [],
          distFromLine: [],
        },
      },
      methods: {
        initData,
      }
    })
    // when
    wrapper.setData({
      graphData: {
        axisSetting: [1, 2, 3],
        dataColumn: [],
        distFromLine: [],
      },
    });
    //then
    // shall be 2 or need to test in another way
    expect(initData).toHaveBeenCalledTimes(1)

  })


  // FIXME: how to test computed->options->tooltip(key)
  // it('test Optional tooltip', () => {
  //   // const wrapper = shallowMount(GraphDisplay, {
  //   //   propsData: {
  //   //     graphData: {
  //   //       axisSetting: [0, 1, 2],
  //   //       dataColumn: [],
  //   //       distFromLine: [],
  //   //     },
  //   //   },
  //   //   methods: {
  //   //     // initData,
  //   //   }
  //   // })

  //   console.log(GraphDisplay.find('table'))

  // })






})
