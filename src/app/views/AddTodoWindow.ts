import {BrowserWindow} from 'electron';

export interface AddTodoWindowConstructorOptions extends Electron.BrowserWindowConstructorOptions{
  url: string;
  menuTemplate: Electron.MenuItemConstructorOptions[];
  addTodoWindow: AddTodoWindow | null;
}

export default class AddTodoWindow extends BrowserWindow {

  private addTodoWindow: AddTodoWindow | null;

  constructor(options: AddTodoWindowConstructorOptions) {
    super(options);

    this.addTodoWindow = options.addTodoWindow;

    // Load addTodo content
    this.loadURL(options.url);

    // Emitted when the window is closed.
    this.on('closed', this.onClosed); // For GC
  }

  onClosed() {
    this.addTodoWindow = null;
  }

}
