
export type TaskType = {
  title: string
  isDone: boolean
  id: string
};
export type TodoListTasksType = {
  [key: string]: Array<TaskType>,
}


