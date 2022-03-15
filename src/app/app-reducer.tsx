export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: StatusType,
  error: string | null,
  initialised: boolean
};
export type SetErrorActionType = ReturnType<typeof setAppError>;
export type SetStatusActionType = ReturnType<typeof setAppStatus>;
export type SetAppInitActionType = ReturnType<typeof setAppInitialised>;
type ActionType = SetErrorActionType | SetStatusActionType | SetAppInitActionType;

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

export const setAppError = (error: string | null) => ({type: SET_ERROR, error} as const)
export const setAppStatus = (status: StatusType) => ({type: SET_STATUS, status} as const)
