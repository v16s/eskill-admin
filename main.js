const { app, BrowserWindow } = require('electron')
const serve = require('electron-serve')
const path = require('path')
const loadURL = serve({ directory: 'dist' })
const { ipcMain } = require('electron')

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: { webSecurity: false }
  })
  // mainWindow.setMenu(null);
  loadURL(mainWindow)
})
