let protoPackageName = 'projects'
let protoPath = `./src/api/protos/${protoPackageName}.proto`
let protoUtils = require('./proto_utils.js')
let vue_utils = require('./vue_utils.js')

class ProjectInfo {
  constructor(content) {
    this.content = content
  }
  static parseFromResponse(resp) {
  }
}

class ProjectList {
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
        dataset_info_json: JSON.stringify(vue_utils.clone(datasetInfo))
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

function getProjectList () {
  let projectManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ProjectManagement'
  )

  return new Promise((resolve, reject) => {
    projectManagementService.GetProjectList(
      null, (err, resp) => {
        if (err != null) {
          console.log(err)
        }
        resolve(resp)
      }
    )
  })
}

export default {
  createProject,
  getProjectList,
  ProjectInfo
}
