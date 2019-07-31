const namespaced = true;

const state = {
  currentImageSrc: '',
  currentDataset: null,
  parsedFileList: [],
}

const getters = {
  currentImageSrc() {
    return state.currentImageSrc
  },
  currentDataset() {
    return state.currentDataset
  },
  parsedFileList() {
    return state.parsedFileList
  }
}

const mutations = {
  SET_CURRENT_IMAGE_SRC(state, payload) {
    state.currentImageSrc = payload
  },
  SET_CURRENT_DATASET(state, payload) {
    state.currentDataset = payload
  },
  SET_PARSED_FILE_LIST(state, payload) {
    state.parsedFileList = payload
  }
}

const actions = {
  setCurrentImageSrc({ commit }, payload) {
    commit('SET_CURRENT_IMAGE_SRC', payload)
  },
  setCurrentDataset({ commit }, payload) {
    commit('SET_CURRENT_DATASET', payload)
  },
  setParsedFileList({ commit }, payload) {
    commit('SET_PARSED_FILE_LIST', payload)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
