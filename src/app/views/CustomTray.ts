import { Tray, Menu } from 'electron';

export default class CustomTray extends Tray {

  private trayWindow: Electron.BrowserWindow;

  constructor(options) {
    super(options.iconPath);

    this.trayWindow = options.trayWindow;

    // Tray Icon click listener
    this.on('click', this.onClick);

    this.setToolTip(options.tooltip);

    // Create and set context (right click) menu
    const trayMenu = Menu.buildFromTemplate(options.trayMenuTemplate);
    this.setContextMenu(trayMenu);
  }

  onClick(event, bounds){
    trayClickListener(event, bounds, this.trayWindow);
  }
}

const trayClickListener = (event, bounds, trayWindow) => {

  // Calculate window position depending on OS
  const { x, y } = bounds;
  const {height, width} = trayWindow.getBounds();
  let windowX: number = 0;
  let windowY: number = 0;

  if (process.platform === 'darwin') {
    windowX = x - width / 2;
    windowY = y;
  } else {
    windowX = x;
    windowY = y - height;
  };

  // Position and toggle visibility on left-click
  if (trayWindow) {
    if (trayWindow.isVisible()) {
      trayWindow.hide();
    } else {
      trayWindow.setBounds({
        x: windowX,
        y: windowY,
        height: height,
        width: width
      });
      trayWindow.show();
    }
  } else {
    console.error('TrayWindow does not exist.');
  }
};

