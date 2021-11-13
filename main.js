const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
var robot = require("robotjs");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
}

ipcMain.on("getPositionClick", () => {
  while (true) {
    var mouse = robot.getMousePos();
    console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
  }
});

function getCoordsFromPixel(x, y, width, height, colorBomb) {

  var img = robot.screen.capture(x, y, width, height);

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var sample_color = img.colorAt(i, j);

      if (colorBomb.includes(sample_color)) {

        var screen_x = i + x;
        var screen_y = j + y;

        console.log(
          "Found a colorBomb: " +
            screen_x +
            ", " +
            screen_y +
            " color " +
            sample_color
        );
        return { x: screen_x, y: screen_y };
      }
    }
  }

  // did not find the color in our screenshot
  return false;
}
function IniciarBot() {
  var MoveVoltar = getCoordsFromPixel(266, 211, 45, 36, [
    "d5e3dc",
    "ffffff",
    "588f75",
    "d3e173",
    "a6baa0",
    "3e6553",
  ]);
  robot.moveMouse(MoveVoltar.x, MoveVoltar.y);
  robot.mouseClick();
}

ipcMain.on("StartBot", () => {
  IniciarBot();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
