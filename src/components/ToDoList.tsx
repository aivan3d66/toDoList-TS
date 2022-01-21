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
import '../App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./TodoListItems/EditableSpan/EditableSpan";
import {TodoListItems} from "./TodoListItems/TodoListItems";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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

const todoListBtnWrapperStyles = {
  display: "flex",
  justifyContent: "space-between",
  margin: "auto 0 0 0"
}

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
    return filter === filterValue ? 'contained' : 'text';
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "320px",
      minHeight: "400px"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "40px",
        margin: "0 0 20px 0",
        fontSize: "20px",
        fontWeight: "bold"
      }}>
        <EditableSpan title={titleList} onChange={onChangeTodoListTitle}/>
        <IconButton
          onClick={onRemoveListHandler}
          color={'default'}
          size={'small'}>
          <DeleteIcon/>
        </IconButton>
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

      <div style={todoListBtnWrapperStyles}>
        <Button
          variant={getActiveBtnClassName(FILTERS.ALL)}
          onClick={onAllFilterHandler}
        >
          All
        </Button>
        <Button
          variant={getActiveBtnClassName(FILTERS.ACTIVE)}
          onClick={onActiveFilterHandler}
        >
          Active
        </Button>
        <Button
          variant={getActiveBtnClassName(FILTERS.COMPLETED)}
          onClick={onCompletedFilterHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}

export default TodoList;
