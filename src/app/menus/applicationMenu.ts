import { app } from 'electron';
import { createAddTodoWindow, clearTodoList } from '../windows';

export const applicationMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        click() {
          createAddTodoWindow();
        }
      },
      {
        label: 'Clear Todos',
        click() {
          clearTodoList();
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
          return'Ctrl+Q';
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
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          },
          accelerator: (() => {
            return'Ctrl+I';
          })(),
        }
      ]
    }
  );
}
