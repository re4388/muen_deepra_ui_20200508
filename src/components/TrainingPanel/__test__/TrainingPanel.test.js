import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'

import Vuex from 'vuex'
// import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
// localVue.use(VueRouter)


// import VueRouter from 'vue-router'
// const localVue = createLocalVue()
// localVue.use(VueRouter)

import TrainingPanel from '../TrainingPanel'

describe('TrainingPanel.vue', () => {

  // mock store and route
  let store;
  let mocks;
  beforeEach(() => {

    mocks = {
      $route: {
        meta: {
          title: 'mock'
        }
      }
    }

    store = new Vuex.Store({
      modules: {
        project: {
          namespaced: true,
          state: {},
          mutations: {},
          actions: {},
          getters: {
            myFunc: jest.fn().mockReturnValue('this is mock pjt getter')
          }
        },
        training: {
          namespaced: true,
          state: {},
          mutations: {},
          actions: {},
          getters: {
            myFunc2: jest.fn().mockReturnValue('this is mock training getter')
          }
        },
      }
    })
  })



  it('is a Vue instance', () => {
    const wrapper = shallowMount(TrainingPanel, {
      mocks,
      store,
      localVue,
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })



})
