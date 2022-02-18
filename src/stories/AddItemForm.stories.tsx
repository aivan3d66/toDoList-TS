import React from "react";
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
  title: 'AddItemForm Component',
  component: AddItemForm
}

action("Btn 'add' was pressed inside the form");

export const AddItemFormExample = (props: any) => {
  return (
    <AddItemForm addTask={(title: string) => alert(title)}/>
  )
}