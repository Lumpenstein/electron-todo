import { app } from 'electron';
import { createAddTodoWindow } from '../windows';

export const menuTemplate = [
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
// Add an empty menu for macOs, else first entry gets merged in AppName menu
if (process.platform === 'darwin') {
  // @ts-ignore
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
      label: 'View',
      submenu: [
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
