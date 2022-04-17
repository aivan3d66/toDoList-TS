import React from "react"
import {Provider} from "react-redux"
import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../state/slices/task-reducer";
import {todoListId1, todoListId2, todoListsReducer} from "../state/slices/todolist-reducer";
import {FILTERS} from "../common/constants";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";

type AppRootState = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
  tasks: taskReducer,
  todoLists: todoListsReducer,
  app: appReducer,
})

const initialGlobalState: AppRootState = {
  todoLists: [
    {
      id: todoListId1,
      title: "What to learn",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
      entityStatus: 'idle'
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: FILTERS.ALL,
      addedDate: '',
      order: 0,
      entityStatus: 'idle'
    }
  ],
  tasks: {
    [todoListId1]: [
      {
        id: "1",
        title: "HTML",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      },
      {
        id: "2",
        title: "CSS",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      },
      {
        id: "3",
        title: "JavaScript",
        status: TaskStatuses.New,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      }
    ],
    [todoListId2]: [
      {
        id: "1",
        title: "Coffee",
        status: TaskStatuses.New,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      },
      {
        id: "2",
        title: "New brains",
        status: TaskStatuses.Completed,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      },
      {
        id: "3",
        title: "React book",
        status: TaskStatuses.New,
        todolistId: todoListId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
      }
    ]
  },
  app: {
    status: 'idle',
    error: null,
    initialised: true
  },
}

const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (story: any) => {
  return (
    <Provider store={storyBookStore}>
      {story()}
    </Provider>
  )
}
