import {setAppStatus} from "../app/app-reducer";
import {authAPI, LoginParamsType} from "../api/auth-api";
import {FieldsErrorsType, ResultCode} from "../api/api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTodoData} from "./todolist-reducer";
import {AxiosError} from "axios";

export const getAuth = createAsyncThunk<{ isLogged: boolean }, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: FieldsErrorsType } }>(
  'loading/getAuth',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
      const response = await authAPI.login(data);
      if (response.data.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {isLogged: true}
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({
          errors: response.data.messages,
          fieldsErrors: response.data.fieldsErrors
        });
      }
    } catch (err: any) {
      const error: AxiosError = err;
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined});
    }
  });
export const getLogOut = createAsyncThunk(
  'loading/logOut',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
      const response = await authAPI.logout()
      if (response.data.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        thunkAPI.dispatch(clearTodoData());
        return {isLogged: false}
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({
          errors: response.data.messages,
          fieldsErrors: response.data.fieldsErrors
        });
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined});
    }
  });

export const slice = createSlice({
  name: "login",
  initialState: {
    isLoginIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoginIn = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAuth.fulfilled, (state, action) => {
        state.isLoginIn = action.payload.isLogged;
      })
      .addCase(getLogOut.fulfilled, (state, action) => {
        state.isLoginIn = action.payload.isLogged;
      })
  }
});

export const loginReducer = slice.reducer;
export const {setIsLoggedIn} = slice.actions;

