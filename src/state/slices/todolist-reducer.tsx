import {FILTERS} from "../../common/constants";
import {v1} from "uuid";
import {todoListsAPI} from "../../api/todoList-api";
import {ThunkAction} from "redux-thunk";
import {ResultCode} from "../../api/api";
import {setAppError, setAppStatus, StatusType} from "../../app/app-reducer";
import {AppRootState, InferActionsTypes} from "../redux-store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SetErrorActionType = ReturnType<typeof setAppError>;
export type SetStatusActionType = ReturnType<typeof setAppStatus>;

export const todoListId1 = v1();
export const todoListId2 = v1();

export const getTodoLists = createAsyncThunk(
  'todolist/getTodoLists',
  async (payload: any, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
      const response = await todoListsAPI.getAllTodoLists();
      if (response.data) {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {todoLists: response.data};
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch);
      thunkAPI.dispatch(setAppStatus({status: 'failed'}));
      return thunkAPI.rejectWithValue(null);
    }
    // .then((todos) => {
    //     todos.forEach((tl) => {
    //       thunkAPI.dispatch(getAllTodoListTasks({todoListId: tl.id}))
    //     })
  });

export const setTodoLists = createAsyncThunk(
  'todolist/setTodoList',
  async (payload: { title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
      const response = await todoListsAPI.setTodoLists(payload.title)
      if (response.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        thunkAPI.dispatch(getTodoLists({}));
        return {todoList: response.data.item}
      } else {
        handleServerAppError(response, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null)
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch);
      thunkAPI.dispatch(setAppStatus({status: 'failed'}));
      return thunkAPI.rejectWithValue(null)
    }
  });

export const deleteTodoList = createAsyncThunk(
  'todoList/deleteTodoList',
  async (payload: {todoListId: string}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
      const response = await todoListsAPI.deleteTodoList(payload.todoListId)
      if (response.data.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {todoListId: payload.todoListId}
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null)
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch);
      thunkAPI.dispatch(setAppStatus({status: 'failed'}));
      return thunkAPI.rejectWithValue(null)
    }
});


export const todoListSlice = createSlice({
  name: 'todoLists',
  initialState: [] as Array<TodoListDomainType>,
  reducers: {
    changeTodoListTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
      state.filter(tl => tl.id === action.payload.id ? tl.title = action.payload.title : tl);
    },
    changeTodoListFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValueType }>) => {
      state[state.findIndex(tl => tl.id === action.payload.id)].filter = action.payload.filter;
    },
    changeTodoListEntityStatus: (state, action: PayloadAction<{ id: string, status: StatusType }>) => {
      state[state.findIndex(tl => tl.id === action.payload.id)].entityStatus = action.payload.status;
    },
    clearTodoData: (state) => {
      state.splice(0)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTodoLists.fulfilled, (state, action) => {
        return action.payload.todoLists.map(tl => ({...tl, filter: FILTERS.ALL, entityStatus: 'idle'}));
      })
      .addCase(setTodoLists.fulfilled, (state, action) => {
        state.push({...action.payload.todoList, filter: FILTERS.ALL, entityStatus: 'idle'});
      })
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        state.findIndex(tl => tl.id === action.payload.todoListId) > -1 && state.splice(state.findIndex(tl => tl.id === action.payload.todoListId), 1);
      })
  }
});

export const todoListsReducer = todoListSlice.reducer;
export const todoListsThunks = {getTodoLists, setTodoLists, deleteTodoList};
export const {
  changeTodoListTitleAC,
  changeTodoListFilterAC,
  changeTodoListEntityStatus,
  clearTodoData
} = todoListSlice.actions;


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
