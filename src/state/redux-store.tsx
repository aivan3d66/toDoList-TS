import {createStore, combineReducers, applyMiddleware, Action} from "redux";
import {loadState} from "../utils/localStorage";
import {taskReducer} from "./task-reducer";
import {todoListsReducer} from "./todolist-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";

type RootReducersType = typeof rootReducer;
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type BaseThunksType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type AppStateType = ReturnType<RootReducersType>

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasks: taskReducer,
  todoLists: todoListsReducer,
})

const store = createStore(rootReducer, loadState(), applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  localStorage.setItem('todoList-state', JSON.stringify(store.getState()))
})

export default store;
