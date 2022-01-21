import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import {initialStateTasks, TaskType, todoList, TodoListsType} from "./redux/state";
import {FILTERS} from "./common/constants";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import {Toolbar, IconButton, Typography, Container, Grid, Paper} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";

export type AddTodoList = (title: string) => void;
export type RemoveTodoList = (todoListId: string) => void;
export type ChangeTodoListTitleType = (todoListID: string, title: string) => void;

export type FilterValueType = typeof FILTERS.ALL | typeof FILTERS.COMPLETED | typeof FILTERS.ACTIVE;
export type ChangeFilter = (todoListId: string, value: FilterValueType) => void;

export type AddTask = (todoListId: string, title: string) => void;
export type RemoveTask = (todoListId: string, id: string) => void;
export type ChangeStatus = (todoListId: string, taskId: string, isDone: boolean) => void;
export type ChangeTaskTitleType = (todoListId: string, taskId: string, newTitle: string) => void;

const App = () => {
  const gridItemAppStyles = {
    width: "100%",
    margin: "40px 0",
    padding: "20px",
    backgroundColor: "rgba(211, 211, 211, 0.5)",
    borderRadius: "5px"
  }
  const gridContainerAppStyles = {
    display: "flex",
    justifyContent: "center",
  }
  const paperAppStyles = {
    minHeight: "200px",
    padding: "16px",
  }

  // const [tasks, setTasks] = useState<TodoListTasksType>(initialStateTasks);
  const [tasks, tasksDispatch] = useReducer<Reducer<any, any>>(taskReducer, initialStateTasks);
  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>(todoList);

  const addTodoList: AddTodoList = (title) => {
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
  };
  const changeTodoListTitle: ChangeTodoListTitleType = (todoListID, newTitle) => {
    setTodoLists([...todoLists.filter(tl => tl.id === todoListID ? tl.title = newTitle : tl)]);
  };

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
  const changeTaskStatus: ChangeStatus = (todoListId, taskId, isDone) => {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
  };
  const changeTaskTitle: ChangeTaskTitleType = (todoListId, taskId, newTitle) => {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            News
          </Typography>
        </Toolbar>
      </AppBar>

      <Container fixed maxWidth="xl">
        <Grid container style={{maxWidth: "760px", margin: "0 auto"}}>
          <Grid item style={gridItemAppStyles}>
            <AddItemForm addTask={addTodoList}/>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={gridContainerAppStyles}>
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
                <Grid item key={t.id}>
                  <Paper style={paperAppStyles}>
                    <TodoList
                      key={t.id}
                      todoListID={t.id}
                      titleList={t.title}
                      filter={t.filter}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      removeTodoList={removeTodoList}
                      changeTaskTitle={changeTaskTitle}
                      changeTodoListTitle={changeTodoListTitle}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
