import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../components/TodoListItems/Task";
import { v1 } from "uuid";
import { Provider } from "react-redux";
import store from "../state/redux-store";

export default {
  title: 'Task Component',
  component: Task
}

const taskStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 0",
  margin: "0",
  fontSize: "14px",
  borderBottom: "1px solid #bababa",
}

const onCheckboxChangeCallback = action("Checkbox was changed");
const onSpanChangeCallback = action("Span was changed");
const onBtnClickCallback = action("Delete btn was clicked");

export const TaskExample = (props: any) => {
  return (
    <Provider store={store}>
      <Task
        title={'React'}
        id={v1()}
        isDone={false}
        todoListID={v1()}
      />
      <Task
        title={'TS'}
        id={v1()}
        isDone={true}
        todoListID={v1()}
      />
    </Provider>
  )
}