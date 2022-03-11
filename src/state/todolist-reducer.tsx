import {FILTERS} from "../common/constants";
import {v1} from "uuid";
import {todoListsAPI} from "../api/todoList-api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ResultCode} from "../api/api";
import {setAppStatus, SetStatusActionType, StatusType} from "../app/app-reducer";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';
const CHANGE_TODOLIST_STATUS = 'CHANGE_TODOLIST_STATUS';
export const GET_ALL_TODOS = 'GET_ALL_TODOS';

export const todoListId1 = v1();
export const todoListId2 = v1();

export const initialTodoList: Array<TodoListDomainType> = [];

export const todoListsReducer = (state = initialTodoList, action: ActionType): Array<TodoListDomainType> => {
  switch (action.type) {
    case REMOVE_TODOLIST: {
      return [...state.filter(t => t.id !== action.todoListId)];
    }

    case ADD_TODOLIST: {
      const newTodoList: TodoListDomainType = {...action.todoList, filter: FILTERS.ALL, entityStatus: 'idle'}
      return [newTodoList, ...state];
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
          entityStatus: 'idle',
        }
      })
    }

    case CHANGE_TODOLIST_STATUS: {
      return [...state.map(m => m.id === action.id ? {...m, entityStatus: action.status} : m)]
    }

    default:
      return state
  }
};

export const getAllTodoListAC = (todoLists: Array<TodoListType>) => ({
  type: GET_ALL_TODOS,
  todoLists
} as const);
export const removeTodoListAC = (todoListId: string) => ({
  type: REMOVE_TODOLIST,
  todoListId
} as const);
export const changeTodoListTitleAC = (id: string, title: string) => ({
  type: CHANGE_TODOLIST_TITLE,
  id,
  title
} as const);
export const addTodoListAC = (todoList: TodoListType) => ({
  type: ADD_TODOLIST,
  todoList,
} as const);
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) => ({
  type: CHANGE_TODOLIST_FILTER,
  id,
  filter
} as const);
export const changeTodoListEntityStatus = (id: string, status: StatusType) => ({
  type: CHANGE_TODOLIST_STATUS,
  id,
  status
} as const);

export const getTodoListsThunk = (): ThunkType => async (dispatch) => {
  dispatch(setAppStatus('loading'));
  try {
    const response = await todoListsAPI.getAllTodoLists();
    dispatch(getAllTodoListAC(response.data));
    dispatch(setAppStatus('succeeded'));
  } catch (e) {
    console.log(e)
    dispatch(setAppStatus('failed'));
  }
};
export const setTodoListsThunk = (title: string): ThunkType => async (dispatch) => {
  try {
    const response = await todoListsAPI.setTodoLists(title);
    if (response.data) {
      dispatch(addTodoListAC(response.data.data.item));
    }
  } catch (e) {
    console.log(e)
  }
};
export const deleteTodoListThunk = (todoListId: string): ThunkType => async (dispatch) => {
  dispatch(changeTodoListEntityStatus(todoListId, 'loading'))
  try {
    const response = await todoListsAPI.deleteTodoList(todoListId);
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(removeTodoListAC(todoListId));
    }
  } catch (e) {
    console.log(e)
  }
};
export const updateTodoListTitleThunk = (todoListId: string, title: string): ThunkType => async (dispatch) => {
  try {
    const response = await todoListsAPI.updateTodoList(todoListId, title);
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(changeTodoListTitleAC(todoListId, title));
    }
  } catch (e) {
    console.log(e)
  }
};

// Types

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type GetAllTodoListActionType = ReturnType<typeof getAllTodoListAC>
export type ChangeTodoListEntityStatusActionType = ReturnType<typeof changeTodoListEntityStatus>
export type ActionType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType
  | GetAllTodoListActionType
  | SetStatusActionType
  | ChangeTodoListEntityStatusActionType
export type TodoListType = {
  id: string,
  title: string,
  addedDate: string,
  order: number,
}
export type FilterValueType = typeof FILTERS.ALL | typeof FILTERS.COMPLETED | typeof FILTERS.ACTIVE;
export type TodoListDomainType = TodoListType & {
  filter: FilterValueType,
  entityStatus: StatusType
}
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;
