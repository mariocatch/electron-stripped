const path = require('path')
const glob = require('glob')
const electron = require('electron')

const BrowserWindow = electron.BrowserWindow
const app = electron.app

var mainWindow = null

function initialize() {
  var shouldQuit = makeSingleInstance()
  if (shouldQuit) return app.quit()

  function createWindow() {
    var windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840
    }

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    mainWindow.on('closed', function () {
      mainWindow = null
    })
  }

  app.on('ready', function () {
    createWindow()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

function makeSingleInstance() {
  return app.makeSingleInstance(function () {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

initialize()

