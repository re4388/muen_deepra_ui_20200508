import protoUtils from './proto_utils.js'
import vueUtils from './vue_utils.js'
let protoPackageName = 'prediction'
let protoPath = `./src/api/protos/${protoPackageName}.proto`

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

function startPrediction (modelUuid, datasetUuid, handlerProgress, handlerEnd) {
  let predictionService = protoUtils.getServicer(
    protoPath, protoPackageName, 'PredictionService'
  )

  let call = predictionService.StartPrediction({
    model_uuid: modelUuid,
    dataset_uuid: datasetUuid
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

function getPredictionOutput () {
  let predictionService = protoUtils.getServicer(
    protoPath, protoPackageName, 'PredictionService'
  )
  return new Promise((resolve, reject) => {
    predictionService.GetPredictionOutput({}, (err, resp) => {
      let result = JSON.parse(resp.output_json)
      console.log(result)
      resolve(result)
    })
  })
}

export default {
  startPrediction,
  getPredictionOutput
}
