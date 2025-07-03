const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Nuage",
    icon: path.join(__dirname, 'assets/Nuage.icns'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false
    }
  });

  mainWindow.webContents.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  );

  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    if (['notifications', 'media'].includes(permission)) {
      return callback(true);
    }
    callback(false);
  });

  mainWindow.loadURL('https://nuage.lann.es');
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(createWindow);
