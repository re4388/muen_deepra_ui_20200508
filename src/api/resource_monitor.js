import protoUtils from './proto_utils.js'
let protoPath = './src/api/protos/resources.proto'
let protoPackageName = 'resourceMonitor'

function getDiskUsage () {
  let diskUsageChecker = protoUtils.getServicer(
    protoPath, protoPackageName, 'DiskUsageChecker'
  )
  return new Promise((resolve, reject) => {
    diskUsageChecker.GetDiskUsage({}, (err, resp) => {
      console.log(`Disk usage: ${resp}`)
      let result = JSON.parse(resp.dict_report)
      resolve(result)
    })
  })
}

function getMemoryUsage () {
  let memoryUsageChecker = protoUtils.getServicer(
    protoPath, protoPackageName, 'MemoryUsageChecker'
  )
  return new Promise((resolve, reject) => {
    memoryUsageChecker.GetMemoryUsage({}, (err, resp) => {
      if (err !== null) {
        alert('It seems that there are some troubles in server side, please check that.')
      }
      console.log(`Memory usage: ${resp}`)
      let result = JSON.parse(resp.dict_report)
      resolve(result)
    })
  })
}

function getGPUMemoryUsage () {
  let gpuMemoryUsageChecker = protoUtils.getServicer(
    protoPath, protoPackageName, 'GPUMemoryUsageChecker'
  )
  return new Promise((resolve, reject) => {
    gpuMemoryUsageChecker.GetGPUMemoryUsage({}, (err, resp) => {
      console.log(`GPU memory usage: ${resp}`)
      let result = JSON.parse(resp.dict_report)[0]  // <- returned value is a list
      resolve(result)
    })
  })
}

export default {
  getDiskUsage,
  getMemoryUsage,
  getGPUMemoryUsage
}
