import React from "react";
import {ChangeStatus, RemoveTask} from "../../App";
import SuperCheckbox from "../../common/super-components/SuperCheckboxComponent/SuperCheckbox";
import SuperButton from "../../common/super-components/SuperButton/SuperButton";

type TodoListItemProps = {
  title: string
  isDone: boolean
  listItemId: string,
  listId: string,
  removeTask: RemoveTask,
  changeStatus: ChangeStatus,
};
type OnClickHandler = () => void;

export const TodoListItem: React.FC<TodoListItemProps> = (
  {
    title,
    isDone,
    listItemId,
    listId,
    removeTask,
    changeStatus
  }
) => {

  const onClickHandler: OnClickHandler = () => removeTask(listItemId, listId);
  const getIsDoneClassName = isDone ? "is-done" : "";

  return (
    <li className={getIsDoneClassName}>
      <SuperCheckbox
        checked={isDone}
        changeStatus={changeStatus}
        id={listItemId}
        listId={listId}
      />
      <span>{title}</span>
      <SuperButton onClick={onClickHandler}>
        -
      </SuperButton>
    </li>
  )
}
