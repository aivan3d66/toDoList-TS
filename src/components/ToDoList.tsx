import React, {useState} from "react";
import {TodoListItem} from "./TodoListItems/TodoListItem";
import {TaskType} from "../redux/state";
import {AddTask, FilterValueType, RemoveTask} from "../App";
import {FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE} from "../common/constants";


type TodoListProps = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: RemoveTask,
  changeFilter: (value: FilterValueType) => void,
  addTask: AddTask;
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

  const [title, setTitle] = useState("");
  const addTask = () => {
    props.addTask(title);
    setTitle("")
  }

  return (
    <div className="tasks-list">
      <div>
        <h3 className="tasks-list__title">{props.title}</h3>
        <div className="tasks-list__field">
          <input value={title}
                 onChange={(e) => setTitle(e.currentTarget.value)}/>
          <button onClick={addTask}>+</button>
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
