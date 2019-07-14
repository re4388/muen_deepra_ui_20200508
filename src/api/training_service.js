let protoPath = './src/api/protos/training.proto'
let protoUtils = require('./proto_utils.js')
let protoPackageName = 'training'

class ProgressInfo {
  constructor(trainingResp) {
    this.content = trainingResp
  }

  get metricInfo() {
    return this.content['metric_info_list']
  }
  get iterationInfo() {
    return this.content['iteration_info']
  }
  get epochInfo() {
    return this.content['epoch_info']
  }
  get stageInfo() {
    return this.content['stage_info']
  }
  get currentProgress() {
    let ep_curr = this.epochInfo['current']
    let ep_total = this.epochInfo['total']
    let it_curr = this.iterationInfo['current']
    let it_total = this.iterationInfo['total']
    let stage_curr = this.stageInfo['current']
    let stage_total = this.stageInfo['total']

    let p_stage = ((stage_curr - 1) / stage_total)
    let p_epoch = (((ep_curr - 1) + (it_curr / it_total)) / (ep_total * stage_total))
    return p_stage + p_epoch
  }
}

function startTraining (model_name, handler_progress, handler_end) {
  let trainingService = protoUtils.getServicer(
    protoPath, protoPackageName, 'TrainingService'
  )
  let call = trainingService.StartTraining({'model_name': model_name})
  call.on('data', (resp) => {
    handler_progress(new ProgressInfo(resp))
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
    handler_progress(new ProgressInfo(resp))
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
