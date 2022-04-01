import {TaskPriorities, tasksAPI, TasksResponseType, TaskStatuses, UpdateTaskModelType} from "../api/tasks-api";
import {ThunkAction} from "redux-thunk";
import {ResultCode} from "../api/api";
import {setAppError, SetErrorActionType, setAppStatus, SetStatusActionType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AppRootState, InferActionsTypes} from "./redux-store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListAC, clearTodoData, getAllTodoListAC, removeTodoListAC} from "./todolist-reducer";

export const initialTasksState: TodoListTasksType = {};
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    removeTaskAC: (state, action: PayloadAction<{ todoListId: string, id: string }>) => {
      state[action.payload.todoListId] = state[action.payload.todoListId].filter((f) => f.id !== action.payload.id)
    },
    addTaskAC: (state, action: PayloadAction<{ task: TasksResponseType }>) => {
      state[action.payload.task.todolistId] = [action.payload.task]
    },
    getAllTodoListTasksAC: (state, action: PayloadAction<{ todoListId: string, tasksList: Array<TasksResponseType> }>) => {
      state[action.payload.todoListId] = [...action.payload.tasksList]
    },
    updateTaskAC: (state, action: PayloadAction<{ todoListId: string, taskId: string, model: UpdateDomainTaskModelType }>) => {
      state[action.payload.todoListId] = state[action.payload.todoListId].map((t) => t.id === action.payload.taskId ? {
        ...t,
        ...action.payload.model
      } : t)
    }
  }
});

export const {removeTaskAC, addTaskAC, getAllTodoListTasksAC, updateTaskAC} = tasksSlice.actions;
export const taskReducer = tasksSlice.reducer;

export const getAllTodoListTasks = (todoListId: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus({status: 'loading'}))
  tasksAPI.getAllTasks(todoListId)
    .then(response => {
      if (response.data) {
        dispatch(getAllTodoListTasksAC({todoListId, tasksList: response.data.items}));
        dispatch(setAppStatus({status: 'succeeded'}));
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
      dispatch(setAppStatus({status: 'failed'}));
    })
};
export const setNewTodoListTask = (todoListId: string, title: string): ThunkType => async (dispatch) => {
  tasksAPI.addTask(todoListId, title)
    .then(response => {
      if (response.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({task: response.data.item}));
      } else {
        handleServerAppError(response, dispatch)
      }
      dispatch(getAllTodoListTasks(todoListId));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
};
export const deleteTodoListTask = (todoListId: string, taskId: string): ThunkType => async (dispatch) => {
  dispatch(setAppStatus({status: 'loading'}))
  tasksAPI.deleteTask(todoListId, taskId)
    .then(response => {
      if (response.data.resultCode === ResultCode.Success) {
        dispatch(removeTaskAC({todoListId, id: taskId}));
        dispatch(setAppStatus({status: 'succeeded'}));
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
      dispatch(setAppStatus({status: 'failed'}));
    })
};
export const updateTodoListTask = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkType => async (dispatch, getState: () => AppRootState) => {
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
        dispatch(updateTaskAC({todoListId, taskId, model: domainModel}));
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(e => {
      dispatch(setAppError(e.message));
      dispatch(setAppStatus({status: 'failed'}));
    })

};

// types

export type UpdateDomainTaskModelType = {
  description?: string,
  title?: string,
  status?: TaskStatuses,
  priority?: TaskPriorities,
  startDate?: string,
  deadline?: string,
};
export type TodoListTasksType = {
  [key: string]: Array<TasksResponseType>,
};

type AddTodoListActionType = ReturnType<typeof addTodoListAC>;
type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;
type GetAllTodoListActionType = ReturnType<typeof getAllTodoListAC>;

type ActionsTypes =
  InferActionsTypes<typeof tasksSlice.actions>
  | AddTodoListActionType
  | RemoveTodoListActionType
  | GetAllTodoListActionType
  | SetErrorActionType
  | SetStatusActionType
  | ReturnType<typeof clearTodoData>;


type ThunkType = ThunkAction<void, AppRootState, unknown, ActionsTypes>;
