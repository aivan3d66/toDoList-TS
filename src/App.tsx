import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import {initialStateTasks, TaskType, todoList, TodoListsType, TodoListTasksType} from "./redux/state";
import {FILTERS} from "./common/constants";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValueType = typeof FILTERS.ALL | typeof FILTERS.COMPLETED | typeof FILTERS.ACTIVE;
export type RemoveTask = (todoListId: string, id: string) => void;
export type ChangeFilter = (todoListId: string, value: FilterValueType) => void;
export type AddTask = (todoListId: string, title: string) => void;
export type ChangeStatus = (todoListId: string, taskId: string, isDone: boolean) => void;
export type RemoveTodoList = (todoListId: string) => void;
export type ChangeTaskTitleType = (todoListId: string, taskId: string, newTitle: string) => void;

const App = () => {
  const [tasks, setTasks] = useState<TodoListTasksType>(initialStateTasks);
  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>(todoList);

  const addTodoList = (title: string) => {
    let todoList: TodoListsType = {
      id: v1(),
      filter: FILTERS.ALL,
      title: title
    }
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasks,
      [todoList.id]: []
    })
  };
  const removeTodoList: RemoveTodoList = (todoListId) => {
    setTodoLists(todoLists.filter(t => t.id !== todoListId));
    delete tasks[todoListId];
    setTasks({...tasks});
  }
  const changeFilter: ChangeFilter = (todoListId, value,) => {
    setTodoLists(todoLists.map(m => m.id === todoListId ? {...m, filter: value} : m));
  };
  const addTask: AddTask = (todoListId, title) => {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
  };
  const removeTask: RemoveTask = (todoListId, id) => {
    setTasks({...tasks, [todoListId]: tasks[todoListId].filter(f => f.id !== id)})
  };
  const changeStatus: ChangeStatus = (todoListId, taskId, isDone) => {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
  };
  const changeTaskTitle: ChangeTaskTitleType = (todoListId, taskId, newTitle) => {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
  }


  return (
    <div className="App">
      <AddItemForm addTask={addTodoList}/>

      {
        todoLists.map(t => {
          let taskForTodoList = tasks[t.id];

          if (t.filter === FILTERS.ACTIVE) {
            taskForTodoList = tasks[t.id].filter((t: TaskType) => !t.isDone)
          }
          if (t.filter === FILTERS.COMPLETED) {
            taskForTodoList = tasks[t.id].filter((t: TaskType) => t.isDone)
          }

          return (
            <TodoList
              key={t.id}
              todoListID={t.id}
              titleList={t.title}
              filter={t.filter}
              tasks={taskForTodoList}
              removeTask={removeTask}
              addTask={addTask}
              changeFilter={changeFilter}
              changeStatus={changeStatus}
              removeTodoList={removeTodoList}
              changeTaskTitle={changeTaskTitle}
            />
          )
        })
      }
    </div>
  );
}

export default App;
