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



  
  it('component: "tabs" renders properly', () => {
    const wrapper = shallowMount(EvaluationPanel, {
      mocks
    })
    expect(wrapper.find(Tabs).exists()).toBe(true)
  })




  it('data: title render properly', () => {
    const wrapper = shallowMount(EvaluationPanel, {
      mocks
    })
    wrapper.setData({
      title: 'here are the title',
    })
    expect(wrapper.text()).toContain('here are the title')
  })




  // Note: emit and call method, this is more like a test for implementation
  it('communicate: receive the model-data from Tabs and invoke method properly', () => {
    // need to mock a method called and mount with component
    let modelInfo = jest.fn()
    const wrapper = shallowMount(EvaluationPanel, {
      mocks,
      methods: {
        modelInfo
      }
    })
    // find Tabs component and emit 'model-data'
    wrapper.find(Tabs).vm.$emit('model-data')

    // check if the method "modelInfo" is called
    expect(modelInfo).toHaveBeenCalled()

  })




  it('computed: "imageNumber" work properly', () => {
    const wrapper = shallowMount(EvaluationPanel, {
      mocks
    })
    const localThis = {
      modelData: [{
        "graph": {
          "image": 42
        }
      }]
    }
    expect(EvaluationPanel.computed.imageNumber.call(localThis)).toBe(42)
  })




  it('computed: "folderNumber" work properly', () => {
    const localThis = {
      modelData: [{}, {}, {}]
    }
    const onlyOneFdoler = {
      modelData: [{}]
    }
    // the actual computed is return length - 1
    expect(EvaluationPanel.computed.folderNumber.call(localThis)).toBe(2)

    // check when we have only one folder, we set the number to 1
    expect(EvaluationPanel.computed.folderNumber.call(onlyOneFdoler)).toBe(1)
  })

})



