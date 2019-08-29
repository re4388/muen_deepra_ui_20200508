import protoUtils from './proto_utils.js'

let protoPackageName = 'label'
let protoPath = `./src/api/protos/${protoPackageName}.proto`

function getLabelList(datasetUuid) {
  let labelManagementService = protoUtils.getServicer(
    protoPath, protoPackageName, 'LabelManagementService'
  )

  return new Promise((resolve, reject) => {
    labelManagementService.GetLabelList({
      dataset_uuid: datasetUuid
    }, (err, resp) => {
      if (err != null) {
        console.log(err)
        reject(err)
      }
      resolve(resp['label_files'])
    })
  })
}

export default {
  getLabelList
}
