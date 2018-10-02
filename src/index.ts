import { app } from 'electron';
import {enableLiveReload} from 'electron-compile';

import {createMainWindow, mainWindow} from './app/app';

// Could also use process.env.NODE_ENV to determine if production/development/test/staging
const isDevMode = process.execPath.match(/[\\/]electron/);
if (isDevMode) {
  enableLiveReload({strategy: 'react-hmr'});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menus bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
