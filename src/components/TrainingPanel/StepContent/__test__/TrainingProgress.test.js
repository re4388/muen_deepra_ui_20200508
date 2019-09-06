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
import TrainingProgress from '../TrainingProgress'

// import extenral api and mock it
import LogFormatter from '@/utils/log_formatter.js'
import trainingService from '@/api/training_service.js'
jest.mock('@/api/training_service.js')
jest.mock('@/utils/log_formatter.js')


describe('TrainingProgress.vue', () => {

  // mock store and its implementation before each test
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Training: {
          namespaced: true,
          state: {},
          getters: {
            isTraining: jest.fn()
          },
          mutations: {},
          actions: {
            toggleIsTraining: jest.fn()
          },
        }
      }
    })
  })



  it('is a Vue instance', () => {
    const wrapper = shallowMount(TrainingProgress, {
      store,
      localVue,
      propsData: {
        content: {
          title: 'test'
        }
      }
    })

    expect(wrapper.isVueInstance).toBeTruthy()
  })



  it('Methods: checkContent work properly', () => {
    const localThis = {
      isTraining: false,
      unlockStage: jest.fn(),
      setCompletedStageIndex: jest.fn(),
      content: {
        id: 42
      }
    }
    expect(TrainingProgress.methods.checkContent.call(localThis)).toBeTruthy



  })





  it('methods: setProgressRange work properly', () => {
    let progressValueMin, progressValueMax
    const localThis = {
      progressValueMin: 0,
      progressValueMax: 0
    }
    expect(TrainingProgress.methods.setProgressRange.call(localThis, 10, 20)).toBeTruthy
  })


  it('methods: startTraining work properly', () => {
    const handlerProgress = jest.fn()
    const handlerEnd = jest.fn()
    const finishTraining = jest.fn()
    const isTraining = false
    const toggleIsTraining = jest.fn()
    const $store = {
      getters: 'Project/currentProject'
    }

    const localThis = {
      isTraining,
      handlerProgress,
      handlerEnd,
      toggleIsTraining,
      $store
    }
    // console.log(TrainingProgress.methods.startTraining.handlerEnd)
    expect(TrainingProgress.methods.startTraining.call(localThis)).toBeTruthy
  })



  it('methods: updateProgressBar(val) work properly', () => {

    const val = 2
    const localThis = {
      progressValueMax: 1
    }
    expect(TrainingProgress.methods.updateProgressBar.call(localThis, val)).toBeTruthy

    const val2 = 3
    const localThis2 = {
      progressValueMax: 4
    }
    expect(TrainingProgress.methods.updateProgressBar.call(localThis2, val2)).toBeTruthy
    // console.log(TrainingProgress.data())
    // expect(TrainingProgress.vm.progressValue).toBe(undefined)
  })


  it('methods: finishTraining work properly', () => {

    const toggleIsTraining = jest.fn()
    const $store = {
      getters: 'Project/currentProject'
    }
    const $emit = jest.fn()

    const localThis = {
      toggleIsTraining,
      $store,
      $emit
    }

    expect(TrainingProgress.methods.finishTraining.call(localThis)).toBeTruthy
  })




})
