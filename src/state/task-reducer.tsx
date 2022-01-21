import {v1} from "uuid";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeStatusTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type GeneraActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export const taskReducer = (state: any, action: GeneraActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state, [action.todoListId]: state[action.todoListId].filter((f: any) => f.id !== action.id)
      }

    case 'ADD-TASK':
      return {
        ...state,
        [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
      }

    case 'CHANGE-STATUS-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t: any) => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
      }

    case 'CHANGE-TASK_TITLE':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t: any) => t.id === action.taskId ? {...t, title: action.newTitle} : t)
      }

    default:
      return state
  }
}

export const removeTaskAC = (todoListId: string, id: string) => ({
  type: 'REMOVE-TASK',
  todoListId: todoListId,
  id: id,
} as const)
export const addTaskAC = (todoListId: string, title: string) => ({
  type: 'ADD-TASK',
  todoListId: todoListId,
  title: title,
} as const)
export const changeStatusTaskAC = (todoListId: string, taskId: string, isDone: boolean) => ({
  type: 'CHANGE-STATUS-TASK',
  todoListId: todoListId,
  taskId: taskId,
  isDone: isDone,
} as const)
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => ({
  type: 'CHANGE-TASK_TITLE',
  todoListId: todoListId,
  taskId: taskId,
  newTitle: newTitle,
} as const)
