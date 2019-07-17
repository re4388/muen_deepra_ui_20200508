let protoPath = './src/api/protos/dataset.proto'
let protoUtils = require('./proto_utils.js')
let protoPackageName = 'dataset'


class DatasetInfo {
  constructor(content) {
    this.content = content
  }
  static parseFromResponse(resp) {
    let content = {}
    let info = resp.dataset_info
    content.folderPath = info.folder_path
    content.taskType = info.task_type

    let details = info.details.fields
    let labelCounts = details.label_counts.structValue.fields
    content.fileCounts = info.details.fields.file_counts.numberValue
    content.details = {
      labeledFileCounts: labelCounts.normal.numberValue,
      missedFileCounts: labelCounts.missed.numberValue,
      unlabeledFileCounts: labelCounts.unlabeled.numberValue
    }
    content.totalLabels = (content.details.labeledFileCounts + 
      content.details.missedFileCounts + content.details.unlabeledFileCounts)
    return new DatasetInfo(content)
  }
}

function importDataset (folderPath, taskType) {
  let datasetImportService = protoUtils.getServicer(
    protoPath, protoPackageName, 'DatasetImportServicer'
  )

  return new Promise((resolve, reject) => {
    datasetImportService.ImportDataset(
      {
        'folder_path': folderPath,
        'task_type': taskType
      },
      (err, resp) => {
        if (err !== null) {
          console.log(err)
        }
        resolve(DatasetInfo.parseFromResponse(resp))
      }
    )
  })
}

export default {
  importDataset,
  DatasetInfo
}
