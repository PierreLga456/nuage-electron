const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    icon: path.join(__dirname, 'icons', 'Nuage.icns'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: false
    }
  });

  mainWindow.loadURL('https://nuage.lann.es');

  // Inject spinner on navigation
  mainWindow.webContents.on('did-start-loading', () => {
    mainWindow.webContents.executeJavaScript(`
      if (!document.getElementById('nuage-spinner')) {
        const s = document.createElement('div');
        s.id = 'nuage-spinner';
        s.style.cssText = \`
          position: fixed;
          z-index: 9999;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        \`;
        document.body.appendChild(s);

        const style = document.createElement('style');
        style.innerHTML = \`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        \`;
        document.head.appendChild(style);
      }
    `).catch(() => {});
  });

  mainWindow.webContents.on('did-stop-loading', () => {
    mainWindow.webContents.executeJavaScript(`
      const s = document.getElementById('nuage-spinner');
      if (s) s.remove();
    `).catch(() => {});
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
