// Component Spec I/O
//
// I/O definition (refer to Edd Yerburgh, Vue Test Utils core member): 
//   input: user input / props / store
//   output: rendered output / Vue event / function call
// 
// EvaluationPanel
//
// Input: 
// none
//
// Output:
// 1. render out the tabs component
// 2. Model Title
// 3. Model Desc


import {
  shallowMount
} from '@vue/test-utils'
import EvaluationPanel from '@/components/EvaluationPanel/EvaluationPanel.vue'
import Tabs from '@/components/EvaluationPanel/TabsInfo/Tabs.vue'


describe('EvaluationPanel.vue', () => {
  it('renders the "tabs" component', () => {
    const wrapper = shallowMount(EvaluationPanel)
    expect(wrapper.find(Tabs).exists()).toBe(true)
  })

  it('renders the key part of the model title', () => {
    const wrapper = shallowMount(EvaluationPanel)
    expect(wrapper.text()).toMatch("Dataset_Model")
  })

  it('renders the key part of the model description', () => {
    const wrapper = shallowMount(EvaluationPanel)
    expect(wrapper.text()).toMatch('The Model evaluation report is created at')
  })
})
