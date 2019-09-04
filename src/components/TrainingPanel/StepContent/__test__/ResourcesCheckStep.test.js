import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)


import ResourcesCheckStep from '../ResourcesCheckStep'

import resourceMonitor from '@/api/resource_monitor.js'
import {local} from 'd3-selection';
jest.mock('@/api/resource_monitor.js');

describe('ResourcesCheckStep.vue', () => {

  // mock store
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {}
    })
  })

  it('is a Vue instance', done => {
    const wrapper = shallowMount(ResourcesCheckStep, {
      store,
      localVue,
      propsData: {
        content: {
          title: 'test'
        }
      }
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.isVueInstance).toBeTruthy()
      done()
    })
  })


  it('Methods: checkContent work properly', () => {
    const localThis = {
      unlockStage:jest.fn(),
      setCompletedStageIndex:jest.fn(),
      content:{
        id:42      
      }

    }
    expect(ResourcesCheckStep.methods.checkContent.call(localThis)).toBeTruthy
  })


  it('HTML output: render diskspace, memory and gpu memory', () => {
    const wrapper = shallowMount(ResourcesCheckStep, {
      store,
      localVue,
      propsData: {
        content: {
          title: 'test'
        }
      }
    })
    wrapper.setData({
      freeDiskSpace: '100',
      freeMemory:"300",
      freeGPUMemory:'500'
    })
    expect(wrapper.find(".resource-disk-space").text()).toBe('Available disk space: 100 MB')
    expect(wrapper.find(".resource-memory").text()).toBe('Available memory: 300 MB')
    expect(wrapper.find(".resource-gpu-memory").text()).toBe('Available GPU memory: 500 MB')

    
  })

})


