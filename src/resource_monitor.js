let protoPath = './src/api/protos/resources.proto'
let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

let backendConfig = require('./backend.json')
let grpcServerAddress = `${backendConfig.server.ip}:${backendConfig.server.port}`

var packageDefinition = protoLoader.loadSync(
  protoPath,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

let resourceMonitorProto = grpc.loadPackageDefinition(packageDefinition).resourceMonitor

function getDiskUsage () {
  let diskUsageChecker = new resourceMonitorProto.DiskUsageChecker(
    grpcServerAddress, grpc.credentials.createInsecure()
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
  let memoryUsageChecker = new resourceMonitorProto.MemoryUsageChecker(
    grpcServerAddress, grpc.credentials.createInsecure()
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
  let gpuMemoryUsageChecker = new resourceMonitorProto.GPUMemoryUsageChecker(
    grpcServerAddress, grpc.credentials.createInsecure()
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
