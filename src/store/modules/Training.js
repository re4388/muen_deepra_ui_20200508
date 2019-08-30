import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  isCurrentStageLocked: true,
  completedStageIndex: 0,
  isTraining: false,
  trainingOutput: {
    content: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  trainingOutput () {
    return state.trainingOutput
  },
  isCurrentStageLocked () {
    return state.isCurrentStageLocked
  },
  completedStageIndex () {
    return state.completedStageIndex
  },
  isTraining () {
    return state.isTraining
  }
}

const mutations = {
  SET_TRAINING_OUTPUT (state, payload) {
    state.trainingOutput = payload
  },
  UNLOCK_STAGE (state) {
    state.isCurrentStageLocked = false
  },
  RESET_STAGE_LOCK (state) {
    state.isCurrentStageLocked = true
  },
  SET_COMPLETED_STAGE_INDEX (state, payload) {
    state.completedStageIndex = payload
  },
  TOGGLE_IS_TRAINING (state) {
    state.isTraining = !state.isTraining
  },
  RESET_ALL_STATE (state) {
    initializeState(state, defaultState)
  }
}

const actions = {
  setTrainingOutput({ commit }, payload) {
    commit('SET_TRAINING_OUTPUT', payload)
  },
  unlockStage ({ commit }) {
    commit('UNLOCK_STAGE')
  },
  resetStageLock ({ commit }) {
    commit('RESET_STAGE_LOCK')
  },
  setCompletedStageIndex ({ commit }, payload) {
    commit('SET_COMPLETED_STAGE_INDEX', payload)
  },
  toggleIsTraining ({ commit }) {
    commit('TOGGLE_IS_TRAINING')
  },
  // resetAllState ({ commit }) {
  //   commit('RESET_ALL_STATE')
  // }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
