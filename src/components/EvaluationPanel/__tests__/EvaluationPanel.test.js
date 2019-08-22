import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(VueRouter)



import EvaluationPanel from '@/components/EvaluationPanel/EvaluationPanel.vue'
import Tabs from '@/components/EvaluationPanel/TabsInfo/Tabs.vue'



describe('EvaluationPanel.vue', () => {

  let mocks;

  beforeEach(() => {
    mocks = {
      $route: {
        meta: {
          title: 'mock'
        }
      }
    }
  })


  it('is a Vue instance', () => {
    const wrapper = shallowMount(EvaluationPanel, {
      mocks
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('renders the "tabs" component', () => {
    const wrapper = shallowMount(EvaluationPanel, {
      mocks
    })
    expect(wrapper.find(Tabs).exists()).toBe(true)
  })

  it('shall renders title', () => {
    const wrapper = shallowMount(EvaluationPanel, {
      mocks
    })
    wrapper.setData({
      title: 'here are the title',
    })
    expect(wrapper.text()).toContain('here are the title')
  })


  it('shall receive the passed obj', () => {

    // need to mock a method called and mount with component
    let modelInfo = jest.fn()
    const wrapper = shallowMount(EvaluationPanel, {
      mocks,
      methods:{
        modelInfo
      }
    })

    // find Tabs component and emit 'model-data'
    wrapper.find(Tabs).vm.$emit('model-data')

    // check if the method "modelInfo" is called
    expect(modelInfo).toHaveBeenCalled()

  })

  it('description', () => {

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
