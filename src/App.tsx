import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import state, {TaskType} from "./redux/state";
import {v1} from 'uuid';
import {FILTERS} from "./common/constants";

export type FilterValueType = typeof FILTERS.ALL | typeof FILTERS.COMPLETED | typeof FILTERS.ACTIVE;
export type RemoveTask = (id: string) => void;
export type ChangeFilter = (value: FilterValueType) => void;
export type AddTask = (title: string) => void;
export type ChangeStatus = (taskId: string, isDone: boolean) => void;

const App = () => {
  let initTasks: Array<TaskType> = state.tasks;
  let [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
  let [filter, setFilter] = useState<FilterValueType>(FILTERS.ALL);

  const changeFilter: ChangeFilter = (value) => {
    setFilter(value);
  };

  const removeTask: RemoveTask = (id) => {
    let filteredTasks: Array<TaskType> = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks)
  };

  const addTask: AddTask = (title) => {
    setTasks([...tasks, {id: v1(), title: title, isDone: false}]);
  };

  const changeStatus: ChangeStatus = (taskId, isDone) => {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  };

  const getTasksForTodoList = () => {
    switch (filter) {
      case FILTERS.COMPLETED:
        return tasks.filter(t => t.isDone);

      case FILTERS.ACTIVE:
        return tasks.filter(t => !t.isDone);

      default:
        return tasks;
    }
  }

  return (
    <div className="App">
      <TodoList
        titleList={state.todoListTitle}
        tasks={getTasksForTodoList()}
        removeTask={removeTask}
        addTask={addTask}
        changeFilter={changeFilter}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
