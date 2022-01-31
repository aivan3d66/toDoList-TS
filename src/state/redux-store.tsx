import {createStore, combineReducers, Action} from "redux";
import {taskReducer} from "./task-reducer";
import {todoListsReducer} from "./todolist-reducer";

type RootReducersType = typeof rootReducer;
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>
export type AppStateType = ReturnType<RootReducersType>

const rootReducer = combineReducers({
  tasks: taskReducer,
  todoLists: todoListsReducer,
})

const store = createStore(rootReducer);

// @ts-ignore
window.store = store;

export default store;
