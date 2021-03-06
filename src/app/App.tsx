import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import {Toolbar, IconButton, Container, LinearProgress, CircularProgress, Button, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {AppRootState} from '../state/redux-store';
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {appThunk, StatusType} from "./app-reducer";
import {Login} from "../features/Login/Login";
import {Routes, Route} from 'react-router-dom';
import {TodoListsList} from '../features/TodoListLists/TodoListsList';
import {ROUTES} from '../common/constants';
import {getLogOut} from "../state/slices/login-reducer";
import {useActions} from '../utils/helpers';
import {todoListsThunks} from "../state/slices/todolist-reducer";

type AppPropsTpe = { demo?: boolean };

export const App: React.FC<AppPropsTpe> = ({demo = false}) => {
  const status = useSelector<AppRootState, StatusType>(state => state.app.status);
  const initialised = useSelector<AppRootState>(state => state.app.initialised);
  const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoginIn);
  const {getTodoLists} = useActions(todoListsThunks)
  const {initialApp} = useActions(appThunk)

  useEffect(() => {
    initialApp({});
    if (!demo) {
      getTodoLists({})
    }
  }, []);

  const logOutHandler = useCallback(() => {
    getLogOut();
  }, [])

  if (!initialised) {
    return <CircularProgress style={{
      display: "flex",
      margin: "100px auto",
    }}/>
  }

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
          {isLoggedIn && <Tooltip title="Log out"><Button color="inherit" onClick={logOutHandler}>Log
            out</Button></Tooltip>}
        </Toolbar>

        <div style={{
          position: "relative",
          height: "2px",
        }}>
          {status === 'loading' && <LinearProgress/>}
        </div>
      </AppBar>
      <Container fixed style={{width: "100%", padding: "0"}}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login/>}/>
          <Route path={ROUTES.HOME} element={<TodoListsList demo={demo}/>}/>
          <Route path='*' element={<h1 style={{textAlign: "center"}}>404 Page not found</h1>}/>
        </Routes>
      </Container>
      <ErrorSnackbar/>
    </div>
  );
}

export default App;
