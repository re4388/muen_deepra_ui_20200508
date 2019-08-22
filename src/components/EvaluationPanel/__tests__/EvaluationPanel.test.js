import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import EvaluationPanel from '@/components/EvaluationPanel/EvaluationPanel.vue'
import Tabs from '@/components/EvaluationPanel/TabsInfo/Tabs.vue'
const localVue = createLocalVue()
localVue.use(VueRouter)




describe('EvaluationPanel.vue', () => {
  it('is a Vue instance', () => {

    // const wrapper = shallowMount(EvaluationPanel)
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('renders the "tabs" component', () => {
    const wrapper = shallowMount(EvaluationPanel)
    expect(wrapper.find(Tabs).exists()).toBe(true)
  })

  it('renders out the data', () => {
    const wrapper = shallowMount(EvaluationPanel, {
      mocks: {
        $route: {
          meta: {
            title: 'mock'
          }
        }
      }
    })
    const wrapper = shallowMount(EvaluationPanel)
    wrapper.setData({
      title: 'here are the title',
      description: 'here are the description'

    })
    expect(wrapper.text()).toContain('here are the title')
    expect(wrapper.text()).toContain('here are the description')
  })
})





// temp code

// "Dataset_Model" shall be a word that alwayes render or this variable will link to backend 
// it('renders the key part of the model title', () => {
//   const wrapper = shallowMount(EvaluationPanel)
//   expect(wrapper.text()).toMatch("Dataset_Model")
// })

// "The Model evaluation report is created at" shall be a word that alwayes render or this variable will link to backend 
// it('renders the key part of the model description', () => {
//   const wrapper = shallowMount(EvaluationPanel)
//   expect(wrapper.text()).toMatch('The Model evaluation report is created at')
// })


///


// it('renders out the description from data description', () => {
//   const wrapper = shallowMount(EvaluationPanel)
//   wrapper.setData({
//     description: 'here are the description'
//   })
// expect(wrapper.text()).toContain('here are the description')
// expect(wrapper.vm.description).toBe('here are the description')
