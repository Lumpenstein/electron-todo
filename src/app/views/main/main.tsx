import * as React from 'react';

import { ipcRenderer } from 'electron';
import {TASK_LIST_ADD, TASK_LIST_CLEAR} from '../../utils/ipcCommands';
import Task from '../Task';

export interface MainState {
  taskList: Task[];
}

export class Main extends React.Component<any, any> {

  state: MainState = {
    taskList: []
  };

  componentDidMount() {
    ipcRenderer.on(TASK_LIST_ADD, (_Event: Electron.Event, task: Task) => {
      this.addTask(task);
    });

    ipcRenderer.on(TASK_LIST_CLEAR, () => {
      this.setState({
        taskList: []
      });
    });
  }

  addTask = (task: Task) => {
    const taskList = this.state.taskList;

    // Check if not already in list
    if (!taskList.find(taskInList => taskInList === task)) {
      taskList.push(task);
    }

    this.setState({
      taskList: taskList
    });
  };

  render() {
    const taskList = this.state.taskList;

    return (
      <div>
        <h2>Tasks:</h2>
        <ul>
          { taskList.map( task => {
            return (
              <li key={task.creationDate.toString()}>
                { task.taskName }
                { new Date(task.creationDate).toString() }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
