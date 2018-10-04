import {app} from 'electron';
import {createAddTaskWindow, createTrayWindow, mainWindow} from '../app';
import {TASK_LIST_CLEAR} from '../utils/ipcCommands';

export const applicationMenuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New TaskObject',
        click() {
          createAddTaskWindow();
        }
      },
      {
        label: 'Clear Todos',
        click() {
          clearTodoList();
        }
      },
      {
        label: 'Launch Tray service',
        click() {
          createTrayWindow();
        }
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
          click({} /* item: Electron.Item */, focusedWindow: Electron.BrowserWindow) {
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

const clearTodoList = () => {
  if (mainWindow) {
    mainWindow!.webContents.send(TASK_LIST_CLEAR, {});
  }
};
