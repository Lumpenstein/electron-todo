import {BrowserWindow} from 'electron';

export default class TrayWindow extends BrowserWindow {

  private trayWindow: TrayWindow | null;

  constructor(options) {
    super(options);

    this.trayWindow = options.trayWindow;

    // Load addTodo content
    this.loadURL(options.url);

    // Emitted when the window is closed.
    this.on('closed', this.onCLosed); // For GC
  }

  onCLosed() {
    this.trayWindow = null;
  }

}
