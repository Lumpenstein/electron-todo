import {app} from 'electron';
import {createAddTaskWindow, createTrayWindow, mainWindow} from '../app';
import {TASK_LIST_CLEAR} from '../../src/app/utils/ipcCommands';

export const applicationMenuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New TaskObject',
        click() {
          createAddTaskWindow();
        },
        accelerator: (() => {
          return 'Ctrl+N';
        })()
      },
      {
        label: 'Clear Tasks',
        click() {
          clearTaskList();
        },
        accelerator: (() => {
          return 'Ctrl+C';
        })()
      },
      {
        label: 'Launch Tray service',
        click() {
          createTrayWindow();
        },
        accelerator: (() => {
          return 'Ctrl+T';
        })()
      },
      {
        label: 'Quit',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Command+Q';
          } else if (process.platform === 'win32') {
            return 'Ctrl+Q';
          }
          return 'Ctrl+Q';
        })(),
        click() {
          app.quit();
        }
      }
    ]
  }
];
// Add an empty menus for macOs, else first entry gets merged in AppName menus
if (process.platform === 'darwin') {
  // @ts-ignore
  applicationMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  applicationMenuTemplate.push({
      label: 'View',
      submenu: [
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          click(_item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
            focusedWindow.webContents.toggleDevTools();
          },
          accelerator: (() => {
            return 'Ctrl+I';
          })(),
        }
      ]
    }
  );
}

const clearTaskList = () => {
  if (mainWindow) {
    mainWindow!.webContents.send(TASK_LIST_CLEAR, {});
  }
};
