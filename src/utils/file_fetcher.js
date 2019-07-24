const fs = require('fs')

class DatasetPathCollector {
  constructor(datasetInfo) {
    this.folderPath = datasetInfo.folderPath
    this.labelFile = datasetInfo.labelFile
    this.fileList = []

    // TODO: this field is for development only
    this.defaultBatchSize = 20
  }

  readCsv (fn) {
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

  parseFileList () {
    return new Promise((resolve, reject) => {
      this.readCsv(this.labelFile).then((result) => {
        // TODO: rewrite this
        console.log('--- parsing file list')
        let folderPath = this.folderPath
        let temp = result.split(/\r\n|\n/)
          .splice(1, this.defaultBatchSize)
          .map(function(x) {
            return {
              root: folderPath,
              filename: x.split(',')[0]
            }
          })
        this.fileList = temp
        console.log(this.fileList)
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getBatch (batchSize) {}
}

export default {
  DatasetPathCollector
}