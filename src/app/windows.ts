import * as path from 'path';
import {app, Menu, ipcMain} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';

import {MainWindow , TrayWindow, AddTodoWindow, CustomTray} from './views/index';
import {applicationMenuTemplate, trayMenuTemplate} from './menus/index';
import {TODOLIST_ADD} from './utils/ipcCommands';

// __dirname === /src/app/

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export let mainWindow: MainWindow | null = null;
export let addTodoWindow: AddTodoWindow | null = null;
export let trayWindow: TrayWindow | null = null;
export let tray: CustomTray | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

export const createMainWindow = async () => {
  // Create the main window.
  mainWindow = new MainWindow({
    width: 600,
    height: 800,
    url: `file://${__dirname}/views/main/main.html`,
    useApplicationMenu: true,
    menuTemplate: applicationMenuTemplate,
    isDevMode: isDevMode,
    closeWindows: [addTodoWindow],
    closeApp: true,
    mainWindow: mainWindow
  });

  // Install and open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Listen to addToDoWindow
  ipcMain.on(TODOLIST_ADD, (event: any, todo: any) => {
    if (todo && todo.length > 0) {
      // Relay data to the mainWindow and close addTodoWindow
      mainWindow.webContents.send(TODOLIST_ADD, todo);
      addTodoWindow.close();
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
    addTodoWindow = new AddTodoWindow({
      title: 'Add a new Todo',
      width: 450,
      height: 300,
      url: `file://${__dirname}/views/addTodo/addTodo.html`,
      addTodoWindow: addTodoWindow
    });
    addTodoWindow.center();
  }

  // Open the DevTools
  if (isDevMode) {
    addTodoWindow.webContents.openDevTools();
  }
};

export const createTrayWindow = () => {
  // If addTodoWindow already opened bring it to foreground and center it on the screen
  if (trayWindow) {
    trayWindow.focus();
    // Create new trayWindow
  } else {
    trayWindow = new TrayWindow({
      title: 'Add a new Todo',
      width: 300,
      height: 100,
      frame: false,
      resizable: false,
      show: false,
      url: `file://${__dirname}/views/tray/tray.html`,
      trayWindow: trayWindow
    });
  }

  // Get tray icon on every OS
  const iconName = 'trayIcon.png';
  const iconPath = path.join(__dirname, '../assets/', iconName);

  // Create TrayIcon and set right-click menu
  tray = new CustomTray({
    iconPath: iconPath,
    trayWindow: trayWindow,
    tooltip: 'Todos',
    trayMenuTemplate: trayMenuTemplate
  });
};
