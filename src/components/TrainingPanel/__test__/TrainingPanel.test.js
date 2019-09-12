import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
const localVue = createLocalVue()


// use EventBus locally
import Vue from 'vue'
const EventBus = new Vue();
const GlobalPlugins = {
  install(vue) {
    // Event bus
    vue.prototype.$bus = EventBus;
  },
};

// create a local instance of the global bus
localVue.use(GlobalPlugins);

import Vuex from 'vuex'
// import VueRouter from 'vue-router'

localVue.use(Vuex)
// localVue.use(VueRouter)


// import VueRouter from 'vue-router'
// const localVue = createLocalVue()
// localVue.use(VueRouter)

import TrainingPanel from '../TrainingPanel'
import ResourcesCheckStep from '../StepContent/ResourcesCheckStep.vue'
import TrainingProgress from '../StepContent/TrainingProgress.vue'
import ValidationStep from '../StepContent/ValidationStep.vue'
import PredictOnDatasetStep from '../StepContent/PredictOnDatasetStep.vue'
import StepPipeline from '@/components/Pipeline/StepPipeline.vue'

describe('TrainingPanel.vue', () => {

  // mock store and route
  let store, storeOptions, mocks

  beforeEach(() => {
    mocks = {
      $route: {
        meta: {
          title: 'mock'
        }
      }
    }
    storeOptions = {
      modules: {
        Project: {
          namespaced: true,
          state: {},
          mutations: {},
          actions: {},
          getters: {
            currentProject: jest.fn()
          }
        },
        Training: {
          namespaced: true,
          state: {},
          mutations: {},
          actions: {
            resetStageLock: jest.fn(() => Promise.resolve()),
            resetAllState: jest.fn(() => Promise.resolve()),
          },
          getters: {
            isCurrentStageLocked: jest.fn(),
            isTraining: jest.fn(),

          }
        },
      }
    }
    // reassign for each test to avoid pollute from test to test
    store = new Vuex.Store(storeOptions)
  })


  it('is a Vue instance', () => {
    const wrapper = shallowMount(TrainingPanel, {
      mocks,
      store,
      localVue,
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('methods: initializeComponent work properly', () => {

    let $store
    let localThis = {
      $store: {
        dispatch(...arg) {
          return null
        }
      }
    }
    expect(TrainingPanel.methods.initializeComponent.call(localThis)).toBeTruthy
  })


  it('methods: progressToNextStep work properly', () => {

    let call = {
      then: jest.fn(() => 42)
    }

    let $refs = {
      stepContent: {
        checkContent() {
          return call
        }
      }
    }

    let isCurrentStageLocked = false;
    let currentStep = 0
    let stepContent = [1, 2, 3]
    let resetStageLock = jest.fn(() => Promise.resolve())

    let localThis = {
      $refs,
      call,
      isCurrentStageLocked,
      currentStep
    }

    expect(TrainingPanel.methods.progressToNextStep.call(localThis)).toBeTruthy

  })


  it('methods: toggleBtnFlowControl work properly', () => {
    const wrapper = shallowMount(TrainingPanel, {
      mocks,
      store,
      localVue,
      attachToDocument: true
    })
    wrapper.vm.toggleBtnFlowControl()
    let style = wrapper.find('div.content').attributes('style')
    expect(style).toBe('background-color: rgba(0, 150, 150, 0.75);')

  })





  it('Button show "Next" and "Done" correctly', () => {
    let iSButtonDone = jest.fn(() => true)
    const wrapper = shallowMount(TrainingPanel, {
      mocks,
      store,
      localVue,
      methods: {
        iSButtonDone
      }
    })

    expect(wrapper.find('.btn-flow-control').text()).toContain('Done')


    iSButtonDone = jest.fn(() => false)
    const wrapper2 = shallowMount(TrainingPanel, {
      mocks,
      store,
      localVue,
      methods: {
        iSButtonDone
      }
    })

    expect(wrapper2.find('.btn-flow-control').text()).toContain('Next')

  })

  it('Button show "Stop" during training', () => {
    let onTraining = jest.fn(() => true)
    const wrapper = shallowMount(TrainingPanel, {
      mocks,
      store,
      localVue,
      methods: {
        onTraining
      }
    })

    expect(wrapper.find('#btn-stop-training').text()).toContain('Stop')

  })

  // wrapper.find(componentname).vm.$emit('event')
  it('call updateStep when receive onStepChanged event', () => {
    let updateStep = jest.fn()
    const wrapper = shallowMount(TrainingPanel, {
      mocks,
      store,
      localVue,
      methods: {
        updateStep
      }
    })
    // console.log(wrapper.find(StepPipeline).vm)
    // console.log(wrapper.html())
    wrapper.find(StepPipeline).vm.$emit('onStepChanged')
    expect(updateStep).toHaveBeenCalled()

  })

  it('component-is in-place', () => {
    const wrapper = shallowMount(TrainingPanel, {
      mocks,
      store,
      localVue,
    })
    expect(wrapper.find(TrainingProgress)).toEqual({
      "selector": "Component"
    });
    expect(wrapper.find(ValidationStep)).toEqual({
      "selector": "Component"
    });
    expect(wrapper.find(PredictOnDatasetStep)).toEqual({
      "selector": "Component"
    });
    expect(wrapper.find(PredictOnDatasetStep)).toEqual({
      "selector": "Component"
    });
  })


  //TODO: call toggleBtnFlowControl when receive onProgressFinished event
  // don't know how to do..since I can't access the component 



})
