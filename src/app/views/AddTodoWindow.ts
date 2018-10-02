import {BrowserWindow} from 'electron';

export default class AddTodoWindow extends BrowserWindow {

  private addTodoWindow: AddTodoWindow | null;

  constructor(options) {
    super(options);

    this.addTodoWindow = options.addTodoWindow;

    // Load addTodo content
    this.loadURL(options.url);

    // Emitted when the window is closed.
    this.on('closed', this.onCLosed); // For GC
  }

  onCLosed() {
    this.addTodoWindow = null;
  }

}
