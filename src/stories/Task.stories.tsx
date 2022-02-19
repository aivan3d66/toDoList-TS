import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../components/TodoListItems/Task";
import {v1} from "uuid";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../components/TodoListItems/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";

export default {
  title: 'Task Component',
  component: Task
}

const taskStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 0",
  margin: "0",
  fontSize: "14px",
  borderBottom: "1px solid #bababa",
}

const onCheckboxChangeCallback = action("Checkbox was changed");
const onSpanChangeCallback = action("Span was changed");
const onBtnClickCallback = action("Delete btn was clicked");

export const TaskExample = (props: any) => {
  return (
    <>
      <li key={v1()} style={taskStyles}>
        <Checkbox
          color={"success"}
          checked={true}
          onChange={onCheckboxChangeCallback}
        />
        <EditableSpan
          title={'React'}
          onChange={onSpanChangeCallback}
        />
        <IconButton
          onClick={onBtnClickCallback}
          color={'default'}
          size={'small'}>
          <DeleteIcon/>
        </IconButton>
      </li>
      <li key={v1()} style={taskStyles}>
        <Checkbox
          color={"success"}
          checked={false}
          onChange={onCheckboxChangeCallback}
        />
        <EditableSpan
          title={'TypeScript'}
          onChange={onSpanChangeCallback}
        />
        <IconButton
          onClick={onBtnClickCallback}
          color={'default'}
          size={'small'}>
          <DeleteIcon/>
        </IconButton>
      </li>
    </>
  )
}