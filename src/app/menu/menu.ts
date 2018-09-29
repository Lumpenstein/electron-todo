import { app } from 'electron';

export const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        click() {
          console.log('Adding new todo');
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
  menuTemplate.unshift({});
}
