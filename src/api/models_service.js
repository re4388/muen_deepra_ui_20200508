import protoUtils from './proto_utils.js'

let protoPackageName = 'models'
let protoPath = `./src/api/protos/${protoPackageName}.proto`

class ModelInfo {
  constructor(content) {
    this.content = content
  }
  static parseFromResponse(resp) {}
}

function getModelList() {
  let modelManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ModelManagement'
  )

  return new Promise((resolve, reject) => {
    modelManagementService.GetModelList(
      null, (err, resp) => {
        if (err != null) {
          console.log(err)
          reject(err)
        }
        console.log(resp)
        resolve(resp)
      }
    )
  })
}

function getModel(uuid) {
  let modelManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ModelManagement'
  )

  return new Promise((resolve, reject) => {
    modelManagementService.GetModel({
      uuid: uuid
    }, (err, resp) => {
      if (err != null) {
        console.log(err)
      }
      console.log('------ got model from backend -----')
      console.log(resp)
      resolve(resp)
    })
  })
}

function GetModelListByProject(uuid) {
  let modelManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ModelManagement'
  )
  return new Promise((resolve, reject) => {
    modelManagementService.GetModelListByProject({
      project_uuid: uuid
    }, (err, resp) => {
      if (err != null) {
        console.log(err)
      }
      
      // console.log(resp)
      resolve(resp)
      console.log('------ grpc GetModelListByProject completed -----')
    })
  })
}

function deleteModel (uuid) {
  let modelManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ModelManagement'
  )

  return new Promise((resolve, reject) => {
    modelManagementService.DeleteModel(
      {uuid: uuid}, (err, resp) => {
        if (err != null) {
          console.log(err)
          reject(err)
        }
        if (!resp.success) {
          reject(false)
        }
        console.log('----- model is deleted -----')
        console.log(uuid)
        resolve(resp.success)
      }
    )
  })
}

export default {
  getModelList,
  getModel,
  deleteModel,
  ModelInfo,
  GetModelListByProject
}
