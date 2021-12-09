import React from "react";
import {TodoListItem} from "./TodoListItems/TodoListItem";
import {TaskType} from "../redux/state";

type TodoListProps = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: Function,
}

const TodoList: React.FC<TodoListProps> = (props) => {
  let tasksList = props.tasks.map((task: TaskType, index: number) => <TodoListItem title={task.title}
                                                                              removeTask={props.removeTask}
                                                                              isDone={task.isDone}
                                                                              key={index}
                                                                              id={task.id}/>);
  return (
    <div className="tasks-list">
      <div>
        <h3 className="tasks-list__title">{props.title}</h3>
        <div className="tasks-list__field">
          <input/>
          <button>+</button>
        </div>
        <ul className="tasks-list__items">
          {tasksList}
        </ul>
        <div className="tasks-list__buttons">
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  )
}

export default TodoList;
