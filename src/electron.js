import {app, BrowserWindow} from 'electron'
import * as path from 'path'

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('browser-window-created', (e, window) => {
})

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
