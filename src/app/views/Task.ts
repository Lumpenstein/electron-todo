export interface TaskConstructorOptions {
  taskName: string;
  creationDate: number;
}

export default class Task {

  public creationDate: number;
  public taskName: string;

  constructor(options: TaskConstructorOptions) {
    this.taskName = options.taskName;
    this.creationDate = options.creationDate;
  }

}
