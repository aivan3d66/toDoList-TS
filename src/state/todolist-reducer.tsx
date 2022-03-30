import {FILTERS} from "../common/constants";
import {v1} from "uuid";
import {todoListsAPI} from "../api/todoList-api";
import {ThunkAction} from "redux-thunk";
import {ResultCode} from "../api/api";
import {setAppStatus, SetStatusActionType, StatusType} from "../app/app-reducer";
import {AppRootState, InferActionsTypes} from "./redux-store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import { getAllTodoListTasks } from "./task-reducer";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';
const CHANGE_TODOLIST_STATUS = 'CHANGE_TODOLIST_STATUS';
export const GET_ALL_TODOS = 'GET_ALL_TODOS';

export const todoListId1 = v1();
export const todoListId2 = v1();

export const initialTodoList: Array<TodoListDomainType> = [];

export const todoListsReducer = (state = initialTodoList, action: ActionsTypes): Array<TodoListDomainType> => {
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

export const todoListActions = {
  getAllTodoListAC: (todoLists: Array<TodoListType>) => ({
    type: GET_ALL_TODOS,
    todoLists
  } as const),
  removeTodoListAC: (todoListId: string) => ({
    type: REMOVE_TODOLIST,
    todoListId
  } as const),
  changeTodoListTitleAC: (id: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE,
    id,
    title
  } as const),
  addTodoListAC: (todoList: TodoListType) => ({
    type: ADD_TODOLIST,
    todoList,
  } as const),
  changeTodoListFilterAC: (id: string, filter: FilterValueType) => ({
    type: CHANGE_TODOLIST_FILTER,
    id,
    filter
  } as const),
  changeTodoListEntityStatus: (id: string, status: StatusType) => ({
    type: CHANGE_TODOLIST_STATUS,
    id,
    status
  } as const),
};

export const getTodoListsThunk = (): ThunkType => async (dispatch) => {
  dispatch(setAppStatus('loading'));
  todoListsAPI.getAllTodoLists()
    .then(response => {
      if (response.data) {
        dispatch(todoListActions.getAllTodoListAC(response.data));
        dispatch(setAppStatus('succeeded'));
        return response.data
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
      dispatch(setAppStatus('failed'));
    })
    .then((todos) => {
        // @ts-ignore
      todos.forEach((tl) => {
          dispatch(getAllTodoListTasks(tl.id))
        })
    })
};
export const setTodoListsThunk = (title: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus('loading'));
  todoListsAPI.setTodoLists(title)
    .then(response => {
      if (response.resultCode === ResultCode.Success) {
        dispatch(todoListActions.addTodoListAC(response.data.item));
        dispatch(setAppStatus('succeeded'));
      } else {
        handleServerAppError(response, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
      dispatch(setAppStatus('failed'));
    })
};
export const deleteTodoListThunk = (todoListId: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus('loading'));
  todoListsAPI.deleteTodoList(todoListId)
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(todoListActions.removeTodoListAC(todoListId));
        dispatch(setAppStatus('succeeded'));
        dispatch(todoListActions.changeTodoListEntityStatus(todoListId, 'idle'));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
      dispatch(setAppStatus('failed'));
    })
};
export const updateTodoListTitleThunk = (todoListId: string, title: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus('loading'));
  todoListsAPI.updateTodoList(todoListId, title)
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(todoListActions.changeTodoListTitleAC(todoListId, title));
        dispatch(setAppStatus('succeeded'));
      } else {
        handleServerAppError(response.data, dispatch);
        dispatch(setAppStatus('failed'));
      }
    })
};

// Types

type ActionsTypes = InferActionsTypes<typeof todoListActions> | SetStatusActionType;

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
type ThunkType = ThunkAction<void, AppRootState, unknown, ActionsTypes>;
