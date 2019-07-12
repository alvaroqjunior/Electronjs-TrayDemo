const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu

const path = require('path')
const Tray = electron.Tray

var mainWindow = null;
let tray = null

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('views/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function () {
  tray = new Tray(path.join(__dirname, 'images/metris.png'))

  let template = [
    {
      label: 'Statistics',
      click: function() {  createWindow()   }
    }
  ]

  const contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Metris X')
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
  }
});
