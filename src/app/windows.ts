import {app, BrowserWindow, Menu, ipcMain} from 'electron';

import {applicationMenuTemplate} from './menus/applicationMenu';
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';

// __dirname === /src/app/

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export let mainWindow: Electron.BrowserWindow | null = null;
export let addTodoWindow: Electron.BrowserWindow | null = null;

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
  mainWindow.setMenu(mainMenu);

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
  ipcMain.on('todo:add', (event: any, todo: any) => {
    // Relay data to the mainWindow and close addTodoWindow
    if (todo && todo.length > 0) {
      mainWindow!.webContents.send('todo:add', todo);
      addTodoWindow!.close();
      addTodoWindow = null; // For GC
    }
  });
};

export const createAddTodoWindow = () => {
  addTodoWindow = new BrowserWindow({
    title: 'Add a new Todo',
    width: 450,
    height: 300
  });

  // Load addTodo content
  addTodoWindow.loadURL(`file://${__dirname}/views/addTodo/addTodo.html`);

  // Open the DevTools.
  if (isDevMode) {
    addTodoWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  addTodoWindow.on('closed', () => {
    addTodoWindow = null;
  }); // For GC
};

export const clearTodoList = () => {
  mainWindow.webContents.send('todoList:clear', {});
};
