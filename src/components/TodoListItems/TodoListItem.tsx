import React from "react";

type TodoListItemProps = {
  title: string
  isDone: boolean
  id: number
  removeTask: (id: number) => void,
}

export const TodoListItem: React.FC<TodoListItemProps> = (props) => {
  return (
    <li>
      <input type="checkbox" checked={props.isDone}/>
      <span>{props.title}</span>
      <button onClick={() => props.removeTask(props.id)}>-</button>
    </li>
  )
}
