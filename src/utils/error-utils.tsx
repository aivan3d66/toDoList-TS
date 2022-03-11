import {ApiResponseType} from "../api/api";
import {setAppError, SetErrorActionType, SetStatusActionType} from "../app/app-reducer";
import {Dispatch} from "react";

export const handleServerAppError = (data: ApiResponseType, dispatch: Dispatch<SetErrorActionType |SetStatusActionType>) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]));
  } else {
    dispatch(setAppError('Some error occurred'))
  }
  dispatch(setAppError('failed'))
}
