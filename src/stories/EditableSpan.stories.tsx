import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/TodoListItems/EditableSpan/EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
  title: 'Project/Components/Editable Component',
  component: EditableSpan,
  argTypes: {
    value: {
      title: 'Title for double click',
      description: 'string',
    },
    onChange: {
      description: "Editable Span value was changed"
    },
  },
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  title: 'Title for double click',
  onChange: action("Editable Span value was changed")
}