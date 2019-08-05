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
      '__DatasetClass': details['__DatasetClass'],
      labelReport: details.label_report,
      colFilename: details.col_filename,
      colLabel: details.col_label,
      fileExtension: details.file_extension,
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

function importDataset (
  folderPath, taskType, labelFile=null, forTest=false,
  colFilename='', colLabel='') {
  let datasetImportService = protoUtils.getServicer(
    protoPath, protoPackageName, 'DatasetImportServicer'
  )

  console.log(colFilename)
  console.log(colLabel)
  return new Promise((resolve, reject) => {
    datasetImportService.ImportDataset(
      {
        folder_path: folderPath,
        task_type: taskType,
        label_file: labelFile,
        for_test: forTest,
        col_filename: colFilename,
        col_label: colLabel
      },
      (err, resp) => {
        if (err !== null) {
          console.log(err)
        }
        if (resp == null) {
          reject(
            'Failed to import dataset, please check that given folder ' +
            'contains valid data to be imported.'
          )
        }
        console.log('--- got dataset ---')
        console.log(resp)
        resolve(DatasetInfo.parseFromResponse(resp))
      }
    )
  })
}

function parseLabelFile (filePath) {
  let datasetSelectionService = protoUtils.getServicer(
    protoPath, protoPackageName, 'DatasetImportServicer'
  )

  return new Promise((resolve, reject) => {
    datasetSelectionService.ParseLabelFile(
      {path: filePath},
      (err, resp) => {
        if (err != null) {
          console.log(err)
        }
        resolve(JSON.parse(resp.content_json))
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
  parseLabelFile,
  getDatasetInfo
}
