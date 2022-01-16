import React, {ChangeEvent} from "react";
import {TaskType} from "../../redux/state";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {ChangeStatus, ChangeTaskTitleType, RemoveTask} from "../../App";
import {Button, Checkbox} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
      // const onChangeStatusHandler = (isDone: boolean) => {
      //   changeTaskStatus(todoListID, task.id, isDone)
      // }
      const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListID, task.id, (e.currentTarget.checked))
      }

      return (
        <li className={getIsDoneClassName} key={index}>
          <Checkbox
            checked={task.isDone}
            onChange={onChangeStatusHandler}
          />
          <EditableSpan
            title={task.title}
            onChange={onChangeTitleHandler}
          />
          <Button
            onClick={onClickHandler}
            startIcon={<DeleteIcon/>}
            variant={'outlined'}
            color={'error'}
          />
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
