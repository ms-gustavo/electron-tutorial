// Main Process
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  Tray,
} = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");

function createSplashWindow() {
  // BrowserWindow <-- Renderer Process
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    backgroundColor: "#6e707e",
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("splash.html");
  return win;
}

function createWindow() {
  // BrowserWindow <-- Renderer Process
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#6e707e",
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  isDev && win.webContents.openDevTools();
  return win;
}
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}

let tray = null;

app.whenReady().then(() => {
  const template = require("./utils/Menu").createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);

  const splash = createSplashWindow();
  const mainApp = createWindow();

  mainApp.once("ready-to-show", () => {
    // splash.destroy();
    // mainApp.show();
    setTimeout(() => {
      splash.destroy();
      mainApp.show();
    }, 3000);
  });
});

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

ipcMain.on("app-quit", () => {
  app.quit();
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
