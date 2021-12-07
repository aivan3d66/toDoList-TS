import React from "react";
import {TaskType} from "../../redux/state";

export const TodoListItem: React.FC<TaskType> = (props) => {
  return (
    <li>
      <input type="checkbox" checked={props.isDone}/>
      <span>{props.title}</span>
    </li>
  )
}
