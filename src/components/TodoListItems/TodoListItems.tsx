import React, {ChangeEvent} from "react";
import {TaskType} from "../../redux/state";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {ChangeStatus, ChangeTaskTitleType, RemoveTask} from "../../App";
import {Checkbox, IconButton} from "@mui/material";
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
        <li key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "4px 0",
              margin: "6px 0",
              borderBottom: "1px solid #bababa",
              opacity: task.isDone ? "0.4" : "",
            }}
        >
          <Checkbox
            color={"success"}
            checked={task.isDone}
            onChange={onChangeStatusHandler}
          />
          <EditableSpan
            title={task.title}
            onChange={onChangeTitleHandler}
          />
          <IconButton
            onClick={onClickHandler}
            color={'default'}
            size={'small'}>
            <DeleteIcon/>
          </IconButton>
        </li>
      )
    }
  );

  return (
    <ul style={{
      listStyle: "none",
      width: "100%",
      margin: "20px 0 40px 0",
      padding: "0",
    }}>
      {tasks.length === 0 ? <p>No tasks yet ...</p> : tasksList}
    </ul>
  )
}
