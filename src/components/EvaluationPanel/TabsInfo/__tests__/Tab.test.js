import {
  shallowMount,
  mount
} from '@vue/test-utils'
import Tab from '@/components/EvaluationPanel/TabsInfo/Tab.vue'
import MetricsDisplay from '@/components/EvaluationPanel/InfoDisplay/MetricsDisplay.vue'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'
import ThresholdAdjustment from '@/components/EvaluationPanel/InfoDisplay/ThresholdAdjustment.vue'

describe('Tab.vue', () => {
  it('component: renders "tab" when "name" is equal to "currentTab"', () => {
    const wrapper = shallowMount(Tab, {
      propsData: {
        name: 'all class',
        currentTab: 'all class'
      }
    })
    expect(wrapper.find('.tab').exists()).toBe(true)
  })

  it('component: not render "tab" when "name" is not equal to "currentTab"', () => {
    const wrapper = shallowMount(Tab, {
      propsData: {
        name: 'all class',
        currentTab: ' not all class'
      }
    })
    expect(wrapper.find('.tab').exists()).toBe(false)
  })

  it("component: slot works correctly", () => {
    const wrapper = shallowMount(Tab, {
      slots: {
        default: MetricsDisplay
      }
    })
    expect(wrapper.find("table").text()).toContain("Sensitivity")
  })

  it("computed: 'activeClass' works correctly when currentTab is 'all class'", () => {
    let activeClass = jest.fn()
    const wrapper = shallowMount(Tab, {
      propsData: {
        name: 'all class',
        currentTab: 'all class'
      },
      computed:{
        activeClass
      }
    })
    expect(wrapper.contains('col-sm-12'))
  })

  it("computed: 'activeClass' works correctly when currentTab is not 'all class'", () => {
    let activeClass = jest.fn()
    const wrapper = shallowMount(Tab, {
      propsData: {
        name: 'all class',
        currentTab: ' not all class'
      },
      computed: {
        activeClass
      }
    })
    expect(wrapper.contains('col-sm-8'))
  })


})
