import {v1} from "uuid";

// BLL

export type TaskType = {
  title: string
  isDone: boolean
  id: string
}

export type StateType = {
  todoListTitle: string,
  tasks: Array<TaskType>,
}

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
