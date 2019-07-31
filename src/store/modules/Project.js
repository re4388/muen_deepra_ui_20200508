import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  currentProject: {
    info: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  currentProject() {
    return state.currentProject
  },
}

const mutations = {
  RESET_ALL_STATE(state) {
    initializeState(state, defaultState)
  },
  SET_CURRENT_PROJECT(state, payload) {
    state.currentProject = payload
  }
}

const actions = {
  resetAllState({ commit }) {
    commit('RESET_ALL_STATE')
  },
  setCurrentProject({ commit }, payload) {
    commit('SET_CURRENT_PROJECT', payload)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
