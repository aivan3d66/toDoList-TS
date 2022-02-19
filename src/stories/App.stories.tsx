import {action} from "@storybook/addon-actions";
import React from "react";
import App from "../App";

export default {
  title: 'Project/App Component',
  component: App
}

const callback = action("Editable Span value was changed");

export const AppExample = (props: any) => {
  return (
    <App/>
  )
}