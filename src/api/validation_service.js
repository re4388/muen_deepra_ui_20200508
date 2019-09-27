import protoUtils from './proto_utils.js'
import vueUtils from './vue_utils.js'
let protoPath = './src/api/protos/validation.proto'
let protoPackageName = 'validation'

class ProgressInfo {
  constructor (resp) {
    this.content = resp
  }

  get metricInfo () {
    return this.content['metric_info_list']
  }

  get iterationInfo () {
    return this.content['iteration_info']
  }

  get ttaInfo () {
    return this.content['tta_info']
  }

  get currentProgress () {
    let pIter = (this.iterationInfo.current + 1) / this.iterationInfo.total
    let pProg =  (this.ttaInfo.current / this.ttaInfo.total) + pIter
    return pProg
  }
}

function startValidation (
  projectInfo, trainingOutput, handlerProgress, handlerEnd, options={
    datasetType: ''
  }) {
  let validationService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ValidationService'
  )

  let call = validationService.StartValidation({
    project_info_json: JSON.stringify(projectInfo),
    training_output_json: JSON.stringify(vueUtils.clone(trainingOutput)),
    dataset_type: options.datasetType
  })
  call.on('data', (resp) => {
    console.log(resp)
    handlerProgress(new ProgressInfo(resp))
  })
  call.on('end', (resp) => {
    console.log(resp)
    handlerEnd(resp)
  })
  call.on('error', (resp) => {
    handlerEnd(resp)
  })
  return call
}

function getValidationOutput (projectInfo) {
  let validationService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ValidationService'
  )
  console.log(projectInfo)
  return new Promise((resolve, reject) => {
    validationService.GetValidationOutput({
      project_info_json: JSON.stringify(projectInfo)
    }, (err, resp) => {
      if (err !== null) {
        reject(err)
      }
      let result = JSON.parse(resp.output_json)
      console.log(result)
      resolve(result)
    })
  })
}

function exportFiles (projectInfo, location, traied_model_loc) {
  let validationService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ValidationService'
  )

  return new Promise((resolve, reject) => {
    validationService.ExportFiles({
      traied_model_loc: traied_model_loc,
      project_info_json: JSON.stringify(projectInfo),
      location: location
    }, (err, resp) => {
      if (err !== null) {
        reject(err)
      }
      console.log(resp)
      resolve(resp)
    })
  })
}

function getOrderedFileList (projectInfo, datasetType, sortBy) {
  let validationService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ValidationService'
  )

  return new Promise((resolve, reject) => {
    validationService.GetOrderedFileList({
      project_info_json: JSON.stringify(projectInfo),
      dataset_type: datasetType,
      sort_by: sortBy
    }, (err, resp) => {
      if (err !== null) {
        reject(err)
      }
      let result = JSON.parse(resp['ordered_list_json'])
      resolve(result)
    })
  })
}

export default {
  startValidation,
  getValidationOutput,
  exportFiles,
  getOrderedFileList
}
