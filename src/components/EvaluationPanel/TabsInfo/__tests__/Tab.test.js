// GuideLines
// 
// Input: 
// user input
// props received
// 
// Output: 
// render out any key part of html 
// child component? 
// function invocation? 
// Vue event?
//
/////////////////////////////////////////////////////////////
//
// Output: HTML render parts
// when name === currentView
// render out the tab
//  
// received props ->
//  1.name
//  2.currentView
// 
// 3.function/methods call
//  no


import {
  shallowMount,
  mount
} from '@vue/test-utils'
import Tab from '@/components/EvaluationPanel/TabsInfo/Tab.vue'
import MetricsDisplay from '@/components/EvaluationPanel/InfoDisplay/MetricsDisplay.vue'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'
import ThresholdAdjustment from '@/components/EvaluationPanel/InfoDisplay/ThresholdAdjustment.vue'

describe('Tab.vue', () => {
  it('renders tab component when "name" is equal to "currentTab"', () => {
    const wrapper = shallowMount(Tab, {
      propsData: {
        name: 'all class',
        currentTab: 'all class'
      }
    })
    expect(wrapper.find('.tab').exists()).toBe(true)
  })

  it('will not render tab when v-if return false', () => {
    const wrapper = shallowMount(Tab, {
      propsData: {
        name: 'AllTabInfo',
        currentView: ' not AllTabInfo'
      }
    })
    expect(wrapper.find('.tab').exists()).toBe(false)
  })

  it("will render slot correctly", () => {
    const wrapper = shallowMount(Tab, {
      slots: {
        default: MetricsDisplay
      }
    })
    expect(wrapper.find("table").text()).toContain("Sensitivity")
  })
})
