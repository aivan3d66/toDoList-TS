import {FilterValueType} from "../App";

export type TaskType = {
  title: string
  isDone: boolean
  id: string
};
export type TodoListsType = {
  id: string,
  title: string,
  filter: FilterValueType,
};
export type TodoListTasksType = {
  [key: string]: Array<TaskType>,
}


