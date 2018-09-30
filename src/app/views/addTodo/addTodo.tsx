import * as React from 'react';

import { ipcRenderer } from 'electron';

export class AddTodo extends React.Component<any, any> {

  addNewTodo = (event: any) => {
    if (event !== null) {

      event.preventDefault();

      const input = document.querySelector('input[data-id=inputAddTodo]').value;

      ipcRenderer.send('todo:add', input);
    }
  };

  render() {
    return (
      <div onSubmit={this.addNewTodo}>
        <h2>Add a new Todo!</h2>
        <form>
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
