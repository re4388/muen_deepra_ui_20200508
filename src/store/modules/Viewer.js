const namespaced = true;

const state = {
  currentImageSrc: '',
  currentDataset: null,
}

const getters = {
  currentImageSrc() {
    return state.currentImageSrc
  },
  currentDataset() {
    return state.currentDataset
  }
}

const mutations = {
  SET_CURRENT_IMAGE_SRC(state, payload) {
    state.currentImageSrc = payload
  },
  SET_CURRENT_DATASET(state, payload) {
    state.currentDataset = payload
  }
}

const actions = {
  setCurrentImageSrc({ commit }, payload) {
    commit('SET_CURRENT_IMAGE_SRC', payload)
  },
  setCurrentDataset({ commit }, payload) {
    commit('SET_CURRENT_DATASET', payload)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
