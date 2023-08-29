// Main Process
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
  // BrowserWindow <-- Renderer Process
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      // is a feature that ensures that both, your preload scripts and
      // Electron internal logic tun in separated context
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
  isDev && win.webContents.openDevTools();
}
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

app.whenReady().then(createWindow);

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

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

// Webpack -> is a module builder and the main purpose is to bundle JS files for usage in the browser
// Babel -> is a JS compiler. Get a high level JS code and refactore it into a lower lever JS
