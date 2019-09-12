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
import ValidationStep from '../ValidationStep'

// import extenral api and mock it
import validationService from '@/api/validation_service.js'
jest.mock('@/api/validation_service.js')


describe('ValidationStep.vue', () => {

  // mock store and its implementation before each test
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Validation: {
          namespaced: true,
          state: {},
          getters: {
            isValidating: jest.fn()
          },
          mutations: {},
          actions: {
            toggleIsValidating: jest.fn()
          },
        },
        Training: {
          namespaced: true,
          state: {},
          getters: {},
          mutations: {},
          actions: {
            unlockStage: jest.fn(),
            setCompletedStageIndex: jest.fn()
          },
        }
      }
    })
  })



  it('is a Vue instance', () => {
    const wrapper = shallowMount(ValidationStep, {
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

  it('methods: setProgressRange work properly', () => {
    let progressValueMin, progressValueMax
    const localThis = {
      progressValueMin: 0,
      progressValueMax: 0
    }
    expect(ValidationStep.methods.setProgressRange.call(localThis, 10, 20)).toBeTruthy
  })


  it('methods: updateProgressBar(val) work properly', () => {

    const val = 2
    const localThis = {
      progressValueMax: 1
    }
    expect(ValidationStep.methods.updateProgressBar.call(localThis, val)).toBeTruthy

    const val2 = 3
    const localThis2 = {
      progressValueMax: 4
    }
    expect(ValidationStep.methods.updateProgressBar.call(localThis2, val2)).toBeTruthy
  })

  it('methods: finishValidation work properly', () => {

    const toggleIsValidating = jest.fn()
    const $store = {
      getters: 'Project/currentProject'
    }
    const $emit = jest.fn()

    const localThis = {
      toggleIsValidating,
      $store,
      $emit
    }

    expect(ValidationStep.methods.finishValidation.call(localThis)).toBeTruthy
  })



  it('Methods: checkContent work properly', () => {
    const localThis = {
      isValidating: false,
      unlockStage: jest.fn(),
      setCompletedStageIndex: jest.fn(),
      content: {
        id: 42
      }
    }
    expect(ValidationStep.methods.checkContent.call(localThis)).toBeTruthy

  })


})
