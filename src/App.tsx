import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import state, {TaskType} from "./redux/state";
import {FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE} from './common/constants';

export type FilterValueType = typeof FILTER_ALL | typeof  FILTER_COMPLETED | typeof  FILTER_ACTIVE;

function App() {
  let initTasks: Array<TaskType> = state.tasks;
  let [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
  let [filter, setFilter] = useState<FilterValueType>(FILTER_ALL);

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  function getTasksForTodoList() {
    switch (filter) {
      case FILTER_COMPLETED:
        return tasks.filter(t => t.isDone);

      case FILTER_ACTIVE:
        return tasks.filter(t => !t.isDone);

      default:
        return tasks;
    }
  }

  function removeTask(id: number) {
    let filteredTasks: Array<TaskType> = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks)
  }

  return (
    <div className="App">
      <TodoList title={state.todoListTitle}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
