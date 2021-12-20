import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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
  const [title, setTitle] = useState<string>("");
  const tasksList = props.tasks.map((task: TaskType, index: number) => {
      return (
        <TodoListItem title={task.title}
                      removeTask={props.removeTask}
                      isDone={task.isDone}
                      key={index}
                      id={task.id}/>
      )
    }
  );

  const addTaskHandler  = () => {
    props.addTask(title);
    setTitle("")
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTaskHandler();
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onAllFilterHandler = () => props.changeFilter(FILTER_ALL);
  const onActiveFilterHandler = () => props.changeFilter(FILTER_ACTIVE);
  const onCompletedFilterHandler = () => props.changeFilter(FILTER_COMPLETED);

  return (
    <div className="tasks-list">
      <div>
        <h3 className="tasks-list__title">{props.title}</h3>
        <div className="tasks-list__field">
          <input value={title}
                 onKeyPress={onKeyPressHandler}
                 onChange={onChangeHandler}/>
          <button onClick={addTaskHandler}>+</button>
        </div>
        <ul className="tasks-list__items">
          {tasksList}
        </ul>
        <div className="tasks-list__buttons">
          <button onClick={onAllFilterHandler}>All</button>
          <button onClick={onActiveFilterHandler}>Active</button>
          <button onClick={onCompletedFilterHandler}>Completed</button>
        </div>
      </div>
    </div>
  )
}

export default TodoList;
