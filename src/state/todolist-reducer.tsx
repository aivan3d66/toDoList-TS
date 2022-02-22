import {TodoListsType} from "../redux/state";
import {FILTERS} from "../common/constants";
import {FilterValueType} from "../App";
import {v1} from "uuid";
import {todoListsAPI} from "../api/todoList-api";
import {ResultCode} from "../api/api";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';

const GET_ALL_TODOS = 'GET_ALL_TODOS';
const SET_ALL_TODOS = 'SET_ALL_TODOS';

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type GetAllTodoListActionType = ReturnType<typeof getAllTodoListAC>
export type ActionType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType
  | GetAllTodoListActionType

export const todoListId1 = v1();
export const todoListId2 = v1();

export const initialTodoList: Array<TodoListsType> = [
  {
    id: todoListId1,
    title: "What to learn",
    filter: FILTERS.ALL,
  },
  {
    id: todoListId2,
    title: "What to buy",
    filter: FILTERS.ALL,
  },
]

export const todoListsReducer = (state = initialTodoList, action: ActionType): Array<TodoListsType> => {
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

    case GET_ALL_TODOS: {
      return [...state, action.payload]
    }

    default:
      return state
  }
}

export const getAllTodoListAC = (payload: any) => ({
  type: GET_ALL_TODOS,
  payload: payload
} as const)

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


export const getTodoListsThunk = (): any => async (dispatch: any) => {
  const response = await todoListsAPI.getAllTodoLists();
  if (response.status === ResultCode.Success) {
    dispatch(getAllTodoListAC(response.data));
  }
}
export const setTodoListsThunk = (title: string): any => async (dispatch: any) => {
  const response = await todoListsAPI.setTodoLists(title);
  if (response.status === ResultCode.Success) {
    dispatch(getAllTodoListAC(response.data));
  }
}