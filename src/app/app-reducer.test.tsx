import {appReducer, InitialStateType, setAppError} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
    initialised: true
  }
})


test('error message should be set', () => {
  const endState = appReducer(startState, setAppError({error: 'Мсье, у вас где-то тут бага!'}));

  expect(endState.error).toBe('Мсье, у вас где-то тут бага!');
})
