import {TaskPriorities, tasksAPI, TasksResponseType, TaskStatuses, UpdateTaskModelType} from "../api/tasks-api";
import {
  AddTodoListActionType,
  GET_ALL_TODOS,
  GetAllTodoListActionType,
  RemoveTodoListActionType
} from "./todolist-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ResultCode} from "../api/api";
import {setAppError, SetErrorActionType, setAppStatus, SetStatusActionType} from "../app/app-reducer";
import {handleServerAppError} from "../utils/error-utils";

const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const GET_ALL_TASKS = 'GET_ALL_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type GetAllTodoListTasksActionType = ReturnType<typeof getAllTodoListTasksAC>;
export type UpdateTodoListTask = ReturnType<typeof updateTaskAC>;
export type UpdateDomainTaskModelType = {
  description?: string,
  title?: string,
  status?: TaskStatuses,
  priority?: TaskPriorities,
  startDate?: string,
  deadline?: string,
};
export type GeneraTasksActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | AddTodoListActionType
  | RemoveTodoListActionType
  | GetAllTodoListActionType
  | GetAllTodoListTasksActionType
  | UpdateTodoListTask
  | SetErrorActionType
  | SetStatusActionType

export type TodoListTasksType = {
  [key: string]: Array<TasksResponseType>,
}
type ThunkType = ThunkAction<void, AppStateType, unknown, GeneraTasksActionType>;

export const initialTasksState: TodoListTasksType = {};

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

    case UPDATE_TASK: {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) => t.id === action.taskId ? {
          ...t,
          ...action.model
        } : t)
      }
    }

    case ADD_TODOLIST:
      return {
        ...state, [action.todoList.id]: []
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
};

export const removeTaskAC = (todoListId: string, id: string) => ({
  type: REMOVE_TASK,
  todoListId: todoListId,
  id: id,
} as const);
export const addTaskAC = (task: TasksResponseType) => ({
  type: ADD_TASK,
  task: task
} as const);
export const getAllTodoListTasksAC = (todoListId: string, tasksList: Array<TasksResponseType>) => ({
  type: GET_ALL_TASKS,
  todoListId: todoListId,
  tasksList: tasksList,
} as const);
export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
  type: UPDATE_TASK,
  todoListId: todoListId,
  taskId: taskId,
  model: model,
} as const);

export const getAllTodoListTasks = (todoListId: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus('loading'))
  try {
    const response = await tasksAPI.getAllTasks(todoListId);
    if (response.data) {
      dispatch(getAllTodoListTasksAC(todoListId, response.data.items));
      dispatch(setAppStatus('succeeded'));
    }
  } catch (e) {
    alert(e);
    dispatch(setAppStatus('failed'))
  }

};
export const setNewTodoListTask = (todoListId: string, title: string): ThunkType => async (dispatch) => {
  try {
    const response = await tasksAPI.addTask(todoListId, title);
    if (response.status === ResultCode.Success) {
      dispatch(addTaskAC(response.data.data.item));
    } else if (response.data.messages.length) {
      dispatch(setAppError(response.data.messages[0]))
    }
    dispatch(getAllTodoListTasks(todoListId));
  } catch (e) {
    alert(e);
  }
};
export const deleteTodoListTask = (todoListId: string, taskId: string): ThunkType => async (dispatch) => {
  try {
    const response = await tasksAPI.deleteTask(todoListId, taskId);
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(removeTaskAC(todoListId, taskId));
    }
  } catch (e) {
    alert(e);
  }
};
export const updateTodoListTask = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkType => async (dispatch, getState: () => AppStateType) => {
  const state = getState();
  const currentTask = state.tasks[todoListId].find(t => t.id === taskId);

  if (!currentTask) {
    return console.warn('The task is not found in state');
  }

  const apiModel: UpdateTaskModelType = {
    deadline: currentTask.deadline,
    description: currentTask.description,
    priority: currentTask.priority,
    startDate: currentTask.startDate,
    status: currentTask.status,
    title: currentTask.title,
    ...domainModel
  };

  tasksAPI.updateTask(todoListId, taskId, apiModel)
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTaskAC(todoListId, taskId, domainModel));
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(e => {
      dispatch(setAppError(e.message));
      dispatch(setAppStatus('failed'));
    })

};
