var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    width: 600,
    height: 800
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
