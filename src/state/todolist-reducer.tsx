import {FILTERS} from "../common/constants";
import {v1} from "uuid";
import {todoListsAPI} from "../api/todoList-api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';
export const GET_ALL_TODOS = 'GET_ALL_TODOS';

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

export type TodoListType = {
  id: string,
  title: string,
  addedDate: string,
  order: number,
}
export type FilterValueType = typeof FILTERS.ALL | typeof FILTERS.COMPLETED | typeof FILTERS.ACTIVE;
export type TodoListDomainType = TodoListType & {
  filter: FilterValueType
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;

export const initialTodoList: Array<TodoListDomainType> = [];

export const todoListsReducer = (state = initialTodoList, action: ActionType): Array<TodoListDomainType> => {
  switch (action.type) {
    case REMOVE_TODOLIST: {
      return [...state.filter(t => t.id !== action.todoListId)];
    }

    case ADD_TODOLIST: {
      return [{
        id: action.todoListId,
        title: action.title,
        filter: FILTERS.ALL,
        addedDate: '',
        order: 0,
      }, ...state];
    }

    case CHANGE_TODOLIST_TITLE: {
      return [...state.filter(tl => tl.id === action.id ? tl.title = action.title : tl)]
    }

    case CHANGE_TODOLIST_FILTER: {
      return [...state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)]
    }

    case GET_ALL_TODOS: {
      return action.todoLists.map(tl => {
        return {
          ...tl,
          filter: FILTERS.ALL,
        }
      })
    }

    default:
      return state
  }
}

export const getAllTodoListAC = (todoLists: Array<TodoListType>) => ({
  type: GET_ALL_TODOS,
  todoLists
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


export const getTodoListsThunk = (): ThunkType => async (dispatch) => {
  try {
    const response = await todoListsAPI.getAllTodoLists();
    dispatch(getAllTodoListAC(response.data));
  } catch (e) {
    console.log(e)
  }
}
export const setTodoListsThunk = (title: string): ThunkType => async (dispatch) => {
  try {
    const response = await todoListsAPI.setTodoLists(title);
    // dispatch(getAllTodoListAC(response.data));
  } catch (e) {
    console.log(e)
  }
}