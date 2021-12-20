import React from "react";

type TodoListItemProps = {
  title: string
  isDone: boolean
  id: string
  removeTask: (id: string) => void,
}

type OnClickHandler = () => void

export const TodoListItem: React.FC<TodoListItemProps> = (props) => {
  const onClickHandler: OnClickHandler = () => props.removeTask(props.id);

  return (
    <li>
      <input type="checkbox" checked={props.isDone}/>
      <span>{props.title}</span>
      <button onClick={onClickHandler}>-</button>
    </li>
  )
}
