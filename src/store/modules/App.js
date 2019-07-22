import { initializeState } from './index'

const namespaced = false;

const defaultState = {
  currentEntry: 'main',
  currentPage: 'base'
}

const state = {}

initializeState(state, defaultState)

const getters = {
  currentEntry() {
    return state.currentEntry
  },
  currentPage() {
    return state.currentPage
  }
}

const mutations = {
  SET_CURRENT_ENTRY(state, payload) {
    state.currentEntry = payload
  },
  SET_CURRENT_PAGE(state, payload) {
    state.currentPage = payload
  }
}

const actions = {
  setCurrentEntry({ commit }, payload) {
    commit('SET_CURRENT_ENTRY', payload)
  },
  setCurrentPage({ commit }, payload) {
    commit('SET_CURRENT_PAGE', payload)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
