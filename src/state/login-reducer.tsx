import {BaseThunksType, InferActionsTypes } from "./redux-store";
import {setAppStatus, SetStatusActionType} from "../app/app-reducer";
import {authAPI} from "../api/auth-api";
import {ResultCode} from "../api/api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions> | SetStatusActionType;
type ThunkType = BaseThunksType<ActionsTypes>;

const GET_AUTH = 'GET_AUTH';
const LOGIN = 'LOGIN';

const initialState = {};

export const loginReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state
      }

    default:
      return state
  }
}

const actions = {
  getAuth: () => ({
    type: GET_AUTH,
    payload: {}
  } as const)
}

export const getAuth = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus('loading'));
  authAPI.login(email, password, rememberMe, captcha)
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        alert('Yeeeee');
        dispatch(setAppStatus('succeeded'));
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
