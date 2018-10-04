export const trayContextMenuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Quit',
    type: 'normal',
    click() {
      console.log("quit")
    }
  },
  {
    label: 'Item2',
    type: 'radio'
  },
  {
    label: 'Item3',
    type: 'radio'
  },
  {
    label: 'Item4',
    type: 'radio'
  }
];

