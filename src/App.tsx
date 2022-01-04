import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import {initialStateTasks, TaskType, todoList, TodoListsType, TodoListTasksType} from "./redux/state";
import {v1} from 'uuid';
import {FILTERS} from "./common/constants";

export type FilterValueType = typeof FILTERS.ALL | typeof FILTERS.COMPLETED | typeof FILTERS.ACTIVE;
export type RemoveTask = (id: string, todoListId: string) => void;
export type ChangeFilter = (value: FilterValueType, todoListId: string) => void;
export type AddTask = (title: string, todoListId: string) => void;
export type ChangeStatus = (taskId: string, isDone: boolean, todoListId: string) => void;
export type RemoveTodoList = (id: string) => void;

const App = () => {
  const [tasks, setTasks] = useState<TodoListTasksType>(initialStateTasks);
  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>(todoList);

  const removeTodoList: RemoveTodoList = (id) => {
    setTodoLists(todoLists.filter(t => t.id !== id));
    delete tasks[id];
    setTasks({...tasks});
  }
  const changeFilter: ChangeFilter = (value, todoListId) => {
    let todoList = todoLists.find(t => t.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };
  const addTask: AddTask = (title, todoListId) => {
    let task = {id: v1(), title: title, isDone: false};
    let newTasks = tasks[todoListId];
    tasks[todoListId] = [task, ...newTasks];
    setTasks({...tasks});
  };
  const removeTask: RemoveTask = (id, todoListId) => {
    let todolistTasks = tasks[todoListId];
    tasks[todoListId] = todolistTasks.filter((t: TaskType) => t.id !== id)
    setTasks({...tasks});
  };
  const changeStatus: ChangeStatus = (taskId, isDone, todoListId) => {
    let todoListTasks = tasks[todoListId];
    let task = todoListTasks.find((t: TaskType) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasks});
    }
  };

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
