// BLL
export type TaskType = {
  title: string
  isDone: boolean
  id: number
  removeTask?: Function,
}

export type StateType = {
  todoListTitle: string,
  tasks: Array<TaskType>,
}

const state: StateType = {
  todoListTitle: "What to do",
  tasks: [
    {id: 1, title: "HTML", isDone: true},
    {id: 2, title: "CSS", isDone: true},
    {id: 4, title: "JavaScript", isDone: false},
    {id: 5, title: "TypeScript", isDone: false},
    {id: 6, title: "React", isDone: false},
  ],
}

export default state;
