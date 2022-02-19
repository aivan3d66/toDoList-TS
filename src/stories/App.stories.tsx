import {action} from "@storybook/addon-actions";
import React from "react";
import App from "../App";
import {ReduxStoreProviderDecorator} from "./RedusStoreProviderDecorator";

export default {
  title: 'Project/App Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
}

const callback = action("Editable Span value was changed");

export const AppExample = (props: any) => {
  return (
    <App/>
  )
}