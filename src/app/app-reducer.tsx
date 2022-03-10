export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
};
type ActionType = any;

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
