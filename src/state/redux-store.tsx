import {Action} from "redux";
import {taskReducer} from "./slices/task-reducer";
import {todoListsReducer} from "./slices/todolist-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {loginReducer} from "./slices/login-reducer";
import {configureStore} from '@reduxjs/toolkit';

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type BaseThunksType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootState, unknown, A>

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
})

export default store;
