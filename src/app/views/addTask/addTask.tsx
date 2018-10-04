import * as React from 'react';

import { ipcRenderer } from 'electron';
import {TASK_LIST_ADD} from '../../utils/ipcCommands';
import Task from '../Task';

export class AddTask extends React.Component<any, any> {

  addNewTask = (event: any) => {
    if (event !== null) {

      event.preventDefault();

      let task: Task | null = null;
      if (document && document.querySelector('input[data-id=inputAddTask]')) {
        const value = (document!.querySelector('input[data-id=inputAddTask]')! as HTMLInputElement).value;
        const date = Date.now();
        task = new Task({taskName: value, creationDate: date});
      }

      ipcRenderer.send(TASK_LIST_ADD, task);
    }
  };

  render() {
    return (
      <div>
        <h2>Add a new Task!</h2>
        <form onSubmit={this.addNewTask}>
          <div>
            <label htmlFor=''>Enter your new task:</label>
            <input
              type='text'
              data-id='inputAddTask'
              autoFocus
              minLength={1}
            />
          </div>
          <button type={'submit'}>Add</button>
        </form>
      </div>
    );
  }
}
