import React, {ChangeEvent, KeyboardEvent} from "react";
import {TodoListItem} from "./TodoListItems/TodoListItem";
import {TaskType} from "../redux/state";
import {
  AddTask,
  ChangeFilter,
  ChangeStatus,
  ChangeTaskTitleType, ChangeTodoListTitleType,
  FilterValueType,
  RemoveTask,
  RemoveTodoList
} from "../App";
import {FILTERS} from "../common/constants";
import SuperButton from "../common/super-components/SuperButton/SuperButton";
import s from './../common/super-components/SuperButton/SuperButton.module.css';
import '../App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./TodoListItems/EditableSpan/EditableSpan";

export type TodoListProps = {
  todoListID: string,
  titleList: string,
  tasks: Array<TaskType>,
  removeTask: RemoveTask,
  changeFilter: ChangeFilter,
  addTask: AddTask,
  changeStatus: ChangeStatus,
  filter: FilterValueType,
  removeTodoList: RemoveTodoList,
  changeTaskTitle: ChangeTaskTitleType,
  changeTodoListTitle: ChangeTodoListTitleType
};
export type OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => void;
export type OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
export type AddTaskHandler = () => void;
export type OnRemoveListHandler = () => void;

const TodoList: React.FC<TodoListProps> = (
  {
    todoListID,
    removeTodoList,
    titleList,
    tasks,
    addTask,
    removeTask,
    filter,
    changeFilter,
    changeStatus,
    changeTaskTitle,
    changeTodoListTitle
  }
) => {
  const getActiveBtnClassName = (filterValue: FilterValueType) => {
    return filter === filterValue ? s.activeClass : "";
  };
  const onRemoveListHandler: OnRemoveListHandler = () => removeTodoList(todoListID);
  const onChangeTodoListTitle = (title: string) => {
    changeTodoListTitle(todoListID, title)
  }
  const addTaskHandler = (title: string) => {
    addTask(todoListID, title)
  };
  const onAllFilterHandler = () => changeFilter(todoListID, FILTERS.ALL);
  const onActiveFilterHandler = () => changeFilter(todoListID, FILTERS.ACTIVE);
  const onCompletedFilterHandler = () => changeFilter(todoListID, FILTERS.COMPLETED);

  const tasksList = tasks.map((task: TaskType, index: number) => {
      return (
        <TodoListItem
          title={task.title}
          removeTask={removeTask}
          isDone={task.isDone}
          listItemId={task.id}
          todoListID={todoListID}
          changeStatus={changeStatus}
          key={index}
          changeTaskTitle={changeTaskTitle}
        />
      )
    }
  );

  return (
    <div className="tasks-list">
      <div className="tasks-list__header">
        <EditableSpan title={titleList} onChange={onChangeTodoListTitle}/>
        <SuperButton
          onClick={onRemoveListHandler}
          red
        >
          X
        </SuperButton>
      </div>
      <AddItemForm
        addTask={addTaskHandler}
      />

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
