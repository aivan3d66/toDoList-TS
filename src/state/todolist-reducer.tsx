import {TodoListsType} from "../redux/state";
import {v1} from "uuid";
import {FILTERS} from "../common/constants";
import {FilterValueType} from "../App";

export type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof ChangeTodoListFilterAC>
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
      return [...state, {id: v1(), filter: FILTERS.ALL, title: action.title}]
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

export const RemoveTodoListAC = (todoListId: string) => ({
  type: 'REMOVE-TODOLIST',
  todoListId: todoListId
} as const)
export const AddTodoListAC = (title: string) => ({
  type: 'ADD-TODOLIST',
  title: title
} as const)
export const ChangeTodoListTitleAC = (id: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  id: id,
  title: title
} as const)
export const ChangeTodoListFilterAC = (id: string, filter: FilterValueType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id: id,
  filter: filter
} as const)
