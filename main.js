// Main Process
const { app, BrowserWindow, Notification } = require("electron");
const path = require("path");

function createWindow() {
  // BrowserWindow <-- Renderer Process
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  // const notification = new Notification({
  //   title: "Hello World",
  //   body: "My test message",
  // });
  // notification.show();
  const parsed = path.parse("/home/user/dir/file.txt");
  console.log(parsed.base);
  console.log(parsed.ext);
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
