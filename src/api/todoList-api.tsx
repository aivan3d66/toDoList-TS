import {TodoListType} from "../state/slices/todolist-reducer";
import {ApiResponseType, instance} from "./api";

export type SetResponseItemType = {
  item: TodoListType
}

export const todoListsAPI = {
  getAllTodoLists() {
    return instance.get<Array<TodoListType>>(`/todo-lists`);
  },
  setTodoLists(title: string) {
    return instance.post<ApiResponseType<SetResponseItemType>>(`/todo-lists`, {title: title}).then((res => res.data));
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ApiResponseType>(`/todo-lists/${todoListId}`)
  },
  updateTodoList(todoListId: string, title: string) {
    return instance.put<ApiResponseType>(`/todo-lists/${todoListId}`, {title: title})
  }
}
