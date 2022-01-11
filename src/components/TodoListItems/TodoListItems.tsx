import React from "react";
import {TaskType} from "../../redux/state";
import SuperCheckbox from "../../common/super-components/SuperCheckboxComponent/SuperCheckbox";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import SuperButton from "../../common/super-components/SuperButton/SuperButton";
import {ChangeStatus, ChangeTaskTitleType, RemoveTask} from "../../App";

type OnClickHandler = () => void;
type TodoListItemsPropsType = {
  tasks: Array<TaskType>,
  changeTaskStatus: ChangeStatus,
  changeTaskTitle: ChangeTaskTitleType,
  removeTask: RemoveTask,
  todoListID: string,
}

export const TodoListItems: React.FC<TodoListItemsPropsType> = (
  {
    tasks,
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    todoListID,
  }
) => {


  const tasksList = tasks.map((task: TaskType, index: number) => {
      const getIsDoneClassName = task.isDone ? "is-done" : "";
      const onClickHandler: OnClickHandler = () => removeTask(todoListID, task.id);
      const onChangeTitleHandler = (newValue: string) => {
        changeTaskTitle(todoListID, task.id, newValue)
      }
      const onChangeStatusHandler = (isDone: boolean) => {
        changeTaskStatus(todoListID, task.id, isDone)
      }

      return (
        <li className={getIsDoneClassName} key={index}>
          <SuperCheckbox
            checked={task.isDone}
            onChangeChecked={onChangeStatusHandler}
          />
          <EditableSpan
            title={task.title}
            onChange={onChangeTitleHandler}
          />
          <SuperButton onClick={onClickHandler}>
            -
          </SuperButton>
        </li>
      )
    }
  );

  return (
    <ul className="tasks-list__items">
      {tasksList}
    </ul>
  )
}
