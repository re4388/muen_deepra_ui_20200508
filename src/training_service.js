let protoPath = './src/api/protos/training.proto'
let protoUtils = require('./proto_utils.js')
let protoPackageName = 'training'

function startTraining (model_name, handler_progress, handler_end) {
  let trainingService = protoUtils.getServicer(
    protoPath, protoPackageName, 'TrainingService'
  )
  let call = trainingService.StartTraining({'model_name': model_name})
  call.on('data', (resp) => {
    handler_progress(resp)
  })
  call.on('end', (resp) => {
    handler_end(resp)
  })
  return call
}

function runMNIST (model_name, handler_progress, handler_end) {
  let trainingService = protoUtils.getServicer(
    protoPath, protoPackageName, 'TrainingService'
  )
  let call = trainingService.RunMNIST({'model_name': model_name})
  call.on('data', (resp) => {
    handler_progress(resp)
  })
  call.on('end', (resp) => {
    handler_end(resp)
  })
  return call
}

module.exports = {
  startTraining: startTraining,
  runMNIST: runMNIST
}
