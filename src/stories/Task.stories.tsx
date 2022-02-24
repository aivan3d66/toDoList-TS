import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../components/TodoListItems/Task";
import {v1} from "uuid";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "./RedusStoreProviderDecorator";

export default {
  title: 'Project/Components/Task Component',
  component: Task,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskExampleDone = Template.bind({});
TaskExampleDone.args = {
  title: "react",
  isDone: true,
  id: v1(),
  todoListID: v1(),
}
export const TaskExampleNotDone = Template.bind({});
TaskExampleNotDone.args = {
  title: "TypeScript",
  isDone: false,
  id: v1(),
  todoListID: v1(),
}
const onCheckboxChangeCallback = action("Checkbox was changed");
const onSpanChangeCallback = action("Span was changed");
const onBtnClickCallback = action("Delete btn was clicked");
