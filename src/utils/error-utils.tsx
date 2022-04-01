import {ApiResponseType} from "../api/api";
import {setAppError, setAppStatus, SetErrorActionType, SetStatusActionType} from "../app/app-reducer";
import {Dispatch} from "react";

export const handleServerAppError = (data: ApiResponseType, dispatch: Dispatch<SetErrorActionType |SetStatusActionType>) => {
  if (data.messages.length) {
    dispatch(setAppError({error: data.messages[0]}));
  } else {
    dispatch(setAppError({error: 'Some error occurred'}))
  }
  dispatch(setAppStatus({status: 'failed'}))
};

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<SetErrorActionType |SetStatusActionType>) => {
  dispatch(setAppError({error: error.message ? error.message : 'Some network error occurred'}));
  dispatch(setAppStatus({status: 'failed'}))
}
