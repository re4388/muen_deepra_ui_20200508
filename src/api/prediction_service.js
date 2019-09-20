import protoUtils from './proto_utils.js'
import vueUtils from './vue_utils.js'
let protoPackageName = 'prediction'
let protoPath = `./src/api/protos/${protoPackageName}.proto`


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
    let pIter = (resp.iteration_info.current + 1) / resp.iteration_info.total
    let pProg =  (resp.tta_info.current / resp.tta_info.total) + pIter
    handlerProgress(pProg)
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
