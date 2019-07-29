import protoUtils from './proto_utils.js'

let protoPackageName = 'models'
let protoPath = `./src/api/protos/${protoPackageName}.proto`

class ModelInfo {
  constructor(content) {
    this.content = content
  }
  static parseFromResponse(resp) {
  }
}

function getModelList () {
  let modelManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ModelManagement'
  )

  return new Promise((resolve, reject) => {
    modelManagementService.GetModelList(
      null, (err, resp) => {
        if (err != null) {
          console.log(err)
        }
        console.log(resp)
        resolve(resp)
      }
    )
  })
}

function getModel (uuid) {
  let modelManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ModelManagement'
  )

  return new Promise((resolve, reject) => {
    modelManagementService.GetModel(
      {uuid: uuid}, (err, resp) => {
        if (err != null) {
          console.log(err)
        }
        console.log('------ got model from backend -----')
        console.log(resp)
        resolve(resp)
      }
    )
  })
}

export default {
  getModelList,
  getModel,
  ModelInfo
}