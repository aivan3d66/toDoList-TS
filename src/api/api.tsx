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

type CreateTodoListResponseType = {
  data: {
    item: TodoListType
  },
  messages: Array<string>,
  resultCode: ResultCode
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
    return instance.post<CreateTodoListResponseType>(`/todo-lists/${title}`);
  },
  deleteTodoList(todoListId: string) {
    return instance.delete(`/todo-lists/${todoListId}`)
  },
  updateTodoList(todoListId: string, title: string) {
    return instance.put(`/todo-lists/${todoListId}`, {title: title})
  }
}
