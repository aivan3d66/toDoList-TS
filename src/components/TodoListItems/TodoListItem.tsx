import React from "react";
import {ChangeStatus, ChangeTaskTitleType, RemoveTask} from "../../App";
import SuperCheckbox from "../../common/super-components/SuperCheckboxComponent/SuperCheckbox";
import SuperButton from "../../common/super-components/SuperButton/SuperButton";
import {EditableSpan} from "./EditableSpan/EditableSpan";

type TodoListItemProps = {
  title: string
  isDone: boolean
  listItemId: string,
  todoListID: string,
  removeTask: RemoveTask,
  changeStatus: ChangeStatus,
  changeTaskTitle: ChangeTaskTitleType
};
type OnClickHandler = () => void;

export const TodoListItem: React.FC<TodoListItemProps> = (
  {
    title,
    isDone,
    listItemId,
    todoListID,
    removeTask,
    changeStatus,
    changeTaskTitle
  }
) => {

  const onClickHandler: OnClickHandler = () => removeTask(todoListID, listItemId);
  const getIsDoneClassName = isDone ? "is-done" : "";
  const onChangeTitleHandler = (newValue: string) => {
    changeTaskTitle(todoListID, listItemId, newValue)
  }

  return (
    <li className={getIsDoneClassName}>
      <SuperCheckbox
        checked={isDone}
        changeStatus={changeStatus}
        id={listItemId}
        todoListID={todoListID}
      />
      <EditableSpan title={title} onChange={onChangeTitleHandler}/>
      <SuperButton onClick={onClickHandler}>
        -
      </SuperButton>
    </li>
  )
}


