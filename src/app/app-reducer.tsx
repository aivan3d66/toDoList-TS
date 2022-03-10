export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: StatusType,
  error: string | null,
};
type SetErrorActionType = ReturnType<typeof setError>;
type SetStatusActionType = ReturnType<typeof setStatus>;
type ActionType = SetErrorActionType | SetStatusActionType;

const SET_STATUS = 'APP/SET-STATUS';
const SET_ERROR = 'APP/SET-ERROR';

const initialState: InitialStateType = {
  status: 'idle',
  error: 'some error',
};

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case SET_STATUS:
      return {...state, status: action.status}

    case SET_ERROR:
      return {...state, error: action.error}

    default:
      return {...state}
  }
}

export const setError = (error: string | null) => ({type: SET_ERROR, error} as const)
export const setStatus = (status: StatusType) => ({type: SET_STATUS, status} as const)
