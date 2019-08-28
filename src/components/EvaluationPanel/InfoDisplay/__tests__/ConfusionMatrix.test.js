import {
  mount,
  shallowMount,
  createLocalVue,
} from '@vue/test-utils'
import ConfusionMatrix from '@/components/EvaluationPanel/InfoDisplay/ConfusionMatrix.vue'

import * as d3 from "d3";
const localVue = createLocalVue()
localVue.use(d3)




describe('ConfusionMatrix.vue', () => {

  it('is a Vue instance', () => {
    const wrapper = shallowMount(ConfusionMatrix, {
      propsData: {
        data: {
          confusionMatrix: [],
          confusionMatrixAnnotation: [],
          confusionMatrixLable: [],
          labelsNum: 10,
          thresholdValue: null
        }
      },
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })


  it('"data": width, height and margin render propely  ', () => {
    const wrapper = shallowMount(ConfusionMatrix, {
      propsData: {
        data: {
          confusionMatrix: [],
          confusionMatrixAnnotation: [],
          confusionMatrixLable: [],
          labelsNum: 10,
          thresholdValue: null
        }
      },
    })

    wrapper.setData({
      width: 10,
      height: 10,
      margin: {
        left: 1,
        right: 1,
        top: 2,
        bottom: 2
      },
    })

    // < svg
    //   : width = "`${width + margin.left + margin.right}`"
    //   : height = "`${height + margin.top + margin.bottom}`" >
    expect(wrapper.find('svg').attributes().width === '12').toBe(true)
    expect(wrapper.find('svg').attributes().height === '14').toBe(true)
  })




  it('when component mounted, "init" method has been called', () => {
    let init = jest.fn()
    const wrapper = shallowMount(ConfusionMatrix, {
      propsData: {
        data: {
          confusionMatrix: [],
          confusionMatrixAnnotation: [],
          confusionMatrixLable: [],
          labelsNum: 10,
          thresholdValue: null
        }
      },
      methods: {
        init,
      }
    })
    expect(init).toHaveBeenCalled()
  })


  it('methods"init" work properly', () => {
    let localThis = {
      data: {
        confusionMatrix: [1, 2, 3],
        confusionMatrixAnnotation: [1, 2, 3],
        confusionMatrixLable: [1, 2, 3]
      }
    }
    expect(ConfusionMatrix.methods.init.call(localThis)).toBe(undefined)
  })


  it('text color render correctly -> white', () => {
    let maxValue = jest.fn().mockReturnValueOnce(10)
    const wrapper = shallowMount(ConfusionMatrix, {
      propsData: {
        data: {
          confusionMatrix: [
            [5, null],
            [null, null]
          ],
          confusionMatrixAnnotation: [],
          confusionMatrixLable: [],
          labelsNum: 10,
          thresholdValue: null
        }
      },
      computed: {
        maxValue,
      }
    })

    // :fill="( num >= maxValue / 2) ? 'white' : 'black'"

    expect(wrapper.find('text').attributes().fill === "white").toBe(true)
  })


  // just lower the matrix entry by 1, then we shall have black 
  it('text color render correctly ->black', () => {
    let maxValue = jest.fn().mockReturnValueOnce(10)
    const wrapper = shallowMount(ConfusionMatrix, {
      propsData: {
        data: {
          confusionMatrix: [
            [4, null],
            [null, null]
          ],
          confusionMatrixAnnotation: [],
          confusionMatrixLable: [],
          labelsNum: 10,
          thresholdValue: null
        }
      },
      computed: {
        maxValue,
      }
    })

    // :fill="( num >= maxValue / 2) ? 'white' : 'black'"

    expect(wrapper.find('text').attributes().fill === "black").toBe(true)
  })





  // colorMap() {
  //   return d3
  //     .scaleLinear()
  //     .domain([this.minValue, this.maxValue])
  //     .range([this.startColor, this.endColor]);
  // },
  // FIXME: don't know why undefined
  it('computed: colorMap work properly', () => {
    let maxValue = jest.fn().mockReturnValueOnce(10)
    let minValue = jest.fn().mockReturnValueOnce(10)
    const wrapper = shallowMount(ConfusionMatrix, {
      propsData: {
        data: {
          confusionMatrix: [[2,2],[2,2]],
          confusionMatrixAnnotation: [],
          confusionMatrixLable: [],
        },
        computed: {
          maxValue,
          minValue,
        }
      }
    })

    wrapper.setData({
      startColor: "#ffffff",
      endColor: "#e67e22",
    })

    // expect(wrapper.find('g').attributes().fill).toBe('100')

  })




  it('computed: numrows work properly', () => {

    let localThis = {
      confusionMatrix: [
        [4, 4],
        [4, 4]
      ],
      maxValue: 10,
      startColor: 10,
      endColor: 10,
    }

    expect(ConfusionMatrix.computed.numrows.call(localThis)).toBe(2)

  })

  it('computed: numcols work properly', () => {

    let localThis = {
      confusionMatrix: [
        [4, 4],
        [4, 4]
      ],
      maxValue: 10,
      startColor: 10,
      endColor: 10,
    }

    expect(ConfusionMatrix.computed.numcols.call(localThis)).toBe(2)
  })



  it('xBandwidth, yBandwidth render out correctly', () => {
    // let maxValue = jest.fn().mockReturnValueOnce(10)

    const wrapper = shallowMount(ConfusionMatrix, {
      propsData: {
        data: {
          confusionMatrix: [],
          confusionMatrixAnnotation: [],
          confusionMatrixLable: [],
        }
      }
    })

    wrapper.setData({
      width: 100,
      height: 100
    })

    expect(wrapper.find('rect').attributes().width).toBe('100')
    expect(wrapper.find('rect').attributes().height).toBe('100')
  })





})
