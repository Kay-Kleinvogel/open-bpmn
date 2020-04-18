const { app, BrowserWindow, Menu, dialog } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;
let ipcm = require("electron").ipcMain;

const isMac = process.platform === "darwin";

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: __dirname + "/logo.png",
  });
  // mainWindow.setIcon("./logo.png");

  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("close", function (e) {
    var choice = dialog.showMessageBoxSync(this, {
      type: "question",
      buttons: ["Yes", "No"],
      title: "Confirm",
      message: "Are you sure you want to quit?",
      detail: "All you unsaved progress will be lost!",
    });
    if (choice === 1) {
      e.preventDefault();
    }
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activated", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

// TODO: extract to seperate file
const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
      {
        label: app.name,
        submenu: [
          { role: "about" },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideothers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" },
        ],
      },
    ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      {
        label: "Open File",
        accelerator: "CmdOrCtrl+O",
        click: () => {
          mainWindow.webContents.send("openFile");
        },
      },
      {
        label: "Save File",
        accelerator: "CmdOrCtrl+S",
        click: () => {
          mainWindow.webContents.send("saveFile");
        },
      },
      {
        label: "Save As",
        click: () => {
          mainWindow.webContents.send("saveAs");
        },
      },
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "toggledevtools", enabled: true },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      ...(isMac
        ? [
          { type: "separator" },
          { role: "front" },
          { type: "separator" },
          { role: "window" },
        ]
        : [{ role: "close" }]),
    ],
  },
];
