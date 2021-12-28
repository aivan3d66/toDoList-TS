import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TodoListItem} from "./TodoListItems/TodoListItem";
import {TaskType} from "../redux/state";
import {AddTask, ChangeStatus, FilterValueType, RemoveTask} from "../App";
import {FILTERS} from "../common/constants";
import SuperButton from "../common/super-components/SuperButton/SuperButton";

type TodoListProps = {
  titleList: string,
  tasks: Array<TaskType>,
  removeTask: RemoveTask,
  changeFilter: (value: FilterValueType) => void,
  addTask: AddTask,
  changeStatus: ChangeStatus,
  filter: FilterValueType,
};
type OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => void;
type OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type AddTaskHandler = () => void;

const TodoList: React.FC<TodoListProps> = (
  {
    titleList,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeStatus,
    filter
  }
) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const tasksList = tasks.map((task: TaskType, index: number) => {
      return (
        <TodoListItem
          title={task.title}
          removeTask={removeTask}
          isDone={task.isDone}
          id={task.id}
          changeStatus={changeStatus}
          key={index}
        />
      )
    }
  );

  const addTaskHandler: AddTaskHandler = () => {
    if (title.trim() !== "") {
      addTask(title);
      setTitle("")
      setError("")
    } else {
      setError("Field is required")
    }
  }
  const onKeyPressHandler: OnKeyPressHandler = (e) => {
    if (e.charCode === 13) {
      addTaskHandler();
    }
  }
  const onChangeHandler: OnChangeHandler = (e) => {
    setTitle(e.currentTarget.value)
  }

  const onAllFilterHandler = () => changeFilter(FILTERS.ALL);
  const onActiveFilterHandler = () => changeFilter(FILTERS.ACTIVE);
  const onCompletedFilterHandler = () => changeFilter(FILTERS.COMPLETED);

  return (
    <div className="tasks-list">
      <h3 className="tasks-list__title">{titleList}</h3>
      <div className="tasks-list__field">
        <input
          value={title}
          className={error ? "error" : ""}
          onKeyPress={onKeyPressHandler}
          onChange={onChangeHandler}
        />
        <SuperButton
          red={!!error}
          onClick={addTaskHandler}
        >
          +
        </SuperButton>
        {error && <div className="error-message">{error}</div>}
      </div>

      <ul className="tasks-list__items">
        {tasksList}
      </ul>

      <div className="tasks-list__buttons">
        <button className={filter === FILTERS.ALL ? "active-class" : ""}
                onClick={onAllFilterHandler}>All
        </button>
        <button className={filter === FILTERS.ACTIVE ? "active-class" : ""}
                onClick={onActiveFilterHandler}>Active
        </button>
        <button className={filter === FILTERS.COMPLETED ? "active-class" : ""}
                onClick={onCompletedFilterHandler}>Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList;
