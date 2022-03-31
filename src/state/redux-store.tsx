import {combineReducers, Action} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListsReducer} from "./todolist-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {loginReducer} from "./login-reducer";
import {configureStore} from '@reduxjs/toolkit';

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type BaseThunksType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootState, unknown, A>

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasks: taskReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: loginReducer,
})

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(thunkMiddleware)
})

// @ts-ignore
window.store = store;

export default store;
