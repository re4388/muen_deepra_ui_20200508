let { spawn, exec } = require('child_process')
let net = require('net')
let procPythonEnv = null

function checkGRPCServerOpened (port, options) {
  options = Object.assign({timeout: 10000}, options)
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    let onError = (message) => {
      console.log(message)
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
    procPythonEnv = spawn(
      'python', ['-m', 'deepra.api.api_server'], {}
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
    console.log(`is port ${port} being used? ${isUsed}`)
    if (isUsed) {
      console.log(`Port ${port} is in used`)
    } else {
      _launchProcess()
      console.log(procPythonEnv)
    }
  }).catch(
    console.log('Backend server is failed to launch. Please contact with your service provider.')
  )
}

function stopGRPCServer () {
  if (procPythonEnv !== null) {
    procPythonEnv.kill()
  }
  // process.kill(-procPythonEnv.pid)
  console.log('Backend server is killed')
}

export default {
  launchGRPCServer,
  stopGRPCServer
}
