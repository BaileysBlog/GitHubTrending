const { app, BrowserWindow } = require('electron');


var fs = require('fs'); 

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assets/logo.png`
    });

    win.setMenu(null);
    win.setTitle("Git Trending");


    win.loadURL(`file://${__dirname}/dist/index.html`);

    //// un-comment below to open the DevTools.
    win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    });
}

// Create window on electron initialization
app.on('ready', createWindow);
    
// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
});



const ipc = require('electron').ipcMain;

ipc.on('write-to-file', function (event,msg)
{
    fs.writeFile('C:/Users/Bailey Miller/Desktop/Test.txt', msg, (error) => { win.webContents.send('file-status', 'Failed') }, (callback) => { win.webContents.send('file-status', 'Good') });
});