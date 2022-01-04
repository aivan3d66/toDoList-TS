import {v1} from "uuid";
import {FILTERS} from "../common/constants";
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

export const todoListId1 = v1();
export const todoListId2 = v1();

export const todoList: Array<TodoListsType> = [
  {
    id: todoListId1,
    title: "What to learn",
    filter: FILTERS.ALL,
  },
  {
    id: todoListId2,
    title: "What to buy",
    filter: FILTERS.ALL,
  },
]

const state: StateType = {
  todoListTitle: "What to do",
  tasks: [
    {id: v1(), title: "HTML", isDone: true},
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JavaScript", isDone: false},
    {id: v1(), title: "TypeScript", isDone: false},
    {id: v1(), title: "React", isDone: false},
  ],
}

export default state;
