import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  validationOutput: {
    content: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  validationOutput() {
    return state.validationOutput
  }
}

const mutations = {
  RESET_ALL_STATE(state) {
    initializeState(state, defaultState)
  },
  SET_VALIDATION_OUTPUT(state, payload) {
    state.validationOutput = payload
  }
}

const actions = {
  resetAllState({ commit }) {
    commit('RESET_ALL_STATE')
  },
  setValidationOutput({ commit }, payload) {
    commit('SET_VALIDATION_OUTPUT', payload)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
