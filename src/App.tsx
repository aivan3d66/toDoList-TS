import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./components/ToDoList";
import {TodoListsType} from "./redux/state";
import {FILTERS} from "./common/constants";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import {Toolbar, IconButton, Typography, Container, Grid, Paper} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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

  const addTodoList = useCallback((title: string) => {
    const newListId = v1();
    const action = addTodoListAC(title, newListId)
    dispatch(action);
  }, []);
  const removeTodoList = useCallback((todoListId: string) => {
    const action = removeTodoListAC(todoListId)
    dispatch(action);
  }, []);
  const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
    dispatch(changeTodoListTitleAC(todoListID, newTitle));
  }, []);

  const changeFilter = useCallback((todoListId: string, value: FilterValueType,) => {
    dispatch(changeTodoListFilterAC(todoListId, value));
  }, []);

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
                return (
                  <Grid item key={t.id}>
                    <Paper style={paperAppStyles}>
                      <TodoList
                        key={t.id}
                        todoListID={t.id}
                        titleList={t.title}
                        filter={t.filter}
                        changeFilter={changeFilter}
                        removeTodoList={removeTodoList}
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
