let { spawn, exec } = require('child_process')
let net = require('net')

function checkGRPCServerOpened (port, options) {
  options = Object.assign({timeout: 1000}, options)
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    let onError = () => {
      socket.destroy()
      resolve(false)
    }

    socket.setTimeout(options.timeout)
    socket.once('error', onError)
    socket.once('timeout', onError)
    socket.connect(port, options.host, () => {
      socket.end()
      resolve(true)
    })
  })
}

function launchGRPCServer () {
  let _launchProcess = () => {
    // Location of DeepRa should be modified (bundled in source of distribution)
    let procPythonEnv = exec(
      'cd %userprofile%/project/muen/deepra/deepra && activate autodl && python -m api.api_server',
      shell=true
    )
  
    procPythonEnv.stdout.on('data', (data) => {
      console.log(`stdout: \n${data}`)
    })
    procPythonEnv.stderr.on('data', (data) => {
      console.log(`stderr: \n${data}`)
    })
    procPythonEnv.on('message', (message) => {
      console.log(message)
    })
    procPythonEnv.on('close', () => {
      console.log('process terminated')
    })
    procPythonEnv.on('error', (msg) => {
      console.log(msg)
    })
  }

  let port = 50051
  let options = { host: 'localhost' }
  checkGRPCServerOpened(port, options).then((isUsed) => {
    if (isUsed) {
      console.log(`Port ${port} is in used`)
    } else {
      _launchProcess()
    }
  })
}

launchGRPCServer()
