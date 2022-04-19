import {taskReducer} from "./slices/task-reducer";
import {todoListsReducer} from "./slices/todolist-reducer";
import {appReducer} from "../app/app-reducer";
import {loginReducer} from "./slices/login-reducer";
import {configureStore} from '@reduxjs/toolkit';

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: loginReducer,
  }
})

export default store;
