import {AppRootState} from "../state/redux-store";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todoList-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state: AppRootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoList-state', serializedState);
  } catch {
    // ignore err
  }
}
