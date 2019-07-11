import {
  mount,
  shallowMount,
} from '@vue/test-utils'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'
import GraphDisplayLineChart from '@/components/EvaluationPanel/InfoDisplay/GraphDisplayLineChart.vue'

describe('GraphDisplay', function () {

  it('shall mount GraphDisplay component', () => {
    let wrapper = shallowMount(GraphDisplay, {
      propsData: {
        graphData: {
          "x": [1, 2, 3, 2, 1],
          "y": [3, 2, 1, 4, 5]
        },
      }
    })
    expect(wrapper.find(GraphDisplayLineChart).exists()).toBe(true)
  })


  it('shall call fillData method', () => {
    let testMethod = jest.fn()
    let wrapper = shallowMount(GraphDisplay, {
      propsData: {
        graphData: {
          "x": [1, 2, 3, 2, 1],
          "y": [3, 2, 1, 4, 5]
        },
        newThreshold: 0.5
      },
      methods: {
        fillData: testMethod
      }
    })
    expect(testMethod).toHaveBeenCalled()

  })

  it('fillData shall be called again when newThreshold value change', () => {
    let testMethod = jest.fn()
    let wrapper = shallowMount(GraphDisplay, {
      propsData: {
        graphData: {
          "x": [1, 2, 3, 2, 1],
          "y": [3, 2, 1, 4, 5]
        },
        newThreshold: 0.2
      },
      methods: {
        fillData: testMethod
      }
    })

    wrapper.setProps({
      newThreshold: 0.3
    })

    //  the first fn called is when vue mounted, the second time will be props changed
    expect(testMethod).toHaveBeenCalledTimes(2)

  })

})
