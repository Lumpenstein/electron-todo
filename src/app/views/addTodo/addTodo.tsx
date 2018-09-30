import * as React from 'react';

export class AddTodo extends React.Component<undefined, undefined> {

  addNewTodo = (event: any) => {
    if (event !== null) {
      event.preventDefault();
      const todo = event.target;
      console.log(todo);
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
