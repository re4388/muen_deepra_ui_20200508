const electron = require('electron')
const fs = require('fs')
const path = require('path')

export const defaults = generateSettings()

function generateSettings() {
  return {
  }
}

export function createLocalStore () {
  return new LocalStore('user-preferences', Object.assign({}, defaults))
}

export default class LocalStore {
  constructor(filename, data) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, filename + '.json')
    this.data = parseDataFile(this.path, data)
  }

  get(key) {
    return this.data[key]
  }

  set(key, val) {
    this.data[key] = val
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (err) {
    return defaults
  }
}
