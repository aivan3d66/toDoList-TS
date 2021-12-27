import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TodoListItem} from "./TodoListItems/TodoListItem";
import {TaskType} from "../redux/state";
import {AddTask, ChangeStatus, FilterValueType, RemoveTask} from "../App";
import {FILTER_ALL, FILTER_COMPLETED, FILTER_ACTIVE} from "../common/constants";

type TodoListProps = {
  titleList: string,
  tasks: Array<TaskType>,
  removeTask: RemoveTask,
  changeFilter: (value: FilterValueType) => void,
  addTask: AddTask,
  changeStatus: ChangeStatus,
}

const TodoList: React.FC<TodoListProps> = (
  {
    titleList,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeStatus
  }
) => {
  const [title, setTitle] = useState<string>("");
  const tasksList = tasks.map((task: TaskType, index: number) => {
      return (
        <TodoListItem title={task.title}
                      removeTask={removeTask}
                      isDone={task.isDone}
                      id={task.id}
                      changeStatus={changeStatus}
                      key={index}
        />
      )
    }
  );

  const addTaskHandler  = () => {
    addTask(title);
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

  const onAllFilterHandler = () => changeFilter(FILTER_ALL);
  const onActiveFilterHandler = () => changeFilter(FILTER_ACTIVE);
  const onCompletedFilterHandler = () => changeFilter(FILTER_COMPLETED);

  return (
    <div className="tasks-list">
      <div>
        <h3 className="tasks-list__title">{titleList}</h3>
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
