import {ApiResponseType, instance} from "./api";

type GetTasksResponse = {
  error: string | null,
  totalCount: number,
  items: Array<TasksResponseType>
};
type SetTasksResponse = {
  error: string | null,
  totalCount: number,
  item: TasksResponseType
};
export type TasksResponseType = {
  description: string,
  title: string,
  status: TaskStatuses,
  priority: TaskPriorities,
  startDate: string,
  deadline: string,
  id: string,
  todolistId: string,
  order: number,
  addedDate: string,
};
export type UpdateTaskType = {
  description: string,
  title: string,
  status: number,
  priority: number,
  startDate: string,
  deadline: string,
};
export type UpdateTaskModelType = {
  description: string,
  title: string,
  status: TaskStatuses,
  priority: TaskPriorities,
  startDate: string,
  deadline: string,
};
export enum TaskStatuses {
  New = 0,
  InProgress,
  Completed,
  Draft
}
export enum TaskPriorities {
  Low = 0,
  Middle,
  Hi,
  Urgently,
  Later
}

export const tasksAPI = {
  getAllTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`)
  },
  addTask(todoListId: string, title: string) {
    return instance.post<SetTasksResponse>(`/todo-lists/${todoListId}/tasks`, {title: title})
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ApiResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<UpdateTaskType>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
  },
}