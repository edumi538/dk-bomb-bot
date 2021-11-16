const { Tray } = require("electron");
const { resolve } = require("path");

const iconPath = resolve(__dirname, "../", "assets",'time-bomb.png');

function createTray() {
  const tray = new Tray(iconPath);
  tray.setToolTip("DK Bomb Bot")

  return tray;
}

module.exports = createTray();