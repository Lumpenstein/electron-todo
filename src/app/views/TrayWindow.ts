import {BrowserWindow} from 'electron';

export interface TrayWindowOptions extends Electron.BrowserWindowConstructorOptions {
  url: string;
  trayWindow: TrayWindow | null;
}

export default class TrayWindow extends BrowserWindow {

  private trayWindow: TrayWindow | null;

  constructor(options: TrayWindowOptions) {
    super(options);

    this.trayWindow = options.trayWindow;

    // Load addTask content
    this.loadURL(options.url);

    // Emitted when the window is closed.
    this.on('closed', this.onClosed.bind(this)); // For GC
  }

  onClosed() {
    this.trayWindow = null;
  }

}
