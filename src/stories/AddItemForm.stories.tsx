import React from "react";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
  title: 'Project/Components/AddItemForm Component',
  component: AddItemForm,
  argTypes: {
    addTask: {
      description: "Btn 'add' was pressed inside the form",
    },
  },
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addTask: action("Btn 'add' was pressed inside the form"),
}

export const AddItemFormDisableExample = Template.bind({});
AddItemFormDisableExample.args = {
  addTask: action("Btn 'add' unavailable for press"),
  disabled: true
}
