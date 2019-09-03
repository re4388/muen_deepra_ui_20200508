import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  currentModel: {
    info: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  currentModel() {
    return state.currentModel
  },
}

const mutations = {
  RESET_ALL_STATE(state) {
    initializeState(state, defaultState)
  },
  SET_CURRENT_MODEL(state, payload) {
    state.currentModel = payload
  }
}

const actions = {
  setCurrentModel({ commit }, payload) {
    commit('SET_CURRENT_MODEL', payload)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
