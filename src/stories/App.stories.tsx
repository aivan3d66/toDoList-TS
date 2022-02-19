import {action} from "@storybook/addon-actions";
import React from "react";
import App from "../App";
import {Provider} from "react-redux";
import store from "../state/redux-store";

export default {
  title: 'Project/App Component',
  component: App
}

const callback = action("Editable Span value was changed");

export const AppExample = (props: any) => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}