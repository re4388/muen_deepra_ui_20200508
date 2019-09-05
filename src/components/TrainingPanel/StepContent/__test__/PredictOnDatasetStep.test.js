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
import PredictOnDatasetStep from '../PredictOnDatasetStep'

// import external api and mock it
import validationService from '@/api/validation_service.js'
jest.mock('@/api/validation_service.js')

// import external helper and mock it
import label_converter from '@/utils/label_converter.js'
jest.mock('@/utils/label_converter.js')


describe('PredictOnDatasetStep.vue', () => {

  // mock store and its implementation before each test
  let storeOptions
  let store

  beforeEach(() => {
    storeOptions = {
      modules: {
        Validation: {
          namespaced: true,
          state: {},
          getters: {
            isValidating: jest.fn()
          },
          mutations: {},
          actions: {
            setOrderedFileList: jest.fn(() => Promise.resolve()),
            toggleIsValidating: jest.fn(() => Promise.resolve())
          },
        },
        Testing: {
          namespaced: true,
          state: {},
          getters: {},
          mutations: {},
          actions: {
            setPredictedLabels: jest.fn(() => Promise.resolve())
          },
        },
        Training: {
          namespaced: true,
          state: {},
          getters: {},
          mutations: {},
          actions: {
            unlockStage: jest.fn(() => Promise.resolve()),
            setCompletedStageIndex: jest.fn(() => Promise.resolve())
          },
        }
      }
    }
    // reassign for each test to avoid pollute from test to test
    store = new Vuex.Store(storeOptions)
  })


  it('is a Vue instance', () => {
    const wrapper = shallowMount(PredictOnDatasetStep, {
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
    expect(PredictOnDatasetStep.methods.setProgressRange.call(localThis, 10, 20)).toBeTruthy
  })


  it('methods: updateProgressBar(val) work properly', () => {

    const val = 2
    const localThis = {
      progressValueMax: 1
    }
    expect(PredictOnDatasetStep.methods.updateProgressBar.call(localThis, val)).toBeTruthy

    const val2 = 3
    const localThis2 = {
      progressValueMax: 4
    }
    expect(PredictOnDatasetStep.methods.updateProgressBar.call(localThis2, val2)).toBeTruthy
  })

  it('methods: finishValidation  work properly', () => {

    const toggleIsValidating = jest.fn()
    const $store = {
      getters: 'Project/currentProject',
      dispatch: 'Testing/setPredictedLabels'
    }

    

    const $emit = jest.fn()
    const labelConverter = {
      convertAll: jest.fn()
    }

    const localThis = {
      toggleIsValidating,
      $store,
      $emit,
      labelConverter,

    }

    expect(PredictOnDatasetStep.methods.finishValidation.call(localThis)).toBeTruthy
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
    expect(PredictOnDatasetStep.methods.checkContent.call(localThis)).toBeTruthy

  })

  // FIXME: how to test .$store.dispatch('Testing/setPredictedLabels' and other dispatch
  it('store.dispatch', () => {

  })


})
