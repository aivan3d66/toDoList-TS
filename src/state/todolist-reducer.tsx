import {FILTERS} from "../common/constants";
import {v1} from "uuid";
import {todoListsAPI} from "../api/todoList-api";
import {ThunkAction} from "redux-thunk";
import {ResultCode} from "../api/api";
import {setAppStatus, SetStatusActionType, StatusType} from "../app/app-reducer";
import {AppRootState, InferActionsTypes} from "./redux-store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {getAllTodoListTasks} from "./task-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const todoListId1 = v1();
export const todoListId2 = v1();

export const initialTodoList: Array<TodoListDomainType> = [];
export const todoListSlice = createSlice({
  name: 'todoLists',
  initialState: initialTodoList,
  reducers: {
    getAllTodoListAC: (state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) => {
      return action.payload.todoLists.map(tl => ({...tl, filter: FILTERS.ALL, entityStatus: 'idle'}))
    },
    removeTodoListAC: (state, action: PayloadAction<{ todoListId: string }>) => {
      state.filter(t => t.id !== action.payload.todoListId)
    },
    changeTodoListTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
      state.filter(tl => tl.id === action.payload.id ? tl.title = action.payload.title : tl)
    },
    addTodoListAC: (state, action: PayloadAction<{ todoList: TodoListType }>) => {
      state.push({...action.payload.todoList, filter: FILTERS.ALL, entityStatus: 'idle'})
    },
    changeTodoListFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValueType }>) => {
      state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter} : m)
    },
    changeTodoListEntityStatus: (state, action: PayloadAction<{ id: string, status: StatusType }>) => {
      state.map(m => m.id === action.payload.id ? {...m, entityStatus: action.payload.status} : m)
    },
    clearTodoData: (state) => {
      state.splice(0)
    }
  }
});

export const todoListsReducer = todoListSlice.reducer;
export const {
  getAllTodoListAC,
  removeTodoListAC,
  changeTodoListTitleAC,
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListEntityStatus,
  clearTodoData
} = todoListSlice.actions;

export const getTodoListsThunk = (): ThunkType => async (dispatch) => {
  dispatch(setAppStatus({status: 'loading'}));
  todoListsAPI.getAllTodoLists()
    .then(response => {
      if (response.data) {
        dispatch(getAllTodoListAC({todoLists: response.data}));
        dispatch(setAppStatus({status: 'succeeded'}));
        return response.data
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
      dispatch(setAppStatus({status: 'failed'}));
    })
    .then((todos) => {
      // @ts-ignore
      todos.forEach((tl) => {
        dispatch(getAllTodoListTasks(tl.id))
      })
    })
};
export const setTodoListsThunk = (title: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus({status: 'loading'}));
  todoListsAPI.setTodoLists(title)
    .then(response => {
      if (response.resultCode === ResultCode.Success) {
        dispatch(addTodoListAC({todoList: response.data.item}));
        dispatch(setAppStatus({status: 'succeeded'}));
      } else {
        handleServerAppError(response, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
      dispatch(setAppStatus({status: 'failed'}));
    })
};
export const deleteTodoListThunk = (todoListId: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus({status: 'loading'}));
  todoListsAPI.deleteTodoList(todoListId)
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(removeTodoListAC({todoListId: todoListId}));
        dispatch(setAppStatus({status: 'succeeded'}));
        dispatch(changeTodoListEntityStatus({id: todoListId, status: 'idle'}));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
      dispatch(setAppStatus({status: 'failed'}));
    })
};
export const updateTodoListTitleThunk = (todoListId: string, title: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus({status: 'loading'}));
  todoListsAPI.updateTodoList(todoListId, title)
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(changeTodoListTitleAC({title, id: todoListId}));
        dispatch(setAppStatus({status: 'succeeded'}));
      } else {
        handleServerAppError(response.data, dispatch);
        dispatch(setAppStatus({status: 'failed'}));
      }
    })
};

// Types

type ActionsTypes = InferActionsTypes<typeof todoListSlice.actions> | SetStatusActionType;

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
