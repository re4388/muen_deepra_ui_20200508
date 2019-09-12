import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Vuex from 'vuex'

// use flushPromise to wait async code to complete during test
import flushPromises from 'flush-promises'

// use local vue to avoid vue base free to pollute
const localVue = createLocalVue()
localVue.use(Vuex)

// import test file
import ResourcesCheckStep from '../ResourcesCheckStep'

// import extenral api and mock it
import resourceMonitor from '@/api/resource_monitor.js'
jest.mock('@/api/resource_monitor.js')


describe('ResourcesCheckStep.vue', () => {

  // mock whole store before each test
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {}
    })
  })


  it('call resourceMonitor and its methods properly', async () => {
    // mount component with  mocked store, local vue and props
    const wrapper = shallowMount(ResourcesCheckStep, {
      store,
      localVue,
      propsData: {
        content: {
          title: 'test'
        }
      }
    })

    // overwrite imported mock module
    resourceMonitor.getDiskUsage.mockImplementation(() =>
      Promise.resolve({
        free: {
          'toFixed': 'foo1'
        }
      })
    );

    resourceMonitor.getMemoryUsage.mockImplementation(() =>
      Promise.resolve({
        free: {
          'toFixed': 'foo2'
        }
      })
    );

    resourceMonitor.getGPUMemoryUsage.mockImplementation(() =>
      Promise.resolve({
        free: {
          'toFixed': 'foo3'
        }
      })
    );


    // call function
    const images = await resourceMonitor.getDiskUsage();
    expect(images).toEqual({
      free: {
        toFixed: 'foo1'
      }
    })

    const images2 = await resourceMonitor.getMemoryUsage();
    expect(images2).toEqual({
      free: {
        toFixed: 'foo2'
      }
    })

    const images3 = await resourceMonitor.getGPUMemoryUsage();
    expect(images3).toEqual({
      free: {
        toFixed: 'foo3'
      }
    })

    // Another way to test, omit since the above testing shall be enough
    // const eventSpy = jest.spyOn(resourceMonitor, 'getDiskUsage')
    // expect(eventSpy).toHaveBeenCalled();
    // expect(eventSpy).toHaveBeenCalledTimes(2);
  })

  it('is a Vue instance', async () => {
    const wrapper = shallowMount(ResourcesCheckStep, {
      store,
      localVue,
      propsData: {
        content: {
          title: 'test'
        }
      }
    })

    await flushPromises()
    expect(wrapper.isVueInstance).toBeTruthy()
  })


  it('Methods: checkContent work properly', () => {
    const localThis = {
      unlockStage: jest.fn(),
      setCompletedStageIndex: jest.fn(),
      content: {
        id: 42
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
      freeMemory: "300",
      freeGPUMemory: '500'
    })
    expect(wrapper.find(".resource-disk-space").text()).toBe('Available disk space: 100 MB')
    expect(wrapper.find(".resource-memory").text()).toBe('Available memory: 300 MB')
    expect(wrapper.find(".resource-gpu-memory").text()).toBe('Available GPU memory: 500 MB')
  })

})
