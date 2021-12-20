import React from "react";
import {TodoListItem} from "./TodoListItems/TodoListItem";
import {TaskType} from "../redux/state";
import {FilterValueType} from "../App";
import {FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE} from "../common/constants";


type TodoListProps = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string) => void,
  changeFilter: (value: FilterValueType) => void,
}

const TodoList: React.FC<TodoListProps> = (props) => {
  let tasksList = props.tasks.map((task: TaskType, index: number) => {
      return (
        <TodoListItem title={task.title}
                      removeTask={props.removeTask}
                      isDone={task.isDone}
                      key={index}
                      id={task.id}/>
      )
    }
  );

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
          <button onClick={() => {
            props.changeFilter(FILTER_ALL)
          }}>All
          </button>
          <button onClick={() => {
            props.changeFilter(FILTER_ACTIVE)
          }}>Active
          </button>
          <button onClick={() => {
            props.changeFilter(FILTER_COMPLETED)
          }}>Completed
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoList;
