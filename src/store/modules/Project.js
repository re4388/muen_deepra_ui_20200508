import { initializeState } from './index'

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
  SET_CURRENT_PROJECT(state, payload) {
    state.currentProject = payload
  }
}

const actions = {
  setCurrentProject({ commit }, payload) {
    commit('SET_CURRENT_PROJECT', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
