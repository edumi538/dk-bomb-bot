const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
var robot = require('robotjs');

function createWindow() {
  // Create the browser window.
  const tray = require('./tray.js');
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}

ipcMain.on('getPositionClick', () => {
  while (true) {
    var mouse = robot.getMousePos();
    console.log('Mouse is at x:' + mouse.x + ' y:' + mouse.y);
  }
});

function getCoordsFromPixel(x, y, width, height, colorBomb, fakecolor) {
  var img = robot.screen.capture(x, y, width, height);

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var sample_color = img.colorAt(i, j);

      if (colorBomb.includes(sample_color)) {
        var screen_x = i + x;
        var screen_y = j + y;

        console.log(
          'Found a colorBomb: ' +
            screen_x +
            ', ' +
            screen_y +
            ' color ' +
            sample_color
        );
        return { x: screen_x, y: screen_y };
      }
    }
  }
  return false;
}

function getCoordsFromPixelTimeout(x, y, width, height, colorsDown) {
  var img = robot.screen.capture(x, y, width, height);
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var colorDownPixel = img.colorAt(i, j);
      if (colorsDown.includes(colorDownPixel)) return 'Caiu';
    }
  }
  return false;
}

function getCoordsFromPixelRelogar(x, y, colorsR) {
  var colorPixelRelogar = robot.getPixelColor(x, y);
  console.log('colorPixelRelogar', colorPixelRelogar);
  console.log('colorsR', colorsR);
  if (colorPixelRelogar === colorsR) {
    console.log('Valor Encontrado');
    return true;
  }
  console.log('Valor não encontrado');
  return false;
}

function IniciarBot() {
  relogar();
  setInterval(() => {
    robot.keyTap('f5');
    setTimeout(function () {
      relogar();
    }, 60000);
  }, 9600000);
}

function SelectAndMoveMouse(TAM, x, y, width, height, Colors, fakecolor) {
  var counter = 0;

  for (var i = 1; i <= TAM; i++) {
    verifyKick();
    VerifyTimeout();
    var SetChar = getCoordsFromPixel(x, y, width, height, Colors, fakecolor);
    robot.moveMouse(1093, 495);
    robot.setMouseDelay(1000);
    if (SetChar.x && SetChar.y) {
      robot.setMouseDelay(1000);
      robot.moveMouse(SetChar.x, SetChar.y);
      robot.mouseClick();
    } else {
      counter++;
      console.log(counter);
    }
  }
  return counter;
}
function VerifyTimeout() {
  var timeout = getCoordsFromPixelRelogar(963, 223, 'd60408');
  if (timeout === true) {
    console.log('Timeout');
    robot.moveMouse(963, 223);
    robot.mouseClick();
    robot.keyTap('f5');
    setTimeout(() => {
      relogar();
    }, 60000);
  }
}

