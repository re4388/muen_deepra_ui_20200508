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
    target[key] = defaults[key]
  }
}

export { modules, localStore, initializeState }
