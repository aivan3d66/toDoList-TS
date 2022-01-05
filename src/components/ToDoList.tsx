import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TodoListItem} from "./TodoListItems/TodoListItem";
import {TaskType} from "../redux/state";
import {AddTask, ChangeFilter, ChangeStatus, FilterValueType, RemoveTask, RemoveTodoList} from "../App";
import {FILTERS, SET_ERROR_NAME} from "../common/constants";
import SuperButton from "../common/super-components/SuperButton/SuperButton";
import s from './../common/super-components/SuperButton/SuperButton.module.css';

type TodoListProps = {
  id: string,
  titleList: string,
  tasks: Array<TaskType>,
  removeTask: RemoveTask,
  changeFilter: ChangeFilter,
  addTask: AddTask,
  changeStatus: ChangeStatus,
  filter: FilterValueType,
  removeTodoList: RemoveTodoList,
};
type OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => void;
type OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type AddTaskHandler = () => void;
type OnRemoveListHandler = () => void;

const TodoList: React.FC<TodoListProps> = (
  {
    id,
    titleList,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeStatus,
    removeTodoList,
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
          listItemId={task.id}
          listId={id}
          changeStatus={changeStatus}
          key={index}
        />
      )
    }
  );

  const addTaskHandler: AddTaskHandler = () => {
    if (title.trim() !== "") {
      addTask(title, id);
      setTitle("");
      setError("");
    } else {
      setError(SET_ERROR_NAME);
    }
  };
  const onKeyPressHandler: OnKeyPressHandler = (e) => {
    if (e.charCode === 13) {
      addTaskHandler();
    }
  };
  const onChangeTitleHandler: OnChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
    setError("");
  };
  const getActiveBtnClassName = (filterValue: FilterValueType) => {
    return filter === filterValue ? s.activeClass : "";
  };
  const onRemoveListHandler: OnRemoveListHandler = () => removeTodoList(id);

  const onAllFilterHandler = () => changeFilter(FILTERS.ALL, id);
  const onActiveFilterHandler = () => changeFilter(FILTERS.ACTIVE, id);
  const onCompletedFilterHandler = () => changeFilter(FILTERS.COMPLETED, id);

  const getErrorClassName = error ? "error" : "";

  return (
    <div className="tasks-list">
      <div className="tasks-list__header">
        <h3 className="tasks-list__title">{titleList}</h3>
        <SuperButton
          onClick={onRemoveListHandler}
          red
        >
          X
        </SuperButton>
      </div>
      <div className="tasks-list__field">
        <input
          value={title}
          className={getErrorClassName}
          onKeyPress={onKeyPressHandler}
          onChange={onChangeTitleHandler}
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
        <SuperButton
          className={getActiveBtnClassName(FILTERS.ALL)}
          onClick={onAllFilterHandler}
        >
          All
        </SuperButton>
        <SuperButton
          className={getActiveBtnClassName(FILTERS.ACTIVE)}
          onClick={onActiveFilterHandler}
        >
          Active
        </SuperButton>
        <SuperButton
          className={getActiveBtnClassName(FILTERS.COMPLETED)}
          onClick={onCompletedFilterHandler}
        >
          Completed
        </SuperButton>
      </div>
    </div>
  )
}

export default TodoList;
