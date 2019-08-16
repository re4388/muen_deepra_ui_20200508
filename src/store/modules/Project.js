import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  currentProject: {
    info: null
  },
  taskType: ''
}

const state = {}

initializeState(state, defaultState)

const getters = {
  currentProject () {
    return state.currentProject
  },
  taskType () {
    return state.taskType
  }
}

const mutations = {
  RESET_ALL_STATE (state) {
    initializeState(state, defaultState)
  },
  SET_CURRENT_PROJECT (state, payload) {
    state.currentProject = payload
  },
  SET_TASK_TYPE (state, payload) {
    state.taskType = payload
  }
}

const actions = {
  resetAllState ({ commit }) {
    commit('RESET_ALL_STATE')
  },
  setCurrentProject ({ commit }, payload) {
    commit('SET_CURRENT_PROJECT', payload)
  },
  setTaskType ({ commit }, payload) {
    commit('SET_TASK_TYPE', payload)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
