import protoUtils from './proto_utils.js'
import vueUtils from './vue_utils.js'

let protoPackageName = 'projects'
let protoPath = `./src/api/protos/${protoPackageName}.proto`

class ProjectInfo {
  constructor(content) {
    this.content = content
  }
  static parseFromResponse(resp) {
  }
}

class ProjectList {
}

function createProject (name, description, location, datatsetUuid) {
  let projectManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ProjectManagement'
  )

  return new Promise((resolve, reject) => {
    projectManagementService.CreateProject(
      {
        name: name,
        description: description,
        location: location,
        dataset_uuid: datatsetUuid
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
