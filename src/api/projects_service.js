let protoPackageName = 'projects'
let protoPath = `./src/api/protos/${protoPackageName}.proto`
let protoUtils = require('./proto_utils.js')

class ProjectInfo {
  constructor(content) {
    this.content = content
  }
  static parseFromResponse(resp) {
  }
}

function createProject (name, description, datasetInfo) {
  let projectManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ProjectManagement'
  )

  return new Promise((resolve, reject) => {
    projectManagementService.CreateProject(
      {
        name: name,
        description: description,
        dataset_info_json: JSON.stringify(datasetInfo)
      },
      (err, resp) => {
        if (err !== null) {
          console.log(err)
        }
        resolve(resp)
      }
    )
  })
}

export default {
  createProject,
  ProjectInfo
}
