import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  dataset: null,
  currentStage: '',
  selectedFolder: '',
  selectedLabelFile: '',
  isCurrentStageLocked: true,
  completedStageIndex: 0,
  predictionOutput: {
    content: null
  }
}

const state = {}

initializeState(state, defaultState)

const getters = {
  currentStage() {
    return state.currentStage
  },
  selectedFolder() {
    return state.selectedFolder
  },
  selectedLabelFile() {
    return state.selectedLabelFile
  },
  isCurrentStageLocked() {
    return state.isCurrentStageLocked
  },
  completedStageIndex() {
    return state.completedStageIndex
  },
  predictionOutput() {
    return state.predictionOutput
  }
}

const mutations = {
  SET_CURRENT_STAGE(state, payload) {
    state.currentStage = payload
  },
  SET_SELECTED_FOLDER(state, payload) {
    state.selectedFolder = payload
  },
  SET_SELECTED_LABEL_FILE(state, payload) {
    state.selectedLabelFile = payload
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
  RESET_ALL_STATE(state) {
    initializeState(state, defaultState)
  }
}

const actions = {
  setCurrentStage({ commit }, payload) {
    commit('SET_CURRENT_STAGE', payload)
  },
  setSelectedFolder({ commit }, payload) {
    commit('SET_SELECTED_FOLDER', payload)
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
  setSelectedLabelFile({ commit }, payload) {
    commit('SET_SELECTED_LABEL_FILE', payload)
  },
  setPredictionOutput({ commit }, payload) {
    commit('SET_PREDICTION_OUTPUT', payload)
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
