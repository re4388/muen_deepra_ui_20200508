import { localStore, initializeState } from './index'

const defaultState = {
  currentStage: null,
  isCurrentStageLocked: true,
  completedStageIndex: 0,
  selectedFolder: '',
  selectedTaskType: '',
  selectedLabelFile: '',
  datasetInfo: { details: {} },
  newProjectInfo: {},
  newProjectLocation: {},
  isCreatingProject: false
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
  selectedLabelFile() {
    return state.selectedLabelFile
  },
  datasetInfo() {
    return state.datasetInfo
  },
  newProjectInfo() {
    return state.newProjectInfo
  },
  newProjectLocation() {
    return state.newProjectLocation
  },
  isCreatingProject() {
    return state.isCreatingProject
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
  SET_SELECTED_LABEL_FILE(state, payload) {
    state.selectedLabelFile = payload
  },
  SET_DATASET_INFO(state, payload) {
    state.datasetInfo = payload
  },
  SET_NEW_PROJECT_INFO(state, payload) {
    state.newProjectInfo = payload
  },
  SET_NEW_PROJECT_LOCATION(state, payload) {
    state.newProjectLocation = payload
  },
  SET_IS_CREATING_PROJECT(state, payload) {
    state.isCreatingProject = payload
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
  setSelectedLabelFile({ commit }, payload) {
    commit('SET_SELECTED_LABEL_FILE', payload)
  },
  setDatasetInfo({ commit }, payload) {
    commit('SET_DATASET_INFO', payload)
  },
  setNewProjectInfo({ commit }, payload) {
    commit('SET_NEW_PROJECT_INFO', payload)
  },
  setNewProjectLocation({ commit }, payload) {
    commit('SET_NEW_PROJECT_LOCATION', payload)
  },
  setIsCreatingProject({ commit }, payload) {
    commit('SET_IS_CREATING_PROJECT', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
