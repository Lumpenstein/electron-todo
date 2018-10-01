import * as React from 'react';

import { ipcRenderer } from 'electron';
import {TODOLIST_ADD} from '../../utils/ipcCommands';

export class AddTodo extends React.Component<any, any> {

  addNewTodo = (event: any) => {
    if (event !== null) {

      event.preventDefault();

      const todo = document.querySelector('input[data-id=inputAddTodo]').value;

      ipcRenderer.send(TODOLIST_ADD, todo);
    }
  };

  render() {
    return (
      <div>
        <h2>Add a new Todo!</h2>
        <form onSubmit={this.addNewTodo}>
          <div>
            <label htmlFor=''>Enter your new todo:</label>
            <input
              type='text'
              data-id='inputAddTodo'
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
