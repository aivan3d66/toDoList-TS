import React from "react";
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Project/AddItemForm Component',
  component: AddItemForm
}

const callback = action("Btn 'add' was pressed inside the form");

export const AddItemFormExample = (props: any) => {
  return (
    <AddItemForm addTask={callback}/>
  )
}