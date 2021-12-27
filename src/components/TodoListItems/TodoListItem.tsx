import React from "react";

type TodoListItemProps = {
  title: string
  isDone: boolean
  id: string
  removeTask: (id: string) => void,
}

type OnClickHandler = () => void

export const TodoListItem: React.FC<TodoListItemProps> = (
  {
    title,
    isDone,
    id,
    removeTask,
    changeStatus
  }
) => {
  const onClickHandler: OnClickHandler = () => removeTask(id);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeStatus(id, e.currentTarget.checked);
  }

  return (
    <li>
      <input type="checkbox" checked={props.isDone}/>
      <span>{props.title}</span>
      <button onClick={onClickHandler}>-</button>
    </li>
  )
}
