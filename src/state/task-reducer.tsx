import {v1} from "uuid";
import {TaskPriorities, TasksResponseType, TaskStatuses} from "../api/tasks-api";
import {GET_ALL_TODOS, GetAllTodoListActionType, todoListId1, todoListId2} from "./todolist-reducer";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";

const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeStatusTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type GeneraTasksActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType
  | GetAllTodoListActionType

export type TodoListTasksType = {
  [key: string]: Array<TasksResponseType>,
}

export const initialTasksState: TodoListTasksType = {
  [todoListId1]: [
    {
      id: v1(),
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
      id: v1(),
      title: "CSS",
      status: TaskStatuses.New,
      todolistId: todoListId1,
      startDate: '',
      deadline: '',
      addedDate: '',
      priority: TaskPriorities.Low,
      order: 0,
      description: '',
    },
  ],
  [todoListId2]: [
    {
      id: v1(),
      title: "Coffee",
      status: TaskStatuses.New,
      todolistId: todoListId2,
      startDate: '',
      deadline: '',
      addedDate: '',
      priority: TaskPriorities.Low,
      order: 0,
      description: '',
    },
    {
      id: v1(),
      title: "Cookies",
      status: TaskStatuses.Completed,
      todolistId: todoListId2,
      startDate: '',
      deadline: '',
      addedDate: '',
      priority: TaskPriorities.Low,
      order: 0,
      description: '',
    },
  ]
}

export const taskReducer = (state = initialTasksState, action: GeneraTasksActionType): TodoListTasksType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter((f) => f.id !== action.id)
      }

    case ADD_TASK:
      return {
        ...state,
        [action.todoListId]: [{
          id: v1(),
          title: action.title,
          todolistId: action.todoListId,
          status: TaskStatuses.New,
          priority: TaskPriorities.Low,
          startDate: '',
          deadline: '',
          addedDate: '',
          order: 0,
          description: '',
        }, ...state[action.todoListId]]
      }

    case CHANGE_TASK_STATUS:
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) => t.id === action.taskId ? {
          ...t,
          status: action.newStatusValue
        } : t)
      }

    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) => t.id === action.taskId ? {
          ...t,
          title: action.newTitle
        } : t)
      }

    case ADD_TODOLIST:
      return {
        ...state, [action.todoListId]: []
      }

    case GET_ALL_TODOS: {
      const copyState = {...state};

      action.todoLists.forEach(tl => {
        copyState[tl.id] = [];
      })

      return copyState
    }

    case REMOVE_TODOLIST: {
      const stateCopy = {...state}
      delete stateCopy[action.todoListId]
      return stateCopy
    }

    default:
      return state
  }
}

export const removeTaskAC = (todoListId: string, id: string) => ({
  type: REMOVE_TASK,
  todoListId: todoListId,
  id: id,
} as const)
export const addTaskAC = (todoListId: string, title: string) => ({
  type: ADD_TASK,
  todoListId: todoListId,
  title: title,
} as const)
export const changeStatusTaskAC = (todoListId: string, taskId: string, newStatusValue: TaskStatuses) => ({
  type: CHANGE_TASK_STATUS,
  todoListId: todoListId,
  taskId: taskId,
  newStatusValue: newStatusValue,
} as const)
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => ({
  type: CHANGE_TASK_TITLE,
  todoListId: todoListId,
  taskId: taskId,
  newTitle: newTitle,
} as const)
