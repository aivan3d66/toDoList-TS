import React from "react";
import {Task} from "./Task";
import {TasksResponseType} from "../../../../api/tasks-api";

type TodoListItemsPropsType = {
  tasks: Array<TasksResponseType>,
  todoListID: string,
}

export const TodoListTasks = React.memo((props: TodoListItemsPropsType) => {
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

  const tasksList = tasks.map((task, index) => {
      return (
        <Task
          title={task.title}
          id={task.id}
          key={index}
          todolistId={todoListID}
          status={task.status}
          startDate={task.startDate}
          description={task.description}
          order={task.order}
          priority={task.priority}
          addedDate={task.addedDate}
          deadline={task.deadline}
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
