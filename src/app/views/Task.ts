export interface TaskConstructorOptions {
  taskName: string;
  created: number;
}

export default class Task {

  private _created: number;
  private _taskName: string;

  constructor(options: TaskConstructorOptions) {
    this._taskName = options.taskName;
    this._created = options.created;
  }

  get taskName(): string {
    return this._taskName;
  }

  get created(): number {
    return this._created;
  }

}
