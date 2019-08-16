import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  isValidating: false,
  validationOutput: {
    content: null
  },
  allDatasetOutput: {
    content: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  validationOutput () {
    return state.validationOutput
  },
  allDatasetOutput () {
    return state.allDatasetOutput
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
  SET_ALL_DATASET_OUTPUT (state, payload) {
    state.allDatasetOutput = payload
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
  setAllDatasetOutput ({ commit }, payload) {
    commit('SET_ALL_DATASET_OUTPUT', payload)
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
