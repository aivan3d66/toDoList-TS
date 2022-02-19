import React from "react"
import {Provider} from "react-redux"
import {combineReducers, createStore} from "redux";
import {taskReducer} from "../state/task-reducer";
import {todoListId1, todoListId2, todoListsReducer} from "../state/todolist-reducer";
import {FILTERS} from "../common/constants";
import {v1} from "uuid";

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasks: taskReducer,
  todoLists: todoListsReducer,
})

const initialGlobalState = {
  todoLists: [
    {id: todoListId1, title: "What to learn", filter: FILTERS.ALL,},
    {id: todoListId2, title: "What to buy", filter: FILTERS.ALL,},
  ],
  tasks: {
    [todoListId1]: [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JavaScript", isDone: false},
      {id: v1(), title: "TypeScript", isDone: false},
      {id: v1(), title: "React", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "Coffee", isDone: true},
      {id: v1(), title: "New brains", isDone: false},
      {id: v1(), title: "React book", isDone: false},
    ]
  }
}

const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (story: any) => {
  return (
    <Provider store={storyBookStore}>
      {story()}
    </Provider>
  )
}