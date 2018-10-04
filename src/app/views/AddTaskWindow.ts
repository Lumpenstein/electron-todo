import {BrowserWindow} from 'electron';

export interface AddTaskWindowConstructorOptions extends Electron.BrowserWindowConstructorOptions {
  url: string;
  menuTemplate: Electron.MenuItemConstructorOptions[];
  addTaskWindow: AddTaskWindow | null;
}

export default class AddTaskWindow extends BrowserWindow {

  private addTaskWindow: AddTaskWindow | null;

  constructor(options: AddTaskWindowConstructorOptions) {
    super(options);

    this.addTaskWindow = options.addTaskWindow;

    // Load addTask content
    this.loadURL(options.url);

    // Show window on ready
    this.once('ready-to-show', () => {
      this.show();
    });

    // Emitted when the window is closed.
    this.on('closed', this.onClosed.bind(this)); // For GC
  }

  onClosed() {
    this.addTaskWindow = null;
  }

}
