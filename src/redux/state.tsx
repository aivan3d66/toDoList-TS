// BLL
export type TaskType = {
  title: string
  isDone: boolean
  id: number
  removeTask?: Function,
}

export type StateType = {
  todoListTitle: Array<string>,
  tasksWeb: Array<TaskType>,
  tasksBuy: Array<TaskType>,
}

const state: StateType = {
  todoListTitle: ["What to do", "What to buy"],
  tasksWeb: [
    {id: 1, title: "HTML", isDone: true},
    {id: 2, title: "CSS", isDone: false},
    {id: 4, title: "JavaScript", isDone: false},
    {id: 5, title: "TypeScript", isDone: false},
    {id: 6, title: "React", isDone: false},
  ],

  tasksBuy: [
    {id: 4, title: "Potato", isDone: true},
    {id: 5, title: "Beer", isDone: true},
    {id: 6, title: "Fish", isDone: false},
  ],
}

export default state;
