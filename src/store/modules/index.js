import {
  createLocalStore
} from '@/utils/local_store'

const localStore = createLocalStore()
const files = require.context('.', false, /\.js$/) // all `.js` files in this folder
const modules = {}

files.keys().forEach(key => {
  // Skip this file
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})



function initializeState(target, defaults) {
  // console.log(this) this is undefefined, stric mode
  for (var key in defaults) {
    if (Array.isArray(target[key])) {
      target[key] = new Array()
    } else {
      target[key] = defaults[key]
    }
  }
}

// loop Store modules and add resetAllState in actions
for (const key in modules) {
  if (modules[key].hasOwnProperty('actions')) {
    modules[key]['actions']['resetAllState'] = function ({
      commit
    }) {
      commit('RESET_ALL_STATE')
    }
  }


  // TODO: haven't find a way to factor out mutation RESET_ALL_STATE
  if (modules[key].hasOwnProperty('mutations')) {
    // modules[key]['mutations']['RESET_ALL_STATE'] = function (state) {
    //   initializeState(state, defaultState)
      // StoreWrapper.initializeState(state, defaultState)
    // }
    // modules[key]['mutations']['RESET_ALL_STATE'] = StoreWrapper.initializeState
    // modules[key]['mutations']['RESET_ALL_STATE'] = new StoreWrapper(state, defaults).initializeState
  }

}


// console.log(modules)

function updateValue(target, payload) {
  let updater = (obj, entry, value) => {
    var keys = entry.split('.')
    var key = keys[0]
    if (obj === undefined || !obj.hasOwnProperty(key)) return

    if (keys.length == 1) {
      obj[key] = value
    } else {
      updater(obj[key], keys.slice(1, ).join('.'), value)
    }
  }
  Object.keys(payload).forEach((entry) => {
    updater(target, entry, payload[entry])
  })
}

export {
  modules,
  localStore,
  initializeState,
  updateValue
}
