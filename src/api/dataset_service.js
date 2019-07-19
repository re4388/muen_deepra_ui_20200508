import protoUtils from './proto_utils.js'
let protoPath = './src/api/protos/dataset.proto'
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
    content.labelFile = info.label_file
    content.datasetSize = info.dataset_size

    let details = info.details.fields
    let labelReport = details.label_report.structValue.fields
    content.fileCounts = info.details.fields.file_counts.numberValue
    content.details = {
      labels: labelReport.labels,
      labeledFileCounts: labelReport.normal.numberValue,
      missedFileCounts: labelReport.missed.numberValue,
      unlabeledFileCounts: labelReport.unlabeled.numberValue
    }
    content.totalLabels = (
      content.details.labeledFileCounts +
      content.details.missedFileCounts +
      content.details.unlabeledFileCounts
    )
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
