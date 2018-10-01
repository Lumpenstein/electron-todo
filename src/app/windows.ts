import {app, BrowserWindow, Menu, Tray, ipcMain} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';

import {applicationMenuTemplate} from './menus/applicationMenu';
import {TODOLIST_ADD, TODOLIST_CLEAR} from './utils/ipcCommands';
import * as path from 'path';

// __dirname === /src/app/

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export let mainWindow: Electron.BrowserWindow | null = null;
export let addTodoWindow: Electron.BrowserWindow | null = null;
export let trayWindow: Electron.BrowserWindow | null = null;
export let tray: Electron.Tray | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

export const createMainWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800
  });

  // and load the main.html of the app.
  mainWindow.loadURL(`file://${__dirname}/views/main/main.html`);

  // Set mainMenu on mainWindow
  const mainMenu = Menu.buildFromTemplate(applicationMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Close other windows
    if (addTodoWindow) {
      addTodoWindow.close();
    }

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null; // For GC

    // Close app if mainWindow closed
    app.quit();
  });

  // Listen to addToDoWindow
  ipcMain.on(TODOLIST_ADD, (event: any, todo: any) => {
    // Relay data to the mainWindow and close addTodoWindow
    if (todo && todo.length > 0) {
      mainWindow!.webContents.send(TODOLIST_ADD, todo);
      addTodoWindow!.close();
      addTodoWindow = null; // For GC
    }
  });
};

export const createAddTodoWindow = () => {
  // If addTodoWindow already opened bring it to foreground and center it on the screen
  if (addTodoWindow) {
    addTodoWindow.focus();
    addTodoWindow.center();

    // Create new addTodoWindow
  } else {
    addTodoWindow = new BrowserWindow({
      title: 'Add a new Todo',
      width: 450,
      height: 300
    });
    addTodoWindow.center();
  }

  // Load addTodo content
  addTodoWindow.loadURL(`file://${__dirname}/views/addTodo/addTodo.html`);

  // Open the DevTools
  if (isDevMode) {
    addTodoWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  addTodoWindow.on('closed', () => {
    addTodoWindow = null;
  }); // For GC
};

export const createTrayWindow = () => {
  // If addTodoWindow already opened bring it to foreground and center it on the screen
  if (trayWindow) {
    trayWindow.focus();

    // Create new trayWindow
  } else {
    trayWindow = new BrowserWindow({
      title: 'Add a new Todo',
      width: 300,
      height: 100,
      frame: false,
      resizable: false
    });
  }

  // Load addTodo content
  trayWindow.loadURL(`file://${__dirname}/views/tray/tray.html`);

  // Open the DevTools
  // if (isDevMode) {
  //   trayWindow.webContents.openDevTools();
  // }

  // Emitted when the window is closed.
  trayWindow.on('closed', () => {
    trayWindow = null;
  }); // For GC

  // Get tray icon on every OS
  const iconName = 'trayIcon.png';
  const iconPath = path.join(__dirname, '../assets/', iconName);

  const trayMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);

  // Create Tray
  tray = new Tray(iconPath);
  tray.setToolTip('Todos');
  tray.setContextMenu(trayMenu);

};

export const clearTodoList = () => {
  mainWindow.webContents.send(TODOLIST_CLEAR, {});
};
