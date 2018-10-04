import {app} from 'electron';

export const trayContextMenuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Select Task to track',
    type: 'submenu',
    submenu: [
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
      }
    ]
  },
  {
    label: 'Mode 1',
    type: 'radio'
  },
  {
    label: 'Mode 2',
    type: 'radio'
  },
  {
    label: 'Quit',
    type: 'normal',
    click() {
      app.quit();
    }
  }
];

