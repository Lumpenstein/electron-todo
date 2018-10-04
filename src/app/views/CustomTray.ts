import { Tray, Menu } from 'electron';
import TrayWindow from './TrayWindow';

export interface CustomTrayConstructorOptions {
  iconPath: string;
  tooltip: string;
  contextMenuTemplate: Electron.MenuItemConstructorOptions[];
  trayWindow: TrayWindow | null;
}

export default class CustomTray extends Tray {

  private trayWindow: TrayWindow | null;

  constructor(options: CustomTrayConstructorOptions) {
    super(options.iconPath);

    this.trayWindow = options.trayWindow;

    // Tray Icon click listener
    this.on('click', this.onLeftClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));

    this.setToolTip(options.tooltip);

    // Create and set context (right click) menu
    const trayMenu = Menu.buildFromTemplate(options.contextMenuTemplate);
    this.setContextMenu(trayMenu);
  }

  onLeftClick(event: Electron.Event, bounds: Electron.Rectangle) {
    console.log('left click');
    toggleTrayWindowVisibility(event, bounds, this.trayWindow);
  }

  onRightClick(event: Electron.Event, bounds: Electron.Rectangle) {
    console.log('right click');
    toggleTrayWindowVisibility(event, bounds, this.trayWindow);
  }
}

const toggleTrayWindowVisibility = ({} /* event */, bounds: Electron.Rectangle, trayWindow: TrayWindow | null) => {
  // Position and toggle visibility on left-click
  if (trayWindow) {

    if (trayWindow.isVisible()) {
      trayWindow.hide();

    } else {
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
      }

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
