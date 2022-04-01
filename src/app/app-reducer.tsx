import {BaseThunksType} from "../state/redux-store";
import {authAPI} from "../api/auth-api";
import {ResultCode} from "../api/api";
import {setIsLoggedIn} from "../state/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: StatusType,
  error: string | null,
  initialised: boolean
};
type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>;
export type SetErrorActionType = ReturnType<typeof setAppError>;
export type SetStatusActionType = ReturnType<typeof setAppStatus>;
export type SetAppInitActionType = ReturnType<typeof setAppInitialised>;
type ActionType = SetErrorActionType | SetStatusActionType | SetAppInitActionType | SetIsLoggedInType;
type ThunkType = BaseThunksType<ActionType>;

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

export const initialApp = (): ThunkType => async (dispatch) => {
  authAPI.getAuth()
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({value: true}));
      } else {

      }
      dispatch(setAppInitialised({value: true}));
    })
}
