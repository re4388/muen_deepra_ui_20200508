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


// import test utils and external module
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'

import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)


// import component
import Tabs from '@/components/EvaluationPanel/TabsInfo/Tabs.vue'
import Tab from '@/components/EvaluationPanel/TabsInfo/Tab.vue'
import MetricsDisplay from '@/components/EvaluationPanel/InfoDisplay/MetricsDisplay.vue'
import GraphDisplay from '@/components/EvaluationPanel/InfoDisplay/GraphDisplay.vue'
import ThresholdAdjustment from '@/components/EvaluationPanel/InfoDisplay/ThresholdAdjustment.vue'
import ConfusionMatrix from '@/components/EvaluationPanel/InfoDisplay/ConfusionMatrix.vue'







describe('Tabs.vue', () => {

    let store;

    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          validation: {
            state: {},
            mutations:{},
            actions: {},
            getters: {
              myFunc: jest.fn()
            }
          },
        }
      })
    })



  // it('renders the "Tab" component', () => {
  //   const wrapper = shallowMount(Tabs, {
  //     store,
  //     localVue
  //   })
  //   expect(wrapper.find(Tab).exists()).toBe(true)
  // })




  // it('renders the "ThresholdAdjustment" component', () => {
  //   const wrapper = shallowMount(Tabs, {store, localVue})
  //   expect(wrapper.find(ThresholdAdjustment).exists()).toBe(true)
  // })


  // it('renders the "MetricsDisplay" component', () => {
  //   const wrapper = shallowMount(Tabs)
  //   expect(wrapper.find(MetricsDisplay).exists()).toBe(true)
  // })


  // it('renders the "GraphDisplay" component', () => {
  //   const wrapper = shallowMount(Tabs)
  //   expect(wrapper.find(GraphDisplay).exists()).toBe(true)
  // })




  // it("renders necessay number of Tab", () => {
  //   const wrapper = shallowMount(Tabs)
  //   let num_of_views = wrapper.vm._data.views.length
  //   expect(wrapper.findAll(Tab).length).toBe(num_of_views)
  // })

  // it("render correct <a>'s content ", () => {
  //   const wrapper = shallowMount(Tabs)
  //   let first_views_name = wrapper.vm._data.views[0]
  //   expect(wrapper.find("a").text()).toContain(first_views_name)
  // })

  // it("render correct <h3>'s content", () => {
  //   const wrapper = shallowMount(Tabs)
  //   let first_views_name = wrapper.vm._data.views[0]
  //   expect(wrapper.find("h3").text()).toContain(first_views_name)
  // })

  // it('currentView shall render the first tab name', () => {
  //   const wrapper = shallowMount(Tabs)
  //   let first_tab_name = wrapper.vm._data.views[0]
  //   expect(wrapper.find('.currentView').text()).toEqual(first_tab_name)
  // })

  // it('newThreshold shall render from newThreshold data', () => {
  //   const wrapper = shallowMount(Tabs)
  //   wrapper.setData({
  //     newThreshold: 23
  //   })
  //   expect(wrapper.vm.newThreshold).toBe(23)
  // })

  // it('shall call changeView() when click the <a> tag', () => {
  //   const spy = jest.spyOn(Tabs.methods, "changeView")
  //   const wrapper = shallowMount(Tabs)
  //   wrapper.find('a').trigger('click');
  //   expect(spy).toHaveBeenCalled()
  // })

  // it('shall call testMethod when event emitted from ThresholdAdjustment', () => {
  //   let testMethod = jest.fn()
  //   const wrapper = shallowMount(Tabs, {
  //     methods: {
  //       ThresholdChange: testMethod
  //     }
  //   })
  //   wrapper.find(ThresholdAdjustment).vm.$emit('threshold-change');
  //   expect(testMethod).toHaveBeenCalledTimes(1)
  // })


})
