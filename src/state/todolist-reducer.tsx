import {TodoListsType} from "../redux/state";
import {FILTERS} from "../common/constants";
import {FilterValueType} from "../App";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type ActionType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodoListsType>, action: ActionType): Array<TodoListsType> => {
  switch (action.type) {
    case REMOVE_TODOLIST: {
      return [...state.filter(t => t.id !== action.todoListId)];
    }

    case ADD_TODOLIST: {
      let todoList: TodoListsType = {
        id: action.todoListId,
        title: action.title,
        filter: FILTERS.ALL,
      }
      return [...state, todoList]
    }

    case CHANGE_TODOLIST_TITLE: {
      return [...state.filter(tl => tl.id === action.id ? tl.title = action.title : tl)]
    }

    case CHANGE_TODOLIST_FILTER: {
      return [...state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)]
    }

    default:
      throw new Error("error")
  }
}

export const removeTodoListAC = (todoListId: string) => ({
  type: REMOVE_TODOLIST,
  todoListId: todoListId
} as const)
export const addTodoListAC = (title: string, todoListId: string) => ({
  type: ADD_TODOLIST,
  todoListId: todoListId,
  title: title
} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
  type: CHANGE_TODOLIST_TITLE,
  id: id,
  title: title
} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) => ({
  type: CHANGE_TODOLIST_FILTER,
  id: id,
  filter: filter
} as const)
