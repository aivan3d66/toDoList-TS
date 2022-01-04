import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import {initialStateTasks, TaskType, todoList, TodoListsType, TodoListTasksType} from "./redux/state";
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
    setTasks(tasks.filter((t) => t.id !== id))
  };

  const addTask: AddTask = (title) => {
    setTasks([...tasks, {id: v1(), title: title, isDone: false}]);
  };

  const changeStatus: ChangeStatus = (taskId, isDone) => {
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t));
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
