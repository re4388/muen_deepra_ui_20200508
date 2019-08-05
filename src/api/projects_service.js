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
          reject(err)
        }
        resolve(resp)
      }
    )
  })
}

function getProject (uuid) {
  let projectManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ProjectManagement'
  )

  return new Promise((resolve, reject) => {
    projectManagementService.GetProject(
      {uuid: uuid}, (err, resp) => {
        if (err != null) {
          console.log(err)
        }
        console.log('------ got project from backend -----')
        console.log(resp)
        resolve(resp)
      }
    )
  })
}

function deleteProject (uuid) {
  let projectManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'ProjectManagement'
  )

  return new Promise((resolve, reject) => {
    projectManagementService.DeleteProject(
      {uuid: uuid}, (err, resp) => {
        if (err != null) {
          console.log(err)
          reject(err)
        }
        if (!resp.success) {
          reject(false)
        }
        console.log('------ project is deleted -----')
        resolve(resp.success)
      }
    )
  })
}

export default {
  createProject,
  getProjectList,
  getProject,
  deleteProject,
  ProjectInfo
}
