import protoUtils from './proto_utils.js'
let protoPath = './src/api/protos/training.proto'
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

function startTraining (projectInfo, handlerProgress, handlerEnd) {
  let trainingService = protoUtils.getServicer(
    protoPath, protoPackageName, 'TrainingService'
  )
  let call = trainingService.StartTraining({'project_info_json': JSON.stringify(projectInfo)})
  call.on('data', (resp) => {
    handlerProgress(new ProgressInfo(resp))
  })
  call.on('end', (resp) => {
    handlerEnd(resp)
  })
  return call
}

function runMNIST (projectInfo, handlerProgress, handlerEnd) {
  let trainingService = protoUtils.getServicer(
    protoPath, protoPackageName, 'TrainingService'
  )
  let call = trainingService.RunMNIST({'project_info': projectInfo})
  call.on('data', (resp) => {
    handlerProgress(new ProgressInfo(resp))
  })
  call.on('end', (resp) => {
    handlerEnd(resp)
  })
  return call
}

export default {
  startTraining,
  runMNIST
}
