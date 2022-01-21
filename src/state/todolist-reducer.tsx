import {TodoListsType} from "../redux/state";
import {v1} from "uuid";
import {FILTERS} from "../common/constants";
import {FilterValueType} from "../App";

export type RemoveTodoListActionType = {
  type: 'REMOVE-TODOLIST',
  id: string,
}
export type AddTodoListActionType = {
  type: 'ADD-TODOLIST',
  title: string,
}
export type ChangeTodoListTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string,
  title: string
}
export type ChangeTodoListFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string,
  filter: FilterValueType,
}
type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodoListsType>, action: ActionType): Array<TodoListsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(t => t.id !== action.id)
    }

    case 'ADD-TODOLIST': {
      let todoList: TodoListsType = {
        id: v1(),
        filter: FILTERS.ALL,
        title: action.title
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

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListActionType => ({
  type: 'REMOVE-TODOLIST',
  id: todolistId
})
export const AddTodoListAC = (title: string): AddTodoListActionType => ({
  type: 'ADD-TODOLIST',
  title: title
})
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => ({
  type: 'CHANGE-TODOLIST-TITLE',
  id: id,
  title: title
})
export const ChangeTodoListFilterAC = (id: string, filter: string): ChangeTodoListFilterActionType => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id: id,
  filter: filter
})
