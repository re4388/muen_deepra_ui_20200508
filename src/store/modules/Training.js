import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  trainingOutput: {
    content: null
  },
  validationOutput: {
    content: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  trainingOutput() {
    return state.trainingOutput
  },
  validationOutput() {
    return state.validationOutput
  }
}

const mutations = {
  SET_TRAINING_OUTPUT(state, payload) {
    state.trainingOutput = payload
  },
  SET_VALIDATION_OUTPUT(state, payload) {
    state.validationOutput = payload
  }
}

const actions = {
  setTrainingOutput({ commit }, payload) {
    commit('SET_TRAINING_OUTPUT', payload)
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
