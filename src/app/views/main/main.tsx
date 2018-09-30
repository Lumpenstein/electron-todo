import * as React from 'react';

import { ipcRenderer } from 'electron';

export class Main extends React.Component<any, any> {

  state = {
    todoList: []
  };

  componentDidMount() {
    ipcRenderer.on('todo:add', (event: any, todo: any) => {
      this.addTodo(todo);
    });
  }

  addTodo = (todo: string) => {
    const todoList = this.state.todoList;

    todoList.push(todo);

    this.setState({
      todoList: todoList
    });
  };

  render() {
    const todoList = this.state.todoList;

    return (
      <div>
        <h2>todoList:</h2>
        { todoList.map( todo => {
          return (
            <div>{ todo }</div>
          );
        })}
      </div>
    );
  }
}
