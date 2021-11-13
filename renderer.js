const { ipcRenderer } = require("electron");

document.querySelector("#elem").addEventListener("click", () => {
  ipcRenderer.send("getPositionClick");
});

document.querySelector("#start").addEventListener("click",() =>{
  ipcRenderer.send("StartBot")
})