import {tasksAPI, TasksResponseType, TaskStatuses, UpdateTaskModelType} from "../api/tasks-api";
import {GET_ALL_TODOS, GetAllTodoListActionType} from "./todolist-reducer";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ResultCode} from "../api/api";

const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const GET_ALL_TASKS = 'GET_ALL_TASKS';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeStatusTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type GetAllTodoListTasksActionType = ReturnType<typeof getAllTodoListTasksAC>

export type GeneraTasksActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType
  | GetAllTodoListActionType
  | GetAllTodoListTasksActionType

export type TodoListTasksType = {
  [key: string]: Array<TasksResponseType>,
}
type ThunkType = ThunkAction<void, AppStateType, unknown, GeneraTasksActionType>;

export const initialTasksState: TodoListTasksType = {}

export const taskReducer = (state = initialTasksState, action: GeneraTasksActionType): TodoListTasksType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter((f) => f.id !== action.id)
      }

    case GET_ALL_TASKS: {
      return {
        ...state,
        [action.todoListId]: [...action.tasksList]
      }
    }

    case ADD_TASK:
      return {
        ...state,
        [action.task.todolistId]: [action.task, ...state[action.task.todolistId]]
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
export const addTaskAC = (task: TasksResponseType) => ({
  type: ADD_TASK,
  task: task
} as const)
export const getAllTodoListTasksAC = (todoListId: string, tasksList: Array<TasksResponseType>) => ({
  type: GET_ALL_TASKS,
  todoListId: todoListId,
  tasksList: tasksList,
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

export const getAllTodoListTasks = (todoListId: string): ThunkType => async (dispatch) => {
  try {
    const response = await tasksAPI.getAllTasks(todoListId);
    if (response.data) {
      dispatch(getAllTodoListTasksAC(todoListId, response.data.items))
    }
  } catch (e) {
    console.log(e);
  }
}
export const setNewTodoListTask = (todoListId: string, title: string): ThunkType => async (dispatch) => {
  try {
    const response = await tasksAPI.addTask(todoListId, title);
    if (response.status === ResultCode.Success) {
      dispatch(addTaskAC(response.data.item));
    }
    dispatch(getAllTodoListTasks(todoListId));
  } catch (e) {
    console.log(e);
  }
}
export const deleteTodoListTask = (todoListId: string, taskId: string): ThunkType => async (dispatch) => {
  try {
    const response = await tasksAPI.deleteTask(todoListId, taskId);
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(removeTaskAC(todoListId, taskId));
    }
  } catch (e) {
    console.log(e);
  }
}
export const updateTodoListTask = (todoListId: string, taskId: string, model: UpdateTaskModelType): ThunkType => async (dispatch) => {
  try {
    const response = await tasksAPI.updateTask(todoListId, taskId, model);
    if (response.data) {
      dispatch(changeStatusTaskAC(todoListId, taskId, response.data.status));
    }
  } catch (e) {
    console.log(e);
  }
}