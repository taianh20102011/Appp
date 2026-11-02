/**
 * SMART AI - Native Desktop Desktop Application Runner
 * Multi-Platform: Windows (.exe), macOS (.dmg, .app), Linux (.AppImage, .deb)
 */

const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    title: 'SMART AI – Adaptive Artificial Intelligence System',
    icon: path.join(__dirname, 'icons', 'icon-512.png'),
    backgroundColor: '#F7F8FA',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  // Open external links in default system browser, not in electron window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('mailto:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  setupMenu();
}

function setupMenu() {
  const template = [
    {
      label: 'Tệp',
      submenu: [
        { label: 'Tải lại bài học', accelerator: 'CmdOrCtrl+R', click: () => mainWindow?.reload() },
        { type: 'separator' },
        { label: 'Thoát ứng dụng', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
      ]
    },
    {
      label: 'Xem',
      submenu: [
        { label: 'Phóng to', role: 'zoomIn' },
        { label: 'Thu nhỏ', role: 'zoomOut' },
        { label: 'Kích thước chuẩn', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Toàn màn hình', role: 'togglefullscreen' },
        { label: 'Công cụ Nhà phát triển (DevTools)', accelerator: 'F12', click: () => mainWindow?.webContents.toggleDevTools() }
      ]
    },
    {
      label: 'Trợ giúp',
      submenu: [
        {
          label: 'Mở Kho lưu trữ GitHub',
          click: () => shell.openExternal('https://github.com/taianh20102011/Appp')
        },
        {
          label: 'Về dự án SMART AI',
          click: () => shell.openExternal('mailto:phamngoctaianh6@gmail.com')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
