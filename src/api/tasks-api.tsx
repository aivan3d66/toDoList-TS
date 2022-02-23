import {ApiResponseType, instance} from "./api";

type TasksResponseType = {
  description: string,
  title: string,
  completed: boolean,
  status: number,
  priority: number,
  startDate: string,
  deadline: string,
  id: string,
  todolistId: string,
  order: number,
  addedDate: string,
}
type GetTasksResponse = {
  error: string | null,
  totalCount: number,
  items: Array<TasksResponseType>
}
export type UpdateTaskType = {
  description: string,
  title: string,
  status: number,
  priority: number,
  startDate: string,
  deadline: string,
}
export type UpdateTaskModelType = {}

export const tasksAPI = {
  getAllTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`)
  },
  addTask(todoListId: string, title: string) {
    return instance.post<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`, {title: title})
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ApiResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<UpdateTaskType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
}