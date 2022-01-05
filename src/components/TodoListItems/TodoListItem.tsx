import React from "react";
import {ChangeStatus, RemoveTask} from "../../App";
import SuperCheckbox from "../../common/super-components/SuperCheckboxComponent/SuperCheckbox";
import SuperButton from "../../common/super-components/SuperButton/SuperButton";

type TodoListItemProps = {
  title: string
  isDone: boolean
  listItemId: string,
  todoListID: string,
  removeTask: RemoveTask,
  changeStatus: ChangeStatus,
};
type OnClickHandler = () => void;

export const TodoListItem: React.FC<TodoListItemProps> = (
  {
    title,
    isDone,
    listItemId,
    todoListID,
    removeTask,
    changeStatus
  }
) => {

  const onClickHandler: OnClickHandler = () => removeTask(todoListID, listItemId);
  const getIsDoneClassName = isDone ? "is-done" : "";

  return (
    <li className={getIsDoneClassName}>
      <SuperCheckbox
        checked={isDone}
        changeStatus={changeStatus}
        id={listItemId}
        todoListID={todoListID}
      />
      <span>{title}</span>
      <SuperButton onClick={onClickHandler}>
        -
      </SuperButton>
    </li>
  )
}
