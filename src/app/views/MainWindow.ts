import {app, BrowserWindow, Menu, ipcMain} from 'electron';

export default class MainWindow extends BrowserWindow {

  private mainWindow: MainWindow | null;

  constructor(options) {
    super(options);

    this.mainWindow = options.mainWindow;

    this.loadURL(options.url);

    const mainMenu = Menu.buildFromTemplate(options.menuTemplate);

    if (options.useApplicationMenu) {
      Menu.setApplicationMenu(mainMenu);
    } else {
      console.warn("individual menus not yet implemented")
      // Todo Use
    }

    // Emitted when the window is closed.
    this.on('closed', () => this.onCLosed(options.closeWindows, options.closeApp)); // For GC
  }

  onCLosed(closeWindows, closeApp) {
    // Close other windows
    for(let window in this.closeWindows) {
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
