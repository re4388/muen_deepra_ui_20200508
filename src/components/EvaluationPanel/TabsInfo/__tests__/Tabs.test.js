// Test GuideLines
// Input: user input, props received
// Output: render out any key part of html / child component? function invocation? / Vue event?


////////////////////////////////////////////////////////////////////////////////////////////

// HTML render parts

// 1. render <a>
// 2. render <h3>
// 3. render Tab component
// 4. render MetricsDisplay component
// 5. render GraphDisplay component
// 6. ThresholdAdjustment component
// 7. renders necessay number of Tab
// 

// received props -> no

// function/methods call

// getView() -> shall get the tab name to view-switch -> internal implement, no render -> no test needed
// @click.prevent="changeView(tab) -> shall receive an object and return a new view(String) to currentView
// ThresholdChange -> shall receive an obj and assign a number to newThreshold -> internal implement
// -> instead I think we need to test newThreshold, which will be rendered out




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

  it("render <a> ", () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find("a").exists()).toBe(true)
  })

  // h3 tag shall be style fixed
  it("render <h3> ", () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find("h3").exists()).toBe(true)
  })

  // first tab-name is 'AllTabInfo'
  it('currentView shall render the first tab name', () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find('.currentView').text()).toEqual("AllTabInfo")
  })

  // init newThreshold shall be ""
  it('newThreshold shall render', () => {
    const wrapper = shallowMount(Tabs)
    expect(wrapper.find('.newThreshold').text()).toEqual('')
  })

})

