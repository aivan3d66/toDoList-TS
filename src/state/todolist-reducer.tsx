import {TodoListsType} from "../redux/state";
import {FILTERS} from "../common/constants";
import {FilterValueType} from "../App";
import {v1} from 'uuid';

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
    case 'REMOVE-TODOLIST': {
      return [...state.filter(t => t.id !== action.todoListId)];
    }

    case 'ADD-TODOLIST': {
      let todoList: TodoListsType = {
        id: action.id,
        title: action.title,
        filter: FILTERS.ALL,
      }
      return [...state, todoList]
    }

    case 'CHANGE-TODOLIST-TITLE': {
      return [...state.filter(tl => tl.id === action.id ? tl.title = action.title : tl)]
    }

    case 'CHANGE-TODOLIST-FILTER': {
      return [...state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)]
    }

    default:
      throw new Error("error")
  }
}

export const removeTodoListAC = (todoListId: string) => ({
  type: 'REMOVE-TODOLIST',
  todoListId: todoListId
} as const)
export const addTodoListAC = (title: string, id: string) => ({
  type: 'ADD-TODOLIST',
  id: id,
  title: title
} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  id: id,
  title: title
} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id: id,
  filter: filter
} as const)
