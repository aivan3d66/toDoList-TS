import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import {Toolbar, IconButton, Typography, Container, LinearProgress, CircularProgress, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {getTodoListsThunk,} from "../state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from '../state/redux-store';
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {initialApp, StatusType} from "./app-reducer";
import {Login} from "../features/Login/Login";
import {Routes, Route, NavLink} from 'react-router-dom';
import {TodoListsList} from '../features/TodoListLists/TodoListsList';
import {ROUTES} from '../common/constants';
import {getLogOut} from "../state/login-reducer";

type AppPropsTpe = { demo?: boolean };

export const App: React.FC<AppPropsTpe> = ({demo = false}) => {
  const dispatch = useDispatch();
  const status = useSelector<AppRootState, StatusType>(state => state.app.status);
  const initialised = useSelector<AppRootState>(state => state.app.initialised);
  const isLoggedIn = useSelector<AppRootState>(state => state.auth.isLoginIn)

  useEffect(() => {
    dispatch(initialApp());
    if (!demo) {
      dispatch(getTodoListsThunk())
    }
  }, []);

  const logOutHandler = useCallback(() => {
    dispatch(getLogOut());
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
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <NavLink to={ROUTES.LOGIN} style={{
              color: "#ffffff",
              textDecoration: "none",
            }}>
              Login
            </NavLink>
          </Typography>

        </Toolbar>

        <div style={{
          position: "relative",
          height: "2px",
        }}>
          {status === 'loading' && <LinearProgress/>}
        </div>
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login/>}/>
          <Route path={ROUTES.APP} element={<TodoListsList demo={demo}/>}/>
        </Routes>
      </Container>
      <ErrorSnackbar/>
    </div>
  );
}

export default App;
