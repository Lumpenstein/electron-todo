import * as path from 'path';
import {ipcMain} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';

import {MainWindow , TrayWindow, AddTaskWindow, CustomTray} from './views/index';
import {applicationMenuTemplate, trayContextMenuTemplate} from './menus/index';
import {TASK_LIST_ADD} from './utils/ipcCommands';
import Task from './views/Task';

// __dirname === /src/app/

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export let mainWindow: MainWindow | null = null;
export let addTaskWindow: AddTaskWindow | null = null;
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
    closeWindows: [addTaskWindow],
    closeApp: true,
    mainWindow: mainWindow
  });

  // Install and open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Listen to addTaskWindow
  ipcMain.on(TASK_LIST_ADD, (_event: Electron.Event , task: Task) => {

    console.log('task', task);
    console.log('name', task.taskName);

    if (task && task.taskName && task.taskName.length > 0) {
      // Relay data to the mainWindow and close addTaskWindow
      if (mainWindow) {
        mainWindow.webContents.send(TASK_LIST_ADD, task);
      }
      if (addTaskWindow) {
        addTaskWindow.close();
        addTaskWindow = null; // For GC
      }
    }
  });
};

export const createAddTaskWindow = () => {
  // If addTaskWindow already opened bring it to foreground and center it on the screen
  if (addTaskWindow) {
    addTaskWindow.focus();
    addTaskWindow.center();

    // Create new addTaskWindow
  } else {
    addTaskWindow = new AddTaskWindow({
      title: 'Add a new TaskObject',
      width: 450,
      height: 300,
      url: `file://${__dirname}/views/addTask/addTask.html`,
      menuTemplate: [],
      parent: mainWindow as Electron.BrowserWindow,
      modal: true,
      addTaskWindow: addTaskWindow
    });
    if (addTaskWindow) {
      addTaskWindow.center();
    }
  }

  // Open the DevTools
  if (isDevMode && addTaskWindow) {
    addTaskWindow.webContents.openDevTools();
  }
};

export const createTrayWindow = () => {
  // If addTaskWindow already opened bring it to foreground and center it on the screen
  if (trayWindow) {
    trayWindow.focus();
    // Create new trayWindow
  } else {
    trayWindow = new TrayWindow({
      title: 'Add a new TaskObject',
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
    tooltip: 'Tasks',
    contextMenuTemplate: trayContextMenuTemplate
  });
};
