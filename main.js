const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu

const path = require('path')
const Tray = electron.Tray

var mainWindow = null;
let tray = null

function createWindow() {
  if (mainWindow == null)
  {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    mainWindow.loadFile('views/index.html');
  }
  else
    mainWindow.show(); 

  mainWindow.on('close', function (event) {
    mainWindow.hide();
    event.preventDefault();
    return false;
  });
}

app.on('ready', function () {
  tray = new Tray(path.join(__dirname, 'images/metris.png'))

  let template = [
    {
      label: 'Statistics',
      click: function () { createWindow() }
    },
    {
      label: 'Quit',
      click: function () { tray.destroy(); app.quit() }
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