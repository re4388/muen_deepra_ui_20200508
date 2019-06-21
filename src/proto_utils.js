let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

let backendConfig = require('./backend.json')
let grpcServerAddress = `${backendConfig.server.ip}:${backendConfig.server.port}`

function generatePackageDefinition (protoPath) {
  return protoLoader.loadSync(
    protoPath,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
  )
}

function getProtoBufObject (protoPath, packageName) {
  let pkgDef = generatePackageDefinition(protoPath)
  let pbObj = grpc.loadPackageDefinition(pkgDef)[packageName]
  return pbObj
}

function getServicer (protoPath, packageName, serviceName) {
  let pbObj = getProtoBufObject(protoPath, packageName)
  return new pbObj[serviceName](
    grpcServerAddress, grpc.credentials.createInsecure()
  )
}

module.exports = {
  getProtoBufObject: getProtoBufObject,
  getServicer: getServicer
}