import {authAPI} from "../api/auth-api";
import {ResultCode} from "../api/api";
import {setIsLoggedIn} from "../state/slices/login-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: StatusType,
  error: string | null,
  initialised: boolean
};

export const initialApp = createAsyncThunk('app-slice/initApp', async (arg, thunkAPI) => {
  return await authAPI.getAuth()
      .then(response => {
        if (response.data.resultCode === ResultCode.Success) {
          thunkAPI.dispatch(setIsLoggedIn({value: true}));
        } else {

        }
        thunkAPI.dispatch(setAppInitialised({value: true}));
      })
})

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  initialised: false
};
export const appSlice = createSlice({
  name: 'app-slice',
  initialState: initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{error: string | null}>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{status: StatusType}>) => {
      state.status = action.payload.status
    },
    setAppInitialised: (state, action: PayloadAction<{value: boolean}>) => {
      state.initialised = action.payload.value
    },
  }
});

export const {setAppError, setAppStatus, setAppInitialised} = appSlice.actions;
export const appReducer = appSlice.reducer;
