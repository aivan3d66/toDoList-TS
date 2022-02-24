import React from "react";
import App from "../App";
import {ReduxStoreProviderDecorator} from "./RedusStoreProviderDecorator";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
  title: 'Project/Components/App Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args) => <App {...args}/>

export const AppExample = Template.bind({});
AppExample.args = {}