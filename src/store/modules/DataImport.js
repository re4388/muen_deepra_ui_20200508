import { localStore } from './index'

function initializeState (target, defaults) {
  for (var key in defaults) {
    target[key] = defaults[key]
  }
}

const defaultState = {
  currentStage: null,
  isCurrentStageLocked: true,
  completedStageIndex: 0,
  selectedFolder: '',
  selectedTaskType: null,
  datasetInfo: { details: {} }
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
  selectedFolder() {
    return state.selectedFolder
  },
  selectedTaskType() {
    return state.selectedTaskType
  },
  datasetInfo() {
    return state.datasetInfo
  }
}

const mutations = {
  RESET_ALL_STATE(state) {
    initializeState(state, defaultState)
  },
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
    if (payload < state.completedStageIndex) return
    state.completedStageIndex = payload
  },
  SET_SELECTED_FOLDER(state, payload) {
    state.selectedFolder = payload
  },
  SET_SELECTED_TASK_TYPE(state, payload) {
    state.selectedTaskType = payload
  },
  SET_DATASET_INFO(state, payload) {
    state.datasetInfo = payload
  }
}

const actions = {
  resetAllState({ commit }) {
    commit('RESET_ALL_STATE')
  },
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
  setSelectedFolder({ commit }, payload) {
    commit('SET_SELECTED_FOLDER', payload)
  },
  setSelectedTaskType({ commit }, payload) {
    commit('SET_SELECTED_TASK_TYPE', payload)
  },
  setDatasetInfo({ commit }, payload) {
    commit('SET_DATASET_INFO', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
