const { app, BrowserWindow } = require('electron');
const path = require('path');
// 启动时禁用 GTK 警告
process.env.G_MESSAGES_DEBUG = '';
process.env.GTK_MODULES = '';


function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'build/icon.png')
  });

  win.loadFile('dist/index.html');
  
  // 开发时打开开发者工具
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});