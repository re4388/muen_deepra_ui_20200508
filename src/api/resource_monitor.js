let protoPath = './src/api/protos/resources.proto'
let protoUtils = require('./proto_utils.js')
let protoPackageName = 'resourceMonitor'

function getDiskUsage () {
  let diskUsageChecker = protoUtils.getServicer(
    protoPath, protoPackageName, 'DiskUsageChecker'
  )
  return new Promise((resolve, reject) => {
    diskUsageChecker.GetDiskUsage({}, (err, resp) => {
      console.log(`Disk usage: ${resp}`)
      let result = JSON.parse(resp.dict_report)
      console.log(result)
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
      console.log(result)
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
      console.log(resp)   // <- returned value is a list
      let result = JSON.parse(resp.dict_report)[0]
      console.log(result)
      resolve(result)
    })
  })
}

module.exports = {
  getDiskUsage: getDiskUsage,
  getMemoryUsage: getMemoryUsage,
  getGPUMemoryUsage: getGPUMemoryUsage
}
