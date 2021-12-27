import React, {ChangeEvent} from "react";
import {ChangeStatus} from "../../App";
import SuperCheckbox from "../../common/super-components/SuperCheckbox";

type TodoListItemProps = {
  title: string
  isDone: boolean
  id: string
  removeTask: (id: string) => void,
  changeStatus: ChangeStatus,
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
      <input type="checkbox"
             onChange={onChangeHandler}
             checked={isDone}
      />
      <span>{title}</span>
      <button onClick={onClickHandler}>-</button>
    </li>
  )
}
