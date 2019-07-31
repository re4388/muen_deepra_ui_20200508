const fs = require('fs')

class DatasetPathCollector {
  constructor(datasetInfo) {
    this.folderPath = datasetInfo.folderPath
    this.labelFile = datasetInfo.labelFile
    this.fileList = []

    // TODO: this field is for development only
    this.defaultBatchSize = 20
  }

  parseFileList () {
    return new Promise((resolve, reject) => {
      readCsv(this.labelFile).then((result) => {
        // TODO: rewrite this
        console.log('--- parsing file list')
        let folderPath = this.folderPath
        this.fileList = result.split(/\r\n|\n/)
          // ignore the first row (header)
          .splice(1)
          .map(function(x) {
            return {
              root: folderPath,
              filename: x.split(',')[0]
            }
          })

        // Remove the last element, because it's an empty string generated by `string.split()`
        this.fileList.pop()
        console.log(this.fileList)
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getBatch (batchSize) {}
}

function readJson (fn, withEscape = false) {
  return new Promise((resolve, reject) => {
    try {
      let fileContent = fs.readFileSync(fn, {encoding: 'utf8'})
      let result = JSON.parse(fileContent)

      // If there are escape notations in the file content, result from
      // the first parsing operation will be pure string. So that we have
      // to use `JSON.parse` again.
      if (withEscape) {
        result = JSON.parse(result)
      }
      resolve(result)
    }
    catch (err) {
      reject(err)
    }
  })
}

function readCsv (fn) {
  return new Promise((resolve, reject) => {
    try {
      let fileContent = fs.readFileSync(fn, {encoding: 'utf8'})
      resolve(fileContent)
    }
    catch (err) {
      reject(err)
    }
  })
}

export default {
  DatasetPathCollector,
  readJson,
  readCsv
}