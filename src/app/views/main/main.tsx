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

    ipcRenderer.on('todoList:clear', () => {
      this.setState({
        todoList: []
      });
    });
  }

  addTodo = (todo: string) => {
    const todoList = this.state.todoList;

    // Check if not already in list
    if (!todoList.find(todoInList => todoInList === todo)){
      todoList.push(todo);
    }

    this.setState({
      todoList: todoList
    });
  };

  render() {
    const todoList = this.state.todoList;

    return (
      <div>
        <h2>Todos:</h2>
        <ul>
          { todoList.map( todo => {
            return (
              <li key={todo}>
                { todo }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
