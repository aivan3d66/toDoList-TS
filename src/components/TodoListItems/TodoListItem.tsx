import React from "react";
import {ChangeStatus} from "../../App";
import SuperCheckbox from "../../common/super-components/SuperCheckboxComponent/SuperCheckbox";
import SuperButton from "../../common/super-components/SuperButton/SuperButton";

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

  return (
    <li className={isDone ? "is-done" : ""}>
      <SuperCheckbox
        checked={isDone}
        changeStatus={changeStatus}
        id={id}
      />
      <span>{title}</span>
      <SuperButton onClick={onClickHandler}>
        -
      </SuperButton>
    </li>
  )
}
