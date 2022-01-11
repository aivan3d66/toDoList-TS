import React from "react";
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
import {TodoListItems} from "./TodoListItems/TodoListItems";

export type TodoListProps = {
  todoListID: string,
  titleList: string,
  tasks: Array<TaskType>,
  removeTask: RemoveTask,
  changeFilter: ChangeFilter,
  addTask: AddTask,
  changeTaskStatus: ChangeStatus,
  filter: FilterValueType,
  removeTodoList: RemoveTodoList,
  changeTaskTitle: ChangeTaskTitleType,
  changeTodoListTitle: ChangeTodoListTitleType
};
export type OnRemoveListHandler = () => void;

const TodoList: React.FC<TodoListProps> = (
  {
    todoListID,
    changeTodoListTitle,
    removeTodoList,
    titleList,
    changeTaskTitle,
    filter,
    changeFilter,
    tasks,
    addTask,
    removeTask,
    changeTaskStatus,
  }
) => {

  const onRemoveListHandler: OnRemoveListHandler = () => removeTodoList(todoListID);
  const onChangeTodoListTitle = (title: string) => {
    changeTodoListTitle(todoListID, title)
  };
  const addTaskHandler = (title: string) => {
    addTask(todoListID, title)
  };

  const onAllFilterHandler = () => changeFilter(todoListID, FILTERS.ALL);
  const onActiveFilterHandler = () => changeFilter(todoListID, FILTERS.ACTIVE);
  const onCompletedFilterHandler = () => changeFilter(todoListID, FILTERS.COMPLETED);

  const getActiveBtnClassName = (filterValue: FilterValueType) => {
    return filter === filterValue ? s.activeClass : "";
  };

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

      <TodoListItems
        tasks={tasks}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
        todoListID={todoListID}
      />

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
