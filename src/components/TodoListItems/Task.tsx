import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, useCallback} from "react";
import {changeStatusTaskAC, changeTaskTitleAC, deleteTodoListTask} from "../../state/task-reducer";
import {useDispatch} from "react-redux";
import {v1} from "uuid";
import {TasksResponseType, TaskStatuses} from "../../api/tasks-api";

type TaskPropsType = TasksResponseType & {
  todoListID: string,
}

export const Task = React.memo((props: TaskPropsType) => {
  const {
    title,
    id,
    todoListID,
    status
  } = props;

  const taskStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 0",
    margin: "0",
    fontSize: "14px",
    borderBottom: "1px solid #bababa",
    opacity: status === TaskStatuses.Completed ? "0.4" : "",
  }

  const dispatch = useDispatch();
  const onClickHandler = useCallback(() => {
    dispatch(deleteTodoListTask(todoListID, id));
  }, [todoListID, id]);
  const onChangeTitleHandler = useCallback((newValue: string) => {
    dispatch(changeTaskTitleAC(todoListID, id, newValue))
  }, [todoListID, id]);
  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newStatusValue;

    if (e.currentTarget.checked) {
      newStatusValue = TaskStatuses.Completed
    } else {
      newStatusValue = TaskStatuses.New
    }
    dispatch(changeStatusTaskAC(todoListID, id, newStatusValue));
  }, [todoListID, id]);

  return (
    <li key={v1()} style={taskStyles}>
      <Checkbox
        color={"success"}
        checked={status === TaskStatuses.Completed}
        onChange={onChangeStatusHandler}
      />
      <EditableSpan
        title={title}
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
})
