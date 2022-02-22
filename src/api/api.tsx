import axios from "axios";

export enum ResultCode {
  Success = 0,
  Error,
}
export type ApiResponseType<D = {}, RC = ResultCode> = {
  data: D,
  messages: Array<string>,
  resultCode: RC
}
export type TodoListType = {
  id: string,
  title: string,
  addedDate: string,
  order: number,
}
export type SetResponseItemType = {
  item: TodoListType
}

const BASE_URL: string = `https://social-network.samuraijs.com/api/1.1`;

export const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'API-KEY': '326f0c95-3947-488e-9603-2e37b5da986c',
  }
})

export const todoListsAPI = {
  getAllTodoLists() {
    return instance.get<Array<TodoListType>>(`/todo-lists`);
  },
  setTodoLists(title: string) {
    return instance.post<ApiResponseType<SetResponseItemType>>(`/todo-lists/${title}`);
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ApiResponseType>(`/todo-lists/${todoListId}`)
  },
  updateTodoList(todoListId: string, title: string) {
    return instance.put<ApiResponseType>(`/todo-lists/${todoListId}`, {title: title})
  }
}

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
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ApiResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<UpdateTaskType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
}