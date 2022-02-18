import React from "react";
import {AddItemForm} from "../components/AddItemForm";

export default {
  title: 'AddItemForm Component',
  component: AddItemForm
}

export const AddItemFormExample = (props: any) => {
  return (
    <AddItemForm addTask={(title: string) => alert(title)}/>
  )
}