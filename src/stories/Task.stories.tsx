import React from "react";
import {Task} from "../features/TodoListLists/TodoList/TodoListItems/Task";
import {v1} from "uuid";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "./RedusStoreProviderDecorator";
import {TaskStatuses} from "../api/tasks-api";

export default {
  title: 'Project/Components/Task Component',
  component: Task,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskExampleDone = Template.bind({});
TaskExampleDone.args = {
  title: "react",
  id: v1(),
  todoListID: v1(),
  status: TaskStatuses.Completed
}
export const TaskExampleNotDone = Template.bind({});
TaskExampleNotDone.args = {
  title: "TypeScript",
  id: v1(),
  todoListID: v1(),
  status: TaskStatuses.New
}