function verifyKick(interval) {
  var kickout = getCoordsFromPixelRelogar(743, 379, '461310');
  if (kickout === true) {
    interval ? clearInterval(interval) : null;
    console.log('Kickado');
    robot.moveMouse(694, 517);
    robot.mouseClick();
    robot.keyTap('f5');
    setTimeout(() => {
      relogar();
    }, 60000);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SelectHeroes(width, height) {
  SelectAndMoveMouse(
    5,
    width === 1366 && height === 768 ? 1114 : 1071,
    width === 1366 && height === 768 ? 634 : 759,
    54,
    60,
    ['b7b7c0', '9a9294', 'cec3bd', '312c39', 'fffff7', '757278', '422831']
  );

  //
  for (var i = 0; i <= 2; i++) {
    var contadorSaiu = SelectAndMoveMouse(
      10,
      width === 1366 && height === 768 ? 622 : 581,
      width === 1366 && height === 768 ? 516 : 652,
      57,
      324,
      ['73935e', '3d7962', '7c9e52', '5b875f']
    );
    if (contadorSaiu >= 5) {
      console.log('Entrou');
      robot.moveMouse(530, 616);
      robot.setMouseDelay(1000);
      robot.mouseToggle('down');
      robot.moveMouseSmooth(537, 237);
      robot.mouseToggle('up');
    }
  }
  console.log('width:', width);
  robot.moveMouse(
    width === 1366 && height === 768 ? 749 : 718,
    width === 1366 && height === 768 ? 212 : 341
  );
  robot.mouseClick();
  robot.setMouseDelay(1000);
  robot.moveMouse(
    width === 1366 && height === 768 ? 708 : 670,
    width === 1366 && height === 768 ? 411 : 531
  );
  robot.mouseClick();
}

function MainWay(width, height) {
  SelectHeroes(width, height);
  var interval2 = setInterval(function () {
    buttonBackAndGo(width, height);
    verifyKick(interval2);
  }, 900000);

  var interval3 = setInterval(function () {
    buttonClickTela(width, height);
    verifyKick(interval3);
  }, 10000);

  setTimeout(function () {
    clearInterval(interval2);
    clearInterval(interval3);
    robot.keyTap('f5');
    console.log('Acabou o fluxo');
  }, 2400000);
}
function buttonClickTela(width, height) {
  var buttonClickTela = SelectAndMoveMouse(
    10,
    width === 1366 && height === 768 ? 754 : 691,
    width === 1366 && height === 768 ? 576 : 714,
    301,
    150,
    ['ff7323', 'ffaa23', 'ffdb23', 'b53d19', 'ff9600', 'e6b7a7']
  );
  if (buttonClickTela >= 5) {
    console.log('Sem Botão Presente');
    robot.moveMouse(getRandomInt(400, 500), getRandomInt(400, 500));
    robot.mouseClick('left');
  }
}

function buttonBackAndGo(width, height) {
  SelectAndMoveMouse(
    10,
    width === 1366 && height === 768 ? 265 : 224,
    width === 1366 && height === 768 ? 133 : 259,
    59,
    50,
    ['a5d386', 'a1d186', '588f75', '76e279', '86c388']
  );
  robot.setMouseDelay(1000);
  SelectHeroes(width, height);
}

function relogar() {
  var screenSize = robot.getScreenSize();
  console.log('Relogou');
  robot.setMouseDelay(1000);
  robot.moveMouse(
    screenSize.width === 1366 && screenSize.height === 768 ? 604 : 656,
    screenSize.width === 1366 && screenSize.height === 768 ? 537 : 705
  );
  robot.mouseClick();

  var saidaRelogar = getCoordsFromPixelRelogar(
    screenSize.width === 1366 && screenSize.height === 768 ? 587 : 543,
    screenSize.width === 1366 && screenSize.height === 768 ? 452 : 580,
    screenSize.width === 1366 && screenSize.height === 768 ? 'eb8223' : 'f68c24'
  );
  console.log('saidaRelogar:', saidaRelogar);
  if (saidaRelogar === true) {
    console.log('Achou o botao 1');
    robot.moveMouse(
      screenSize.width === 1366 && screenSize.height === 768 ? 587 : 543,
      screenSize.width === 1366 && screenSize.height === 768 ? 452 : 580
    );
    robot.mouseClick();
  } else {
    console.log('Não achou botao 1');
  }
  var intervalRelogar2 = setInterval(function () {
    var saidaRelogar2 = getCoordsFromPixelRelogar(1231, 556, '037dd6');
    if (saidaRelogar2 === true) {
      for (var i = 0; i <= 3; i++) {
        console.log('Achou o botao 2');
        robot.moveMouse(1231, 556);
        robot.mouseClick();
      }
      clearInterval(intervalRelogar2);
    } else {
      console.log('Não achou');
    }
  }, 8000);
  var contador = 0;
  var intervalRelogar3 = setInterval(function () {
    var saidaRelogar3 = getCoordsFromPixelRelogar(
      652,
      548,
      screenSize.width === 1366 && screenSize.height === 768
        ? 'b56d52'
        : 'c5b23f'
    );
    if (saidaRelogar3 === true) {
      console.log('Achou a tela principal');
      clearInterval(intervalRelogar3);
      MainWay(screenSize.width, screenSize.height);
    } else {
      contador = contador + 1;
      console.log('Contador:', contador);
      console.log('Não achou');
      if (contador >= 8) {
        robot.keyTap('f5');
        clearInterval(intervalRelogar3);
        setTimeout(function () {
          IniciarBot();
        }, 60000);
      }
    }
  }, 10000);
}
ipcMain.on('StartBot', () => {
  IniciarBot();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
