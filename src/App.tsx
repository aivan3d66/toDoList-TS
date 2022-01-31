import React from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import {TaskType, TodoListsType, TodoListTasksType} from "./redux/state";
import {FILTERS} from "./common/constants";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import {Toolbar, IconButton, Typography, Container, Grid, Paper} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  addTaskAC,
  changeStatusTaskAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/task-reducer";
import {
  removeTodoListAC,
  addTodoListAC,
  changeTodoListFilterAC, changeTodoListTitleAC
} from "./state/todolist-reducer";
import {v1} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from './state/redux-store';

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

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)
  const tasks = useSelector<AppRootState, TodoListTasksType>(state => state.tasks)

  const addTodoList: AddTodoList = (title) => {
    const newListId = v1();
    const action = addTodoListAC(title, newListId)
    dispatch(action);
  };
  const removeTodoList: RemoveTodoList = (todoListId) => {
    const action = removeTodoListAC(todoListId)
    dispatch(action);
  };
  const changeTodoListTitle: ChangeTodoListTitleType = (todoListID, newTitle) => {
    dispatch(changeTodoListTitleAC(todoListID, newTitle));
  };

  const changeFilter: ChangeFilter = (todoListId, value,) => {
    dispatch(changeTodoListFilterAC(todoListId, value));
  };

  const addTask: AddTask = (todoListId, title) => {
    dispatch(addTaskAC(todoListId, title));
  };
  const removeTask: RemoveTask = (todoListId, id) => {
    dispatch(removeTaskAC(todoListId, id));
  };
  const changeTaskStatus: ChangeStatus = (todoListId, taskId, isDone) => {
    dispatch(changeStatusTaskAC(todoListId, taskId, isDone));
  };
  const changeTaskTitle: ChangeTaskTitleType = (todoListId, taskId, newTitle) => {
    dispatch(changeTaskTitleAC(todoListId, taskId, newTitle));
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
            todoLists.length === 0
              ? <h3 style={{
                fontWeight: "normal",
                fontSize: "24px",
                textTransform: "uppercase",
                color: "#bababa"
              }}>Please, add new tasks list ...</h3>
              : todoLists.map(t => {
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
