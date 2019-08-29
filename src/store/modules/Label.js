import { initializeState } from './index'

const namespaced = true;

const defaultState = {
  modifiedSamples: []
}

const state = {
}

initializeState(state, defaultState)

const getters = {
  modifiedSamples () {
    return state.modifiedSamples
  }
}

function indexOfModifiedSamples (target) {
  return state.modifiedSamples.map(x => x.filename).indexOf(target.filename)
}

const mutations = {
  UPDATE_MODIFIED_SAMPLE (state, payload) {
    // NOTE: minimal required keys in payload.sample: 'filename', 'label'
    let sample = payload.sample
    let newLabel = payload.newLabel
    // Ignore modification if the original annotation is marked as an empty one (NA)
    if (sample.label === '#' || sample.label === '') return

    let idx = indexOfModifiedSamples(sample)
    if (idx === -1) {
      let record = Object.assign({}, sample)
      // Dynamically add this property `orignalLabel`
      record['orignalLabel'] = sample.label
      record.label = newLabel
      state.modifiedSamples.push(record)
    } else if (state.modifiedSamples[idx].orignalLabel === newLabel) {
      // Remove record if the label of incoming payload equals to the original label.
      state.modifiedSamples.splice(idx, 1)
    } else {
      state.modifiedSamples[idx].label = newLabel
    }
  },
  RESET_ALL_STATE (state) {
    initializeState(state, defaultState)
  }
}

const actions = {
  updateModifiedSample ({ commit }, payload) {
    commit('UPDATE_MODIFIED_SAMPLE', payload)
  },
  resetAllState ({ commit }) {
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
