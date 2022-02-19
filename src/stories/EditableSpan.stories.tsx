import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/TodoListItems/EditableSpan/EditableSpan";

export default {
  title: 'Editable Component',
  component: EditableSpan
}

const callback = action("Editable Span value was changed");

export const EditableSpanExample = (props: any) => {
  return (
    <>
      <span style={{fontWeight: "bold", fontSize: "20px"}}>Double click on this text &#8595;</span>
      <EditableSpan title={'Span title value'} onChange={callback}/>
    </>
  )
}