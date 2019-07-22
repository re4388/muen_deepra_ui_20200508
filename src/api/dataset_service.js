import protoUtils from './proto_utils.js'
import vueUtils from './vue_utils.js'
let protoPath = './src/api/protos/dataset.proto'
let protoPackageName = 'dataset'


class DatasetInfo {
  constructor(content) {
    this.content = content
  }
  static parseFromResponse(resp) {
    let content = {}
    let info = resp.dataset_info
    let details = JSON.parse(info.details_json)
    let labelReport = details.label_report

    content.folderPath = info.folder_path
    content.taskType = info.task_type
    content.labelFile = info.label_file
    content.datasetSize = info.dataset_size
    content.uuid = details.uuid4
    content.timestamp = details.creation_timestamp
    content.details = {
      '@DatasetClass': details['@DatasetClass'],
      labelReport: details.label_report,
    }
    content.fileCounts = details.file_counts
    content.totalLabels = (
      labelReport.normal +
      labelReport.unlabeled +
      labelReport.missed
    )
    console.log(content)
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
        console.log('--- got dataset ---')
        console.log(resp)
        resolve(DatasetInfo.parseFromResponse(resp))
      }
    )
  })
}

function getDatasetInfo (projectUuid) {
  let datasetSelectionService = protoUtils.getServicer(
    protoPath, protoPackageName, 'DatasetSelectionServicer'
  )

  return new Promise((resolve, reject) => {
    datasetSelectionService.GetDatasetInfo(
      {project_uuid: projectUuid},
      (err, resp) => {
        if (err != null) {
          console.log(err)
        }
        resolve(DatasetInfo.parseFromResponse(resp))
      }
    )
  })
}

export default {
  DatasetInfo,
  importDataset,
  getDatasetInfo
}
