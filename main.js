// Main Process
const { app, BrowserWindow } = require("electron");

function createWindow() {
  // BrowserWindow <-- Renderer Process
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      // is a feature that ensures that both, your preload scripts and
      // Electron internal logic tun in separated context
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
