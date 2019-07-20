import { initializeState } from './index'

const defaultState = {
  trainingOutput: {
    content: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  trainingOutput() {
    return state.trainingOutput
  }
}

const mutations = {
  SET_TRAINING_OUTPUT(state, payload) {
    state.trainingOutput = payload
  }
}

const actions = {
  setTrainingOutput({ commit }, payload) {
    commit('SET_TRAINING_OUTPUT', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
