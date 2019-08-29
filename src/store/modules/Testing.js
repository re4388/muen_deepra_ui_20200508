import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  currentStage: '',
  isCurrentStageLocked: true,
  completedStageIndex: 0,
  predictionOutput: {
    content: null
  },
  predictedLabels: [],
  differentLabels: [],
  isTesting: false
}

const state = {}

initializeState(state, defaultState)

const getters = {
  currentStage() {
    return state.currentStage
  },
  isCurrentStageLocked() {
    return state.isCurrentStageLocked
  },
  completedStageIndex() {
    return state.completedStageIndex
  },
  predictionOutput() {
    return state.predictionOutput
  },
  predictedLabels() {
    return state.predictedLabels
  },
  differentLabels() {
    return state.differentLabels
  },
  isTesting() {
    return state.isTesting
  }
}

const mutations = {
  SET_CURRENT_STAGE(state, payload) {
    state.currentStage = payload
  },
  UNLOCK_STAGE(state) {
    state.isCurrentStageLocked = false
  },
  RESET_STAGE_LOCK(state) {
    state.isCurrentStageLocked = true
  },
  SET_COMPLETED_STAGE_INDEX(state, payload) {
    state.completedStageIndex = payload
  },
  SET_PREDICTION_OUTPUT(state, payload) {
    state.predictionOutput = payload
  },
  SET_PREDICTED_LABELS(state, payload) {
    state.predictedLabels = payload
  },
  SET_DIFFERENT_LABELS(state, payload) {
    state.differentLabels = payload
  },
  TOGGLE_IS_TESTING(state) {
    state.isTesting = !state.isTesting
  },
  RESET_ALL_STATE(state) {
    initializeState(state, defaultState)
  }
}

const actions = {
  setCurrentStage({ commit }, payload) {
    commit('SET_CURRENT_STAGE', payload)
  },
  unlockStage({ commit }) {
    commit('UNLOCK_STAGE')
  },
  resetStageLock({ commit }) {
    commit('RESET_STAGE_LOCK')
  },
  setCompletedStageIndex({ commit }, payload) {
    commit('SET_COMPLETED_STAGE_INDEX', payload)
  },
  setPredictionOutput({ commit }, payload) {
    commit('SET_PREDICTION_OUTPUT', payload)
  },
  setPredictedLabels({ commit }, payload) {
    commit('SET_PREDICTED_LABELS', payload)
  },
  setDifferentLabels({ commit }, payload) {
    commit('SET_DIFFERENT_LABELS', payload)
  },
  toggleIsTesting({ commit }) {
    commit('TOGGLE_IS_TESTING')
  },
  resetAllState({ commit }) {
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
