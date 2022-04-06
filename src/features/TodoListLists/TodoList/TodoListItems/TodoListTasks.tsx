import React from "react";
import {Task} from "./Task";
import {TasksResponseType} from "../../../../api/tasks-api";

type TodoListItemsPropsType = {
  tasks: Array<TasksResponseType>,
  todoListID: string,
}

export const TodoListTasks = React.memo((props: TodoListItemsPropsType) => {
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
    <ul style={{
      listStyle: "none",
      width: "100%",
      height: "205px",
      margin: "20px 0 40px 0",
      padding: "0",
      overflowY: tasks.length > 4 ? "scroll" : "hidden",
    }}>
      {tasks.length === 0 ? <p style={{
        width: "100%",
        marginTop: "50px",
        color: "#bababa",
        fontSize: "20px",
        textAlign: "center",
        textTransform: "uppercase"
      }}>Empty list</p> : tasksList}
    </ul>
  )
});
