import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  modifiedSamples: []
}

const state = {
}

initializeState(state, defaultState)

const getters = {
  modifiedSamples () {
    return state.modifiedSamples
  }
}

const mutations = {
  UPDATE_MODIFIED_SAMPLE (state, payload) {
    let idx = state.modifiedSamples.map(x => x.filename).indexOf(payload.filename)
    if (idx === -1) {
      state.modifiedSamples.push(payload)
    } else {
      state.modifiedSamples[idx] = payload
    }
  },
  RESET_ALL_STATE (state) {
    initializeState(state, defaultState)
  }
}

const actions = {
  updateModifiedSample ({ commit }, payload) {
    commit('UPDATE_MODIFIED_SAMPLE', payload)
  },
  resetAllState ({ commit }) {
    commit('RESET_ALL_STATE')
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
