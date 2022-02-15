import {TaskType} from "../../redux/state";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, useCallback} from "react";
import {changeStatusTaskAC, changeTaskTitleAC, removeTaskAC} from "../../state/task-reducer";
import {useDispatch} from "react-redux";
import {v1} from "uuid";

type TaskPropsType = TaskType & {
  todoListID: string
}

export const Task = (props: TaskPropsType) => {
  const {
    title,
    isDone,
    id,
    todoListID,
  } = props;

  const taskStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 0",
    margin: "0",
    fontSize: "14px",
    borderBottom: "1px solid #bababa",
    opacity: isDone ? "0.4" : "",
  }

  const dispatch = useDispatch();
  const onClickHandler = useCallback(() => {
    dispatch(removeTaskAC(todoListID, id));
  }, [todoListID, id]);
  const onChangeTitleHandler = useCallback((newValue: string) => {
    dispatch(changeTaskTitleAC(todoListID, id, newValue))
  }, [todoListID, id]);
  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeStatusTaskAC(todoListID, id, newIsDoneValue));
  }, [todoListID, id]);

  return (
    <li key={v1()} style={taskStyles}>
      <Checkbox
        color={"success"}
        checked={isDone}
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
}
