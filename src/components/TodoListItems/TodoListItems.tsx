import React, {ChangeEvent} from "react";
import {TaskType} from "../../redux/state";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeStatusTaskAC, changeTaskTitleAC, removeTaskAC} from "../../state/task-reducer";

type TodoListItemsPropsType = {
  tasks: Array<TaskType>,
  todoListID: string,
}

export const TodoListItems = React.memo((props: TodoListItemsPropsType) => {
  const tasksListStyles = {
    listStyle: "none",
    width: "100%",
    margin: "20px 0 40px 0",
    padding: "0",
  }
  const {
    tasks,
    todoListID,
  } = props;

  const dispatch = useDispatch();

  const tasksList = tasks.map((task: TaskType, index: number) => {
      const onClickHandler = () => dispatch(removeTaskAC(todoListID, task.id));
      const onChangeTitleHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(todoListID, task.id, newValue))
      }
      const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeStatusTaskAC(todoListID, task.id, newIsDoneValue));
      }

      const taskStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4px 0",
        margin: "0",
        fontSize: "14px",
        borderBottom: "1px solid #bababa",
        opacity: task.isDone ? "0.4" : "",
      }

      return (
        <li key={index} style={taskStyles}>
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
    <ul style={tasksListStyles}>
      {tasks.length === 0 ? <p>No tasks yet ...</p> : tasksList}
    </ul>
  )
});
