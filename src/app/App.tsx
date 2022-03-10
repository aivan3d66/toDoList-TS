import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "../components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import {Toolbar, IconButton, Typography, Container, Grid, LinearProgress} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  changeTodoListFilterAC,
  FilterValueType,
  getTodoListsThunk,
  setTodoListsThunk, deleteTodoListThunk, updateTodoListTitleThunk
} from "../state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from '../state/redux-store';
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {StatusType} from "./app-reducer";
import {TodoListsList} from "../components/TodoListsList";

export type AddTodoList = (title: string) => void;
export type RemoveTodoList = (todoListId: string) => void;
export type ChangeTodoListTitleType = (todoListID: string, title: string) => void;
export type ChangeFilter = (todoListId: string, value: FilterValueType) => void;

type AppPropsTpe = {demo?: boolean};

export const App: React.FC<AppPropsTpe> = ({demo = false}) => {
  const gridItemAppStyles = {
    width: "100%",
    margin: "40px 0",
    padding: "16px",
    backgroundColor: "rgba(211, 211, 211, 0.5)",
    borderRadius: "5px"
  };
  const gridContainerAppStyles = {
    display: "flex",
    justifyContent: "center",
  };

  const dispatch = useDispatch();
  const status = useSelector<AppRootState, StatusType>(state => state.app.status);

  useEffect(() => {
    dispatch(getTodoListsThunk())
  }, []);

  const addTodoList = useCallback((title: string) => {
    dispatch(setTodoListsThunk(title));
  }, [dispatch]);
  const removeTodoList = useCallback((todoListId: string) => {
    dispatch(deleteTodoListThunk(todoListId));
  }, [dispatch]);
  const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
    dispatch(updateTodoListTitleThunk(todoListID, newTitle));
  }, [dispatch]);

  const changeFilter = useCallback((todoListId: string, value: FilterValueType) => {
    dispatch(changeTodoListFilterAC(todoListId, value));
  }, [dispatch]);

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
        {status === 'loading' &&  <LinearProgress/>}
      </AppBar>

      <ErrorSnackbar/>

      <Container fixed maxWidth="xl">
        <Grid container style={{maxWidth: "760px", margin: "0 auto"}}>
          <Grid item style={gridItemAppStyles}>
            <AddItemForm addTask={addTodoList}/>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={gridContainerAppStyles}>
          <TodoListsList
            changeFilter={changeFilter}
            changeTodoListTitle={changeTodoListTitle}
            removeTodoList={removeTodoList}
            demo={demo}
          />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
