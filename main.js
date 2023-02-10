const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ElectronBlocker, fullLists, Request } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch');
const { readFileSync, writeFileSync } = require('fs');

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    fullscreen: true,
    resizable: false,
    frame: false,
    kiosk: true,
    title: "Youtube",
    backgroundColor: "#282828",
    icon: path.join(__dirname, 'youtube.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false
    }
  });
  const blocker = await ElectronBlocker.fromPrebuiltAdsOnly(
    fetch
  );
  blocker.enableBlockingInSession(mainWindow.webContents.session);

  mainWindow.webContents.userAgent = "Mozilla/5.0 (PlayStation; PlayStation 4/9.51) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15";
  mainWindow.loadURL('http://www.youtube.com/tv/');
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});
