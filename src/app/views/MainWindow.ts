import {app, BrowserWindow, Menu} from 'electron';

export interface MainWindowConstructorOptions extends Electron.BrowserWindowConstructorOptions {
  url: string;
  useApplicationMenu: boolean;
  menuTemplate: Electron.MenuItemConstructorOptions[];
  closeWindows: Electron.BrowserWindow[] | any[];
  closeApp: boolean;
  mainWindow: MainWindow | null;
}

export default class MainWindow extends BrowserWindow {

  private mainWindow: MainWindow | null;

  constructor(options: MainWindowConstructorOptions) {
    super(options);

    this.mainWindow = options.mainWindow;

    this.loadURL(options.url);

    const mainMenu = Menu.buildFromTemplate(options.menuTemplate);

    if (options.useApplicationMenu) {
      Menu.setApplicationMenu(mainMenu);
    } else {
      console.warn('individual menus not yet implemented');
      // TaskObject Use mainWindow.setMenu...
    }

    // Emitted when the window is closed.
    this.on('closed', () => this.onClosed.bind(this, options.closeWindows, options.closeApp)); // For GC
  }

  onClosed(closeWindows: Electron.BrowserWindow[], closeApp: boolean) {
    // Close other windows
    for (let window of closeWindows) {
      if (window) {
        window.close();
      }
    }

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    this.mainWindow = null; // For GC

    if (closeApp) {
      // Close app if mainWindow closed
      app.quit();
    }
  }

}
