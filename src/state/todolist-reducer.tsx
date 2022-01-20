import {TodoListsType} from "../redux/state";
import {v1} from "uuid";
import {FILTERS} from "../common/constants";

export type ActionType = {
  type: string,
  [key: string]: any,
}

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

    default:
      throw new Error("error")
  }
}
