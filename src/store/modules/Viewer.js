import { localStore } from './index'

const state = {
  currentImageSrc: ''
}

const getters = {
  currentImageSrc() {
    return state.currentImageSrc
  }
}

const mutations = {
  setCurrentImageSrc(state, payload) {
    state.currentImageSrc = payload
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
