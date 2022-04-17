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

export const initialApp = createAsyncThunk(
  'app-slice/initApp',
  async (arg, thunkAPI) => {
    return await authAPI.getAuth()
      .then(response => {
        if (response.data.resultCode === ResultCode.Success) {
          thunkAPI.dispatch(setIsLoggedIn({value: true}));
        } else {

        }
      })
  })

export const appSlice = createSlice({
  name: 'app-slice',
  initialState: {
    status: 'idle',
    error: null,
    initialised: false
  } as InitialStateType,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: StatusType }>) => {
      state.status = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(initialApp.fulfilled, (state) =>{
      state.initialised = true
    })
  }
});

export const {setAppError, setAppStatus} = appSlice.actions;
export const appReducer = appSlice.reducer;
export const appThunk = {initialApp}
