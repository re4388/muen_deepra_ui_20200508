import { createLocalStore } from '@/utils/local_store'

const localStore = createLocalStore()
const files = require.context('.', false, /\.js$/)  // all `.js` files in this folder
const modules = {}

files.keys().forEach(key => {
    // Skip this file
    if (key === './index.js') return

    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export { modules, localStore }
