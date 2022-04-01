import {BaseThunksType, InferActionsTypes} from "./redux-store";
import {setAppStatus, SetStatusActionType} from "../app/app-reducer";
import {authAPI, LoginParamsType} from "../api/auth-api";
import {ResultCode} from "../api/api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTodoData} from "./todolist-reducer";

type ActionsTypes =
  InferActionsTypes<typeof slice.actions>
  | SetStatusActionType
  | ReturnType<typeof clearTodoData>;
type ThunkType = BaseThunksType<ActionsTypes>;

const initialState = {
  isLoginIn: false,
};
export const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoginIn = action.payload.value;
    },
  }
});

export const loginReducer = slice.reducer;
export const {setIsLoggedIn} = slice.actions;

export const getAuth = (data: LoginParamsType): ThunkType => async (dispatch) => {
  dispatch(setAppStatus({status: 'loading'}));
  authAPI.login(data)
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({value: true}));
        dispatch(setAppStatus({status: 'succeeded'}));
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
};
export const getLogOut = (): ThunkType => async (dispatch) => {
  dispatch(setAppStatus({status: 'loading'}));
  authAPI.logout()
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({value: false}));
        dispatch(setAppStatus({status: 'succeeded'}));
        dispatch(clearTodoData());
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
};
