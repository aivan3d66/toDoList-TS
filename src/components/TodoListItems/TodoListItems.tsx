import React from "react";
import {TaskType} from "../../redux/state";
import {Task} from "./Task";

type TodoListItemsPropsType = {
  tasks: Array<TaskType>,
  todoListID: string,
}

export const TodoListItems = React.memo((props: TodoListItemsPropsType) => {
  const tasksListStyles = {
    listStyle: "none",
    width: "100%",
    margin: "20px 0 40px 0",
    padding: "0",
  }
  const {
    tasks,
    todoListID,
  } = props;

  const tasksList = tasks.map((task: TaskType, index) => {
      return (
        <Task
          title={task.title}
          isDone={task.isDone}
          id={task.id}
          todoListID={todoListID}
          key={index}
        />
      )
    }
  );

  return (
    <ul style={tasksListStyles}>
      {tasks.length === 0 ? <p>No tasks yet ...</p> : tasksList}
    </ul>
  )
});
