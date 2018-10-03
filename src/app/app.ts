import * as path from 'path';
import {ipcMain} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';

import {MainWindow , TrayWindow, AddTodoWindow, CustomTray} from './views/index';
import {applicationMenuTemplate, trayContextMenuTemplate} from './menus/index';
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
  ipcMain.on(TODOLIST_ADD, ({} /* event */ , todo: any) => {
    if (todo && todo.length > 0) {
      // Relay data to the mainWindow and close addTodoWindow
      if (mainWindow) {
        mainWindow.webContents.send(TODOLIST_ADD, todo);
      }
      if (addTodoWindow) {
        addTodoWindow.close();
        addTodoWindow = null; // For GC
      }
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
      menuTemplate: [],
      parent: mainWindow as Electron.BrowserWindow,
      modal: true,
      addTodoWindow: addTodoWindow
    });
    if (addTodoWindow) {
      addTodoWindow.center();
    }
  }

  // Open the DevTools
  if (isDevMode && addTodoWindow) {
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
    contextMenuTemplate: trayContextMenuTemplate
  });
};
