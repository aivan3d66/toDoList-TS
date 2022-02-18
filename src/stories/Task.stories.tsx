import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../components/TodoListItems/Task";

export default {
  title: 'Task Component',
  component: Task
}

const callback = action("Btn 'add' was pressed inside the form");

export const TaskExample = (props: any) => {
  return (
    <>
      <Task title={'React'} id={'1'} isDone={true} todoListID={'1'}/>
    </>
  )
}