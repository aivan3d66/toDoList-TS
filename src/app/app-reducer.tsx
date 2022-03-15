import {BaseThunksType} from "../state/redux-store";
import {authAPI} from "../api/auth-api";
import {ResultCode} from "../api/api";
import {actions} from "../state/login-reducer";

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: StatusType,
  error: string | null,
  initialised: boolean
};
type SetIsLoggedInType = ReturnType<typeof actions.setIsLoggedIn>;
export type SetErrorActionType = ReturnType<typeof setAppError>;
export type SetStatusActionType = ReturnType<typeof setAppStatus>;
export type SetAppInitActionType = ReturnType<typeof setAppInitialised>;
type ActionType = SetErrorActionType | SetStatusActionType | SetAppInitActionType | SetIsLoggedInType;
type ThunkType = BaseThunksType<ActionType>;

const SET_STATUS = 'APP/SET-STATUS';
const SET_ERROR = 'APP/SET-ERROR';
const SET_APP_INITIALISED = 'APP/SET-SET_APP_INITIALISED';

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  initialised: false
};

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case SET_STATUS:
      return {...state, status: action.status}

    case SET_ERROR:
      return {...state, error: action.error}

    case SET_APP_INITIALISED:
      return {...state, initialised: action.value}

    default:
      return {...state}
  }
}

export const setAppError = (error: string | null) => ({type: SET_ERROR, error} as const);
export const setAppStatus = (status: StatusType) => ({type: SET_STATUS, status} as const);
export const setAppInitialised = (value: boolean) => ({type: SET_APP_INITIALISED, value} as const);

export const initialApp = (): ThunkType => async (dispatch) => {
  authAPI.getAuth()
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(actions.setIsLoggedIn(true));
      } else {

      }
      dispatch(setAppInitialised(true));
    })
}
