// Input: 
// none
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

  // "Dataset_Model" shall be a word that alwayes render or this variable will link to backend 
  it('renders the key part of the model title', () => {
    const wrapper = shallowMount(EvaluationPanel)
    expect(wrapper.text()).toMatch("Dataset_Model")
  })

  // "The Model evaluation report is created at" shall be a word that alwayes render or this variable will link to backend 
  it('renders the key part of the model description', () => {
    const wrapper = shallowMount(EvaluationPanel)
    expect(wrapper.text()).toMatch('The Model evaluation report is created at')
  })
})
