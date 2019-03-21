// Modules to control application life and create native browser window


const {app, BrowserWindow, Menu, Tray, ipcMain} = require('electron')
const path = require('path');
var runInBackground = false;

ipcMain.on('asynchronous-message', (event, arg) => {
  
    runInBackground = arg;

  
})

let tray = null

var icon_image = path.join(__dirname,'./lib/images.png');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    icon:icon_image,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('close', function (event) {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
   
    if(runInBackground)
    {
          if(!app.isQuiting){
            event.preventDefault();
            mainWindow.hide();
        }
        return false;
    }

    else  {
      mainWindow = null
      app.isQuiting = true;
      app.quit();
    }

  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  tray = new Tray(icon_image)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function(){
      mainWindow.show();} },
    { label: 'Quit', click:  function(){
      app.isQuiting = true;
      app.quit();
  }  },

  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Simple Webserver')
  createWindow();
 
})

/*
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
*/
