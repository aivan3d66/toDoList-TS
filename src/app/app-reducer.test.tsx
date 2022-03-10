import {appReducer, InitialStateType, setError} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
  }
})


test('error message should be set', () => {
  const endState = appReducer(startState, setError('some error'));

  expect(endState.error).toBe('some error');
})
