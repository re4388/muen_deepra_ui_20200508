import { localStore, initializeState, updateValue } from './index'

const namespaced = true;

const defaultState = {
  currentStage: null,
  isCurrentStageLocked: true,
  completedStageIndex: 0,
  selectedFolder: '',
  selectedTaskType: '',
  selectedLabelFile: '',
  selectedColFilename: '',
  selectedColLabel: '',
  datasetInfo: { details: {} },
  newProjectInfo: {},
  newProjectLocation: {},
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
  selectedColFilename() {
    return state.selectedColFilename
  },
  selectedColLabel() {
    return state.selectedColLabel
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
  SET_SELECTED_COL_FILENAME(state, payload) {
    state.selectedColFilename = payload
  },
  SET_SELECTED_COL_LABEL(state, payload) {
    state.selectedColLabel = payload
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
  },
  UPDATE_DATASET_INFO(state, payload) {
    updateValue(state.datasetInfo, payload)
  },
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
  setSelectedFolder({ commit }, payload) {
    commit('SET_SELECTED_FOLDER', payload)
  },
  setSelectedTaskType({ commit }, payload) {
    commit('SET_SELECTED_TASK_TYPE', payload)
  },
  setSelectedLabelFile({ commit }, payload) {
    commit('SET_SELECTED_LABEL_FILE', payload)
  },
  setSelectedColFilename({ commit }, payload) {
    commit('SET_SELECTED_COL_FILENAME', payload)
  },
  setSelectedColLabel({ commit }, payload) {
    commit('SET_SELECTED_COL_LABEL', payload)
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
  },
  updateDatasetInfo({ commit }, payload) {
    commit('UPDATE_DATASET_INFO', payload)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
