import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  isValidating: false,
  validationOutput: {
    content: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  validationOutput () {
    return state.validationOutput
  },
  isValidating () {
    return state.isValidating
  }
}

const mutations = {
  RESET_ALL_STATE (state) {
    initializeState(state, defaultState)
  },
  SET_VALIDATION_OUTPUT (state, payload) {
    state.validationOutput = payload
  },
  TOGGLE_IS_VALIDATING (state) {
    state.isValidating = !state.isValidating
  }
}

const actions = {
  resetAllState ({ commit }) {
    commit('RESET_ALL_STATE')
  },
  setValidationOutput ({ commit }, payload) {
    commit('SET_VALIDATION_OUTPUT', payload)
  },
  toggleIsValidating ({ commit }) {
    commit('TOGGLE_IS_VALIDATING')
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
