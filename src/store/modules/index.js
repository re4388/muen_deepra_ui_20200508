import { createLocalStore } from '@/utils/local_store'

const localStore = createLocalStore()
const files = require.context('.', false, /\.js$/)  // all `.js` files in this folder
const modules = {}

files.keys().forEach(key => {
  // Skip this file
  if (key === './index.js') return

  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

function initializeState (target, defaults) {
  for (var key in defaults) {
    if (Array.isArray(target[key])) {
      target[key] = new Array()
    } else {
      target[key] = defaults[key]
    }
  }
}

function updateValue (target, payload) {
  let updater = (obj, entry, value) => {
    var keys = entry.split('.')
    var key = keys[0]
    if (obj === undefined || !obj.hasOwnProperty(key)) return

    if (keys.length == 1) {
      obj[key] = value
    } else {
      updater(obj[key], keys.slice(1,).join('.'), value)
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
