import {appReducer, InitialStateType, setAppError} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
  }
})


test('error message should be set', () => {
  const endState = appReducer(startState, setAppError('some error'));

  expect(endState.error).toBe('some error');
})
