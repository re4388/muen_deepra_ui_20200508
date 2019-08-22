import { initializeState } from './index'

function reorder (array, orderList) {
  let x, i, j, k
  let indices = Object.assign({}, orderList)

  for (i = 0; i < array.length; i++) {
    x = array[i]
    j = i
    while (true) {
      k = indices[j]
      indices[j] = j
      if (k === i) break
      array[j] = array[k]
      j = k
    }
    array[j] = x
  }
}

function restoreOrder (array, key, ascending=true) {
  let reverse = ascending ? 1 : -1
  array.sort((a, b) => {
    if (a[key] > b[key]) return reverse*1
    if (a[key] < b[key]) return reverse*-1
    return 0
  })
}

const namespaced = true;

const defaultState = {
  currentImageSrc: '',
  currentDataset: null,
  parsedFileList: [],
  orderList: []
}

const state = {}

initializeState(state, defaultState)

const getters = {
  currentImageSrc () {
    return state.currentImageSrc
  },
  currentDataset () {
    return state.currentDataset
  },
  parsedFileList () {
    return state.parsedFileList
  },
  orderList () {
    return state.orderList
  }
}

const mutations = {
  SET_CURRENT_IMAGE_SRC (state, payload) {
    state.currentImageSrc = payload
  },
  SET_CURRENT_DATASET (state, payload) {
    state.currentDataset = payload
  },
  SET_PARSED_FILE_LIST (state, payload) {
    state.parsedFileList = payload
  },
  REORDER_LIST (state, payload) {
    if (!Array.isArray(payload) || payload.length !== state.parsedFileList.length) {
      throw Error('Length of given payload does not meet the length of target.')
    }
    state.orderList = payload
    reorder(state.parsedFileList, payload)
  },
  RESET_ORDER (state) {
    state.orderList = []
    // TODO: we cannot make sure that property exist in `parsedFileList`,
    //   maybe we have to rewrite this schema?
    restoreOrder(state.parsedFileList, 'index')
  }
}

const actions = {
  setCurrentImageSrc ({ commit }, payload) {
    commit('SET_CURRENT_IMAGE_SRC', payload)
  },
  setCurrentDataset ({ commit }, payload) {
    commit('SET_CURRENT_DATASET', payload)
  },
  setParsedFileList ({ commit }, payload) {
    commit('SET_PARSED_FILE_LIST', payload)
  },
  reorderList ({ commit }, payload) {
    commit('REORDER_LIST', payload)
  },
  resetOrder ({ commit }) {
    commit('RESET_ORDER')
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
