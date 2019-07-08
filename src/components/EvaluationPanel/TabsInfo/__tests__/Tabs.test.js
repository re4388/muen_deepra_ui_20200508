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
//
// render Tab component
// render MetricsDisplay component
// render GraphDisplay component
// ThresholdAdjustment component
// renders necessay number of Tab
// render <a>'s content
// render <h3>'s content
// 
// received props -> no
//
// function/methods call
// currentView shall render the first tab name
// newThreshold shall render from newThreshold data



import {
  shallowMount
} from '@vue/test-utils'
import Tabs from '@/components/EvaluationPanel/TabsInfo/Tabs.vue'
import Tab from '@/components/EvaluationPanel/TabsInfo/Tab.vue'
import MetricsDisplay from '@/components/EvaluationPanel/InfoDisplay/MetricsDisplay.vue'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'
import ThresholdAdjustment from '@/components/EvaluationPanel/InfoDisplay/ThresholdAdjustment.vue'


describe('Tabs.vue', () => {
  it('renders the "Tab" component', () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find(Tab).exists()).toBe(true)
  })

  it('renders the "MetricsDisplay" component', () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find(MetricsDisplay).exists()).toBe(true)
  })


  it('renders the "GraphDisplay" component', () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find(GraphDisplay).exists()).toBe(true)
  })


  it('renders the "ThresholdAdjustment" component', () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find(ThresholdAdjustment).exists()).toBe(true)
  })

  // the number of Tab could link to backend
  it("renders necessay number of Tab", () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.findAll(Tab).length).toBe(6)
  })

  // assume first tab-name is 'AllTabInfo'
  it("render <a>'s content ", () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find("a").text()).toContain("AllTabInfo")
  })

  // assume first tab-name is 'AllTabInfo'
  it("render <h3>'s content", () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find("h3").text()).toContain("AllTabInfo")
  })

  // assume first tab-name is 'AllTabInfo'
  it('currentView shall render the first tab name', () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find('.currentView').text()).toEqual("AllTabInfo")
  })

  it('newThreshold shall render from newThreshold data', () => {
    const wrapper = shallowMount(Tabs)
    wrapper.setData({
      newThreshold:23
    })
    expect(wrapper.vm.newThreshold).toBe(23)
  })
})


